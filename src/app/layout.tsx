import "@/styles/globals.css"
import { PropsWithChildren } from "react"
import { sora } from "@/styles"
import Image from "next/image"
import { LayoutDashboard, Medal } from "lucide-react"
import { Sidebar, SidebarItem, SidebarLink, SidebarList } from "@/components"

export const metadata = {
  title: "Code in the Dark",
  description: "",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="https://fav.farm/⚡" />
      </head>
      <body className={`${sora.variable} h-full bg-neutral-100`}>
        <div className="flex h-full">
          <Sidebar>
            <Image src="/logo.svg" alt="CTD Logo" width={32} height={32} />
            <SidebarList>
              <SidebarItem>
                <SidebarLink href="/events">
                  <LayoutDashboard
                    width={22}
                    height={22}
                    className="stroke-current-color"
                  />
                </SidebarLink>
              </SidebarItem>
              <SidebarItem>
                <SidebarLink href="/events/2023/participants">
                  <Medal
                    width={22}
                    height={22}
                    className="stroke-current-color"
                  />
                </SidebarLink>
              </SidebarItem>
            </SidebarList>
          </Sidebar>
          <main className="flex h-full w-full justify-center pt-8">
            <div className="w-full max-w-wrapper">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
