import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";
import { FunctionComponent } from "react";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <FlagsmithProvider
      options={{
        environmentID: "XGedbsydb8oXtFbUjNQRhJ",
      }}
      flagsmith={flagsmith}
    >
      {children}
    </FlagsmithProvider>
  );
};

export default Layout;
