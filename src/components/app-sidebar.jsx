"use client";

import { useSession, signIn, signOut } from "next-auth/react";

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
  User,
  LogIn,
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
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronUp, User2 } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Abrechnung",
    url: "/abrechnung",
    icon: Coins,
  },
  {
    title: "Trainer",
    url: "/trainer",
    icon: UserStar,
  },
  {
    title: "Teams",
    url: "/team",
    icon: Users,
  },
  {
    title: "Spieler",
    url: "/player",
    icon: User,
  },
  {
    title: "Verkauf",
    url: "#",
    icon: CakeSlice,
    disabled: true,
  },
  {
    title: "Protokolle",
    url: "#",
    icon: FileSpreadsheet,
    disabled: true,
  },
];

export function AppSidebar() {
  const { data: session, status } = useSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
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
                    <a
                      href={item.url}
                      className={
                        item.disabled ? "pointer-events-none opacity-30" : ""
                      }
                    >
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
      <SidebarFooter>
        {session ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton variant="default" size="lg">
                    <Avatar>
                      <AvatarImage
                        src={session.user?.image}
                        alt={session.user?.name}
                      />
                      <AvatarFallback>
                        {session.user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-0">
                      <span>{session.user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {session.user?.email}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem disabled>
                    <span>Konto</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton variant="default" size="lg">
                    <Avatar>
                      <AvatarFallback>
                        <LogIn size={20} className="text-gray-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-0">
                      <span>Gast</span>
                      <span className="text-xs text-muted-foreground">
                        Nicht angemeldet
                      </span>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem asChild>
                    <a href="/auth/signin">Anmelden</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
