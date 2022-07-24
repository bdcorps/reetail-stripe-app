import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import {
  Box,
  Button,
  Inline,
  Select,
  SettingsView,
  TextField,
} from "@stripe/ui-extension-sdk/ui";
import { useFlags } from "flagsmith/react";
import { FunctionComponent, useState } from "react";
import { updateStoreSettingsAPI } from "../api";
import {
  useCreateProducts,
  useCreateStore,
  useDeleteStore,
  useStore,
} from "../hooks/api";

const Settings: FunctionComponent<ExtensionContextValue> = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const flags = useFlags(["app_env"]);
  const appEnv: string = String(flags.app_env.value) || "";
  const stripeAccountId = userContext?.account.id;
  const stripeName = `${userContext?.account.name?.trim()}'s store`;
  const stripeSubdomain = userContext?.account.name;
  const {
    data: store,
    isLoading,
    isFetching,
  } = useStore(appEnv, stripeAccountId);

  const [status, setStatus] = useState("");

  const { mutate: createStoreMutation } = useCreateStore(appEnv);
  const { mutate: createProductsMutation } = useCreateProducts();
  const { mutate: deleteStoreMutation } = useDeleteStore();

  const saveSettings = async (values: any) => {
    setStatus("Saving...");
    try {
      updateStoreSettingsAPI(
        { accountId: stripeAccountId, settings: { values } },
        appEnv
      );
    } catch (error) {
      setStatus("Error");
      console.error(error);
    }
    setStatus("Saved!");
  };

  // return (
  //   <SettingsView onSave={saveSettings} statusMessage={status}>
  //     <Box>{store && JSON.stringify(store.name)}</Box>
  //   </SettingsView>
  // );

  return (
    <SettingsView onSave={saveSettings} statusMessage={status}>
      <Box
        css={{
          paddingY: "xxlarge",
          paddingX: "xxlarge",
          background: "container",
        }}
      >
        {/* todo: fix this */}
        {!store ? (
          <Box
            css={{
              background: "surface",
              layout: "column",
              gap: "xxlarge",
              padding: "xlarge",
            }}
          >
            <Box css={{ layout: "column", gap: "medium" }}>
              <Inline>
                No store found. Create a new one to edit related Settings.
              </Inline>

              <Button
                type="primary"
                css={{ alignX: "center" }}
                onPress={async () => {
                  await createStoreMutation({
                    accountId: stripeAccountId,
                    name: stripeName,
                    subdomain: stripeSubdomain,
                  });

                  await createProductsMutation({
                    appEnv,
                    accountId: stripeAccountId,
                  });
                }}
              >
                Create Store
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            css={{
              background: "surface",
              layout: "column",
              gap: "xxlarge",
              padding: "xlarge",
            }}
          >
            <Box css={{ layout: "column", gap: "medium" }}>
              <TextField
                name="name"
                label="Store name"
                defaultValue={store.name}
                placeholder="My cool store"
                required
              />
              <TextField
                name="logo"
                label="Logo"
                defaultValue={store.logo}
                placeholder="https://mycoolicon.com"
              />

              <Select
                name="theme"
                label="Change Store Theme"
                defaultValue={store.theme}
              >
                <option value="basic">Basic</option>
              </Select>
            </Box>
            <Button
              type="destructive"
              css={{ alignX: "center" }}
              onPress={async () => {
                if (!stripeAccountId) return;
                await deleteStoreMutation({
                  appEnv,
                  accountId: stripeAccountId,
                });
                setStatus("Store deleted!");
              }}
            >
              Delete my store
            </Button>
          </Box>
        )}
      </Box>
    </SettingsView>
  );
};

export default Settings;
