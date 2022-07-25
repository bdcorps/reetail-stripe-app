import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context'
import {
  Banner,
  Box,
  Button,
  ContextView,
  Icon,
  Img,
} from '@stripe/ui-extension-sdk/ui'
import { useFlags } from 'flagsmith/react'
import { FunctionComponent } from 'react'
import { useCreateProducts, useCreateStore, useStore } from '../hooks/api'
import BrandIcon from '../views/brand_icon.svg'
import { ProductsTable } from './ProductsTable'

const Home: FunctionComponent<ExtensionContextValue> = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const flags = useFlags(['app_env'])

  const appEnv: string = String(flags.app_env.value) || ''

  const stripeAccountId = userContext?.account.id
  const stripeName = `${userContext?.account.name?.trim()}'s store`

  const {
    data: store,
    isLoading,
    isFetching,
  } = useStore(appEnv, stripeAccountId)

  const { mutate: createStoreMutation } = useCreateStore(appEnv)
  const { mutate: createProductsMutation } = useCreateProducts()

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
    )
  }

  if (!store || JSON.stringify(store) === '{}') {
    return (
      <ContextView title="Get started" brandIcon={BrandIcon} brandColor="#eee">
        <Box
          css={{
            background: 'container',
            borderRadius: 'medium',
            marginTop: 'medium',
            padding: 'large',
            wordBreak: 'break-all',
            stack: 'x',
            alignY: 'center',
            distribute: 'packed',
          }}
        >
          <Img src={BrandIcon} width="64" height="64" alt="Gross margin" />
          <Icon name="convert" />
          <Img src={BrandIcon} width="64" height="64" alt="Gross margin" />
        </Box>
        <Box
          css={{
            marginTop: 'xlarge',
            marginBottom: 'xlarge',
          }}
        >
          Reetail lets you create a storefront with a single click.
        </Box>
        <Button
          type="primary"
          css={{ width: 'fill', alignX: 'center' }}
          onPress={async () => {
            await createStoreMutation({
              accountId: stripeAccountId,
              name: stripeName,
              appEnv,
            })

            console.log('done creating store. creatin products')
            await createProductsMutation({
              appEnv,
              accountId: stripeAccountId,
            })
          }}
        >
          Create Store
        </Button>
      </ContextView>
    )
  }

  const { subdomain } = store

  return (
    <ContextView
      title="Dashboard"
      brandIcon={BrandIcon}
      brandColor="#eee"
      externalLink={{
        label: 'View my Reetail store',
        href: `https://${subdomain}.reetail.store`,
      }}
    >
      {store.refreshProducts && (
        <Box>
          <Banner
            type="caution"
            title="Products out of sync"
            description="You have unpublished changes"
            onDismiss={() => console.log('hello world')}
            actions={
              <Button
                onPress={async () => {
                  await createProductsMutation({
                    appEnv,
                    accountId: stripeAccountId,
                  })
                }}
              >
                <Box
                  css={{
                    layout: 'row',
                    gap: 'small',
                    alignY: 'center',
                  }}
                >
                  <Icon name="refresh" size="xsmall" />
                  Refresh products
                </Box>
              </Button>
            }
          />
        </Box>
      )}

      <Box css={{ marginTop: 'medium' }}>
        <ProductsTable products={store?.products} />
      </Box>
    </ContextView>
  )
}

export default Home
