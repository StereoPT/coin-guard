import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

type GlobalProvidersProps = {
  children: React.ReactNode;
};

const GlobalProviders = ({ children }: GlobalProvidersProps) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};

export default GlobalProviders;
