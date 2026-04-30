"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Droplets,
  CreditCard,
  MessageSquare,
  LogOut,
  User,
  UserCog,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = React.useState<{ name?: string; email?: string } | null>(null)

  React.useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        setUser(JSON.parse(userStr) as { name?: string; email?: string })
      } catch (e) {
        console.error("Parse user failed", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Usage",
      url: "/usage",
      icon: Droplets,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Complaints",
      url: "/complaints",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserCog,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Droplets className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg">Kora Control</span>
            <span className="text-xs text-muted-foreground uppercase font-medium">Water Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  className="py-6"
                >
                  <Link href={item.url}>
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-6">
              <Link href="/profile" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
                  <span className="truncate font-semibold text-sm">{user?.name || "Member"}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.email || "No email"}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout} 
              className="text-destructive hover:text-destructive hover:bg-destructive/10 py-6"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
