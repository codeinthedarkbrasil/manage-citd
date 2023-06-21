import '@/styles/globals.css'
import Image from 'next/image'
import { LayoutDashboard, Medal } from "lucide-react"
import { PropsWithChildren } from 'react'
import { Sidebar, SidebarItem, SidebarLink, SidebarList } from '@/components'
import { sora } from '@/styles'

export const metadata = {
  title: 'Code in the Dark',
  description: '',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="https://fav.farm/⚡" />
      </head>
      <body className={`${sora.variable} text-2xl bg-neutral-100 h-full`}>
        <div className="flex h-full">
          <Sidebar>
            <Image src="logo.svg" alt="CTD Logo" width={32} height={32} />
            <SidebarList>
              <SidebarItem>
                <SidebarLink href="/">
                  <LayoutDashboard width={22} height={22} className="stroke-current-color" />
                </SidebarLink>
              </SidebarItem>
              <SidebarItem>
                <SidebarLink href="/events/2023/participants">
                  <Medal width={22} height={22} className="stroke-current-color" />
                </SidebarLink>
              </SidebarItem>
            </SidebarList>
          </Sidebar>
          <main className="pt-8 h-full w-full flex justify-center">
            <div className="max-w-wrapper w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
