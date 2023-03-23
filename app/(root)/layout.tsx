import './globals.css'
import { Rasa } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import AuthProvider from './AuthProvider'

export const metadata = {
  title: 'Shorten your links',
  description: 'Generate shortened links for your website',
}

const font = Rasa({ weight: "400", subsets: ["latin"], variable: '--primary-font' })

export default function FrontLayout({ children, }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navigation />
      <main className='grow'>
        {children}
      </main>
    </AuthProvider>
  )
}
