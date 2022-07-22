import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import Home from "../components/Home";
import Layout from "../components/Layout";

const HomeOverviewView = (props: ExtensionContextValue) => {
  return (
    <Layout>
      <Home {...props} />
    </Layout>
  );
};

export default HomeOverviewView;
