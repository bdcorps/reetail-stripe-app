import {
  Box,
  ContextView,
  Img,
  Icon,
  Button,
  Inline,
  Link,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import BrandIcon from "./brand_icon.svg";

const HomeOverviewView = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  // state props
  const isLoggedIn = false;
  const name = "Sukh";

  return isLoggedIn ? (
    <ContextView title='Get started'>
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
        <Img src={BrandIcon} width='64' height='64' alt='Gross margin' />
        <Icon name='convert' />
        <Img src={BrandIcon} width='64' height='64' alt='Gross margin' />
      </Box>
      <Box
        css={{
          marginTop: "xlarge",
          marginBottom: "xlarge",
        }}
      >
        {
          " To import your existing data from the Reetail, you will need to connect your Reetail account to Stripe."
        }
      </Box>
      <Button type='primary' css={{ width: "fill", alignX: "center" }}>
        <Box
          css={{
            layout: "row",
            gap: "small",
            alignY: "center",
          }}
        >
          <Inline
            css={{
              fontWeight: "semibold",
            }}
          >
            {"Sign in to Reetail"}
          </Inline>
          <Icon name='external' />
        </Box>
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
        <Link href='https://www.stripe.com' target='_blank'>
          Sign up
        </Link>
      </Box>
    </ContextView>
  ) : (
    <ContextView
      title='Get started'
      externalLink={{
        label: "Go to Reetail dashboard",
        href: "https://stripe.com/docs/stripe-apps",
      }}
    >
      <Box css={{ layout: "column", width: "fill" }}>
        <Inline css={{ font: "heading", fontWeight: "bold" }}>
          Welcome {name}
        </Inline>
        <Inline css={{ marginTop: "xsmall" }}>
          Reetail lets you create a storefront with a single click.
        </Inline>
        <Inline css={{ marginTop: "medium", marginBottom: "large" }}>
          {
            "Click the button below to deploy a store filled with your Stripe products. It's that easy!"
          }
        </Inline>
        <Button type='primary' css={{ width: "fill", alignX: "center" }}>
          <Box
            css={{
              layout: "row",
              gap: "small",
              alignY: "center",
            }}
          >
            <Icon name='new' size='xsmall' />
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
    </ContextView>
  );
};

export default HomeOverviewView;
