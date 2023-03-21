import './globals.css'
import { Puritan, Rasa } from 'next/font/google'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import clsx from 'clsx'
import { Suspense } from 'react'
import AuthProvider from './AuthProvider'

export const metadata = {
  title: 'Shorten your links',
  description: 'Generate shortened links for your website',
}

const font = Rasa({ weight: "400", subsets: ["latin"], variable: '--primary-font' })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("bg-white text-gray-900 h-screen flex flex-col", font.className)}>
        <AuthProvider>
          <Navigation />
          <main className='grow'>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
