import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Broker Box - Deal Management Platform',
  description: 'Streamline your funding deals with 100+ alternative lenders. Clean, efficient broker management system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}