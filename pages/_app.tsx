import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Redux
import { persistor, store } from '../redux/store'

// Global Styles
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor} >
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
