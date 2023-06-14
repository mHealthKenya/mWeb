import '@styles/globals.scss'
import type { AppProps } from 'next/app'
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ProgressBar } from '@components/ProgressBar'
import SSRProvider from 'react-bootstrap/SSRProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <SSRProvider>
      <ProgressBar />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
    </SSRProvider>
  )
}

export default MyApp
