import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import NavbarComp from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'
import { ModalContextProvider } from '../context/ModalContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'

const noAuthRequired = ['/', '/login', '/signup']

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <NavbarComp />
        {
          noAuthRequired.includes(router.pathname) ? (
            <div className='container'>
              <Component {...pageProps} />
            </div>
          ) : (
            <ProtectedRoute>
              <div className='container'>
                <Component {...pageProps} />
              </div>
            </ProtectedRoute>
          )
        }
      </ModalContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
