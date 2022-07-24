import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";
import { FunctionComponent, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <FlagsmithProvider
        options={{
          environmentID: "XGedbsydb8oXtFbUjNQRhJ",
        }}
        flagsmith={flagsmith}
      >
        {children}
      </FlagsmithProvider>
    </QueryClientProvider>
  );
};

export default Layout;
