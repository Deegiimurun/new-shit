import {createContext, useEffect, useState, ReactNode} from 'react'
import {useRouter} from 'next/router'
import {AuthValuesType, LoginParams, ErrCallbackType} from './types'
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {User} from "@supabase/supabase-js";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
      const initAuth = async (): Promise<void> => {
        setLoading(true);

        const {data: {session}, error} = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          await router.replace('/login')
        }

        setLoading(false);
      }

      initAuth()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  )

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const {error, data} = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password
    });

    if (errorCallback && error) {
      errorCallback(error);

      return;
    }

    const returnUrl = router.query.returnUrl;
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : `/`;

    await router.push(redirectURL as string)
    setUser(data.user);
  }

  const handleLogout = async () => {
    setUser(null)
    await supabase.auth.signOut()
    await router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}
