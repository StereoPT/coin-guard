import { SidebarProvider } from '@/components/ui/sidebar';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

type GlobalProvidersProps = {
  children: React.ReactNode;
};

const GlobalProviders = ({ children }: GlobalProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <QueryProvider>{children}</QueryProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default GlobalProviders;
