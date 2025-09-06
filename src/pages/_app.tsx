import '@styles/globals.scss'
import type { AppProps } from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ProgressBar } from '@components/ProgressBar'
import SSRProvider from 'react-bootstrap/SSRProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ScheduleProvider from 'src/context/ScheduleContext'
import { Toaster } from '@ui/ui/toaster'
import { useEffect, useState } from 'react'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<
    (Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> }) | null
  >(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const queryClient = new QueryClient()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SSRProvider>
          <ProgressBar />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <QueryClientProvider client={queryClient}>
            <ScheduleProvider>
              {showInstallPrompt && (
                <div
                  style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: '#007acc',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    zIndex: 1000
                  }}
                  onClick={handleInstallClick}>
                  Install App
                </div>
              )}
              <Component {...pageProps} />
            </ScheduleProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
          </QueryClientProvider>
        </SSRProvider>
      </LocalizationProvider>
      <Toaster />
    </>
  )
}

export default MyApp
