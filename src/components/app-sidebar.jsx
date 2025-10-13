import {
  Calendar,
  Coins,
  Users,
  Search,
  Settings,
  Volleyball,
  UserStar,
  FileSpreadsheet,
  CakeSlice,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Abrechnung",
    url: "#",
    icon: Coins,
  },
  {
    title: "Teams",
    url: "#",
    icon: Users,
  },
  {
    title: "Trainer",
    url: "#",
    icon: UserStar,
  },
  {
    title: "Verkauf",
    url: "#",
    icon: CakeSlice,
  },
  {
    title: "Protokolle",
    url: "#",
    icon: FileSpreadsheet,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <Volleyball />
                <span className="text-base font-semibold">HSGX</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
