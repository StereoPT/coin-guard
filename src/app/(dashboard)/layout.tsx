import { Sidebar } from '@/components/Sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between pl-2 pr-6 py-4 h-[50px]">
          <div className="flex w-full">
            <SidebarTrigger />
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
