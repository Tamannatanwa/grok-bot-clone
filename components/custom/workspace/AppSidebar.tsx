"use client";
import Image from "next/image";

import React from "react";
import { useSession } from "next-auth/react";
import { Bot, CircleUserRound, Plus, Store } from "lucide-react";

const agents = [
  {
    name: "Nova Assistant",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=Nova",
  },
  {
    name: "Atlas Researcher",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=Atlas",
  },
  {
    name: "Echo Writer",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=Echo",
  },
];

const AppSidebar = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Alex Morgan";
  const userImage = session?.user?.image;

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 text-slate-900">
      <div className="flex items-center gap-3 px-2">
          {/* <Bot className="size-5" strokeWidth={2.2} /> */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-xl"
          />
        <span className="text-lg font-semibold tracking-tight">Orbit</span>
      </div>

      <button className="mt-8 flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
        <Plus className="size-4" />
        Create New Agent
      </button>

      <div className="mt-9 flex-1">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Your Agents
        </p>
        <nav className="mt-3 space-y-1" aria-label="Your agents">
          {agents.map((agent, index) => (
            <button
              key={agent.name}
              className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${index === 0
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
            >
              <span
                className="size-9 shrink-0 rounded-lg border border-slate-200 bg-slate-50 bg-cover bg-center"
                style={{ backgroundImage: `url(${agent.image})` }}
                role="img"
                aria-label={`${agent.name} avatar`}
              />
              <span className="truncate text-sm font-medium">{agent.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
          <Store className="size-[18px]" />
          Marketplace
        </button>

        <div className="mt-4 flex items-center gap-3 px-2">
          {userImage ? (
            <span
              className="size-9 shrink-0 rounded-full border border-slate-200 bg-cover bg-center"
              style={{ backgroundImage: `url(${userImage})` }}
              role="img"
              aria-label={`${userName} avatar`}
            />
          ) : (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <CircleUserRound className="size-5" />
            </span>
          )}
          <span className="truncate text-sm font-medium text-slate-700">{userName}</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
