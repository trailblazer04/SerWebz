import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SerWebz - Crafting Digital Success',
  description: 'Professional web development services. We build modern, high-performing websites that drive real results.',
  keywords: 'web development, website design, SerWebz, business websites, professional websites',
  
  // Add these for favicon
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  
  // Open Graph for social sharing
  openGraph: {
    title: 'SerWebz - Crafting Digital Success',
    description: 'Professional web development services for growing businesses.',
    url: 'https://serwebz.com',
    siteName: 'SerWebz',
    images: [
      {
        url: '/SerWebs-og-image.png', // Create a 1200x630 image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}