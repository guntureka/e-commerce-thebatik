import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col lg:p-20 p-6">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <SidebarNavigation />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default DashboardLayout;
