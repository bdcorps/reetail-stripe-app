import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import Layout from "../components/Layout";
import Settings from "../components/Settings";

const AppSettings = (props: ExtensionContextValue) => {
  return (
    <Layout>
      <Settings {...props} />
    </Layout>
  );
};

export default AppSettings;
