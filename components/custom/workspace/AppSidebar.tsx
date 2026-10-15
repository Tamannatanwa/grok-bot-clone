"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Bot, CircleUserRound, Plus, Store } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";

export type WorkspaceAgent = {
  id: string;
  name: string;
  image?: string;
};

type AppSidebarProps = {
  agents?: WorkspaceAgent[];
  activeAgentId?: string;
  onAgentSelect?: (agent: WorkspaceAgent) => void;
  onCreateAgent?: () => void;
  onMarketplaceClick?: () => void;
};

const sampleAgents: WorkspaceAgent[] = [
  { id: "nova", name: "Nova Assistant", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Nova" },
  { id: "atlas", name: "Atlas Researcher", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Atlas" },
  { id: "echo", name: "Echo Writer", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Echo" },
  { id: "luna", name: "Luna Planner", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Luna" },
];

export default function AppSidebar({
  agents = sampleAgents,
  activeAgentId = sampleAgents[0]?.id,
  onAgentSelect,
  onCreateAgent,
  onMarketplaceClick,
}: AppSidebarProps) {

  const { data: session } = useSession();

  const userName = session?.user?.name ?? "Alex Morgan";
  const userEmail = session?.user?.email ?? "alex.morgan@example.com";
  const userImage = session?.user?.image;
  const userInitials = userName
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Sidebar collapsible="offcanvas" className="border-sidebar-border">
      <SidebarHeader className="gap-5 p-4">
        <div className="flex items-center gap-3 px-2 py-1">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-xl" priority />
          <span className="text-lg font-semibold tracking-tight">Orbit</span>
        </div>
        <Button
          type="button"
          onClick={onCreateAgent}
          className="h-10 w-full justify-start gap-2.5 rounded-xl px-3.5"
        >
          <Plus aria-hidden="true" className="size-4" />
          Create New Agent
        </Button>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2">
        <SidebarGroup className="p-2">
          <SidebarGroupLabel className="px-2 text-xs font-medium text-sidebar-foreground/60">
            Your Agents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {agents.map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <SidebarMenuButton
                    type="button"
                    isActive={agent.id === activeAgentId}
                    onClick={() => onAgentSelect?.(agent)}
                    className="h-11 gap-3 rounded-xl px-2.5"
                    tooltip={agent.name}
                  >
                    <Avatar className="size-8 rounded-lg">
                      {agent.image ? <AvatarImage src={agent.image} alt="" className="rounded-lg" /> : null}
                      <AvatarFallback className="rounded-lg">
                        <Bot aria-hidden="true" className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate text-sm font-medium">{agent.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 p-3">
        <SidebarSeparator className="mx-0 w-full" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              onClick={onMarketplaceClick}
              className="h-10 rounded-xl px-2.5"
              tooltip="Marketplace"
            >
              <Store aria-hidden="true" />
              {/* <span>Marketplace</span> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              className="h-12 rounded-xl px-2.5"
              aria-label={`Signed in as ${userName}`}
              tooltip={userName}
            >
              <Avatar className="size-9">
                {userImage ? <AvatarImage src={userImage} alt="" /> : null}
                <AvatarFallback>
                  {userInitials || <CircleUserRound aria-hidden="true" className="size-5" />}
                </AvatarFallback>
              </Avatar>
              <p>
                <span className="truncate text-sm font-medium">{userName}</span>
              </p>
              <br/>
              <p>
              <span className="truncate text-sm font-medium">{userEmail}</span>

              </p>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
