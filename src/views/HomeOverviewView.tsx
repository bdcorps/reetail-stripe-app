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
  return (
    <ContextView
      title='Get started'
      externalLink={{
        label: "View docs",
        href: "https://stripe.com/docs/stripe-apps",
      }}
    >
      <Box
        css={{
          background: "container",
          borderRadius: "medium",
          marginTop: "small",
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
  );
};

export default HomeOverviewView;
