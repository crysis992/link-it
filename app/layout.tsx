import { Rasa, Roboto } from 'next/font/google'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import '@/app/(root)/globals.css'

export const metadata = {
    title: 'Shorten your links',
    description: 'Generate shortened links for your website',
}

const font = Rasa({ weight: "400", subsets: ["latin"], variable: '--primary-font' })
const btnFont = Roboto({ weight: "500", subsets: ["latin"], variable: '--btn-font' })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={clsx("bg-white text-gray-900 min-h-screen flex flex-col", btnFont.variable, font.className)}>
                {children}
                <div className='grow' />
                <Footer />
            </body>
        </html>
    )
}
