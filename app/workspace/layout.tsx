import React from 'react';
import AppSidebar from '@/components/custom/workspace/AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

function WorkspaceLaout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider style={{ '--sidebar-width': '18rem' } as React.CSSProperties}>
            <AppSidebar />
            <SidebarInset className="min-w-0">
                <div className="flex h-12 shrink-0 items-center border-b border-border px-3 md:hidden">
                    <SidebarTrigger />
                </div>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}

export default WorkspaceLaout;
