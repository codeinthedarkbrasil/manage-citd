import { usePathname } from "next/navigation"
import Link from "next/link"
import { PropsWithChildren } from "react"

type SidebarLinkProps = PropsWithChildren<{ href: string }>

export const Sidebar = ({ children }: PropsWithChildren) => (
  <aside className="flex h-full w-sidebar flex-col items-center border-r border-r-neutral-200 pt-2">
    {children}
  </aside>
)

export const SidebarItem = ({ children }: PropsWithChildren) => (
  <li>{children}</li>
)
export const SidebarList = ({ children }: PropsWithChildren) => (
  <ul className="mt-4 flex flex-col gap-3">{children}</ul>
)

export const SidebarLink = ({ children, href }: SidebarLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)
  const colorStyles = isActive ? "text-primary-100" : "text-neutral-300"

  return (
    <Link
      href={href}
      className={`${colorStyles} transition-colors hover:text-primary-100`}
    >
      {children}
    </Link>
  )
}
