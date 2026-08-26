"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function ChangelogDemo() {
  return (
    <SidebarProvider>
      {/* The `dir` prop flows to the sidebar container for RTL layouts and
          `side="right"` flips the sidebar to the opposite edge. */}
      <Sidebar dir="rtl" side="right">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>التطبيق</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>الرئيسية</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>البريد الوارد</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
        RTL sidebar rendered on the right side
      </main>
    </SidebarProvider>
  )
}
