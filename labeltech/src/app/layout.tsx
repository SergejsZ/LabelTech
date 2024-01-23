import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'LabelTech',
  description: 'label verification using camera vision',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100" >{children}</body>
    </html>
  )
}
