import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Update the import statement to the correct path
import React from "react";

const Links = [
  {
    href: "/account",
    name: "Account",
  },
  {
    href: "/account/transactions",
    name: "Transactions",
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col lg:p-20 p-6">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <SidebarNavigation Links={Links} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default DashboardLayout;
