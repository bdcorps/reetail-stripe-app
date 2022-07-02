import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import {
  Banner,
  Box,
  Button,
  ContextView,
  Icon,
  Img,
  Inline,
  Link,
} from "@stripe/ui-extension-sdk/ui";
import { useEffect, useState } from "react";
import { createStoreAPI, getStoreAPI, refreshProductsAPI } from "../api";
import ProductsTable from "../components/productsTable";
import { SalesChart } from "../components/salesChart";
import SummaryTable from "../components/summaryTable";
import BrandIcon from "./brand_icon.svg";

const HomeOverviewView = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const [store, setStore] = useState<any>({ name: "" });

  if (!userContext.account.name) {
    return (
      <ContextView title="Get started" brandIcon={BrandIcon} brandColor="#eee">
        <Banner
          type="critical"
          title="No account name"
          description="Your Stripe account needs to have a name before you can use Reetail."
          actions={
            <Button href="https://dashboard.stripe.com/settings/account">
              Add account name
            </Button>
          }
        />
      </ContextView>
    );
  }

  const stripeAccountId = userContext?.account.id;
  const stripeName = `${userContext?.account.name?.trim()}'s store`;
  const stripeSubdomain = userContext?.account.name
    ?.trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .slice(0, 4);

  const getStore = () => {
    getStoreAPI({ accountId: stripeAccountId }).then((data) => {
      if (!data.error) {
        setStore(data.data);
      }
    });
  };
  useEffect(() => {
    getStore();
  }, [stripeAccountId]);

  // state props
  const hasStore = true;
  const showSyncBanner = true;
  const sales = [
    {
      date: "Jan",
      sold: 1,
    },
    {
      date: "Feb",
      sold: 4,
    },
    {
      date: "Mar",
      sold: 2,
    },
    {
      date: "Apr",
      sold: 7,
    },
  ];

  console.log("getstore", store);
  if (!store) {
    return (
      <ContextView title="Get started" brandIcon={BrandIcon} brandColor="#eee">
        <Box
          css={{
            background: "container",
            borderRadius: "medium",
            marginTop: "medium",
            padding: "large",
            wordBreak: "break-all",
            stack: "x",
            alignY: "center",
            distribute: "packed",
          }}
        >
          <Img src={BrandIcon} width="64" height="64" alt="Gross margin" />
          <Icon name="convert" />
          <Img src={BrandIcon} width="64" height="64" alt="Gross margin" />
        </Box>
        <Box
          css={{
            marginTop: "xlarge",
            marginBottom: "xlarge",
          }}
        >
          Reetail lets you create a storefront with a single click.
        </Box>
        <Button
          type="primary"
          css={{ width: "fill", alignX: "center" }}
          onPress={async () => {
            await createStoreAPI({
              accountId: stripeAccountId,
              name: stripeName,
              subdomain: stripeSubdomain,
            });

            getStore();
          }}
        >
          Create Store
        </Button>

        <Box
          css={{
            layout: "row",
            marginTop: "medium",
            gap: "small",
            alignY: "center",
            alignX: "center",
          }}
        >
          {"Don't have an account?"}
          <Link href="https://www.stripe.com" target="_blank">
            Sign up
          </Link>
        </Box>
      </ContextView>
    );
  }

  const { name, subdomain } = store;

  return (
    <ContextView
      title="Dashboard"
      brandIcon={BrandIcon}
      brandColor="#eee"
      externalLink={{
        label: "Go to Reetail dashboard",
        href: `https://${subdomain}.reetail.store`,
      }}
    >
      {hasStore ? (
        <Box>
          {showSyncBanner && (
            <Banner
              type="caution"
              title="2 products out of sync"
              description="You have unpublished changes"
              onDismiss={() => console.log("hello world")}
              actions={
                <Button
                  onPress={() => {
                    refreshProductsAPI({ accountId: stripeAccountId });
                  }}
                >
                  <Box
                    css={{
                      layout: "row",
                      gap: "small",
                      alignY: "center",
                    }}
                  >
                    <Icon name="refresh" size="xsmall" />
                    Refresh products
                  </Box>
                </Button>
              }
            />
          )}
          <ProductsTable products={store?.products} />
          <SummaryTable />
          <SalesChart sales={sales} />
        </Box>
      ) : (
        <Box css={{ layout: "column", width: "fill" }}>
          <Inline css={{ font: "heading", fontWeight: "bold" }}>
            {`Welcome ${store?.name}`}
          </Inline>
          <Inline css={{ marginTop: "xsmall" }}>
            Reetail lets you create a storefront with a single click.
          </Inline>
          <Inline css={{ marginTop: "medium", marginBottom: "large" }}>
            {
              "Click the button below to deploy a store filled with your Stripe products. It's that easy!"
            }
          </Inline>
          <Button type="primary" css={{ width: "fill", alignX: "center" }}>
            <Box
              css={{
                layout: "row",
                gap: "small",
                alignY: "center",
              }}
            >
              <Icon name="new" size="xsmall" />
              <Inline
                css={{
                  fontWeight: "semibold",
                }}
              >
                {"Create my Reetail store"}
              </Inline>
            </Box>
          </Button>
        </Box>
      )}
    </ContextView>
  );
};

export default HomeOverviewView;
