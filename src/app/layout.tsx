import './globals.css'
import { PropsWithChildren } from '@/types/react'

export const metadata = {
  title: 'Code in the Dark',
  description: '',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body className='text-2xl'>{children}</body>
    </html>
  )
}
