import {AuthError, User} from "@supabase/supabase-js";

export type ErrCallbackType = (err: AuthError) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: User | null
  setLoading: (value: boolean) => void
  setUser: (value: User | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
