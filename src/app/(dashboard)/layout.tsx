import { Sidebar } from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  breadcrumb: ReactNode;
  children: ReactNode;
};

const DashboardLayout = ({ children, breadcrumb }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between pl-2 pr-6 py-4 h-[50px]">
          <div className="flex items-center gap-8 w-full">
            <SidebarTrigger />
            {breadcrumb}
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
