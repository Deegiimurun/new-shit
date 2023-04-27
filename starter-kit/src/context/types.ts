import {AuthError, User} from "@supabase/supabase-js";

export type ErrCallbackType = (err: AuthError) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: User | null
  setLoading: (value: boolean) => void
  setUser: (value: User | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
