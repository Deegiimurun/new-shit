import {ReactNode, useState} from 'react'
import Head from 'next/head'
import {Router} from 'next/router'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import NProgress from 'nprogress'
import {CacheProvider} from '@emotion/react'
import type {EmotionCache} from '@emotion/cache'
import themeConfig from 'src/configs/themeConfig'
import {Toaster} from 'react-hot-toast'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import {AuthProvider} from 'src/context/AuthContext'
import {SettingsConsumer, SettingsProvider} from 'src/@core/context/settingsContext'
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'
import '../../styles/globals.css'
import {SessionContextProvider} from "@supabase/auth-helpers-react";
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import GuestGuard from "../@core/components/auth/GuestGuard";
import Spinner from "../@core/components/spinner";
import AuthGuard from "../@core/components/auth/AuthGuard";
import {store} from "../store";
import {Provider} from "react-redux";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({children, authGuard, guestGuard}: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner/>}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner/>}>{children}</AuthGuard>
  }
}

const App = (props: ExtendedAppProps) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout = Component.getLayout ?? (page => <UserLayout
    contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`${themeConfig.appName}`}</title>
            <meta name='description' content={`${themeConfig.appName}`}/>
            <meta name='keywords' content='National University of Mongolia medical appointment system'/>
            <meta name='viewport' content='initial-scale=1, width=device-width'/>
          </Head>
          <AuthProvider>
            <SettingsProvider {...(setConfig ? {pageSettings: setConfig()} : {})}>
              <SettingsConsumer>
                {({settings}) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </Guard>
                      <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{className: 'react-hot-toast'}}/>
                      </ReactHotToast>
                    </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </CacheProvider>
      </Provider>
    </SessionContextProvider>
  )
}

export default App
