import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

type GlobalProvidersProps = {
  children: React.ReactNode;
};

const GlobalProviders = ({ children }: GlobalProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
};

export default GlobalProviders;
