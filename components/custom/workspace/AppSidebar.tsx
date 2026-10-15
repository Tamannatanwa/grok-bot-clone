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
  { id: "research", name: "Research Assistant", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Research" },
  { id: "sales", name: "Sales Navigator", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Sales" },
  { id: "support", name: "Support Copilot", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Support" },
  { id: "content", name: "Content Strategist", image: "https://api.dicebear.com/9.x/bottts/svg?seed=Content" },
];

export default function AppSidebar({
  agents = sampleAgents,
  activeAgentId = sampleAgents[0]?.id,
  onAgentSelect,
  onCreateAgent,
  onMarketplaceClick,
}: AppSidebarProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Saloni Avhad";
  const userEmail = session?.user?.email ?? "gameplayapp007@gmail.com";
  const userImage = session?.user?.image;
  const userInitials = userName
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Sidebar collapsible="offcanvas" className="border-sidebar-border">
      <SidebarHeader className="gap-6 px-3 pb-0 pt-5">
        <div className="flex items-center gap-3 px-2">
          <Image
            src="/logo.png"
            alt=""
            width={42}
            height={42}
            className="size-[42px] rounded-full object-cover"
            priority
          />
          <span className="text-xl font-semibold tracking-tight text-foreground">Orbit</span>
        </div>

        <Button
          type="button"
          onClick={onCreateAgent}
          className="h-11 w-full justify-start gap-2.5 rounded-xl bg-[var(--orbit-blue)] px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--orbit-blue-hover)] focus-visible:ring-2 focus-visible:ring-[var(--orbit-blue)] focus-visible:ring-offset-2"
        >
          <Plus aria-hidden="true" className="size-[18px]" />
          Create New Agent
        </Button>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2 pt-8">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="mb-1 h-7 px-2 text-sm font-medium text-muted-foreground">
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
                    className="h-12 gap-3 rounded-xl px-2.5 text-foreground/90 data-[active=true]:bg-black/[0.035] data-[active=true]:font-semibold data-[active=true]:text-foreground hover:bg-black/[0.04]"
                    tooltip={agent.name}
                  >
                    <Avatar className="size-9 rounded-full">
                      {agent.image ? <AvatarImage src={agent.image} alt="" /> : null}
                      <AvatarFallback className="rounded-full bg-sky-100 text-sky-700">
                        <Bot aria-hidden="true" className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate text-[15px]">{agent.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              onClick={onMarketplaceClick}
              className="h-11 gap-3 rounded-xl px-2.5 text-foreground/90 hover:bg-black/[0.04]"
              tooltip="Marketplace"
            >
              <Store aria-hidden="true" className="size-[18px]" />
              <span className="text-[15px] font-medium">Marketplace</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator className="mx-0 w-full" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              className="h-auto min-h-[56px] gap-3 rounded-xl px-2 py-2 text-left hover:bg-black/[0.04]"
              aria-label={`Signed in as ${userName}, ${userEmail}`}
              tooltip={userName}
            >
              <Avatar className="size-10 border border-border">
                {userImage ? <AvatarImage src={userImage} alt="" /> : null}
                <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                  {userInitials || <CircleUserRound aria-hidden="true" className="size-5" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col items-start gap-0.5">
                <span className="max-w-full truncate text-sm font-semibold text-foreground">{userName}</span>
                <span className="max-w-full truncate text-xs font-normal text-muted-foreground">{userEmail}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
