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
import { FunctionComponent, useEffect, useState } from "react";
import {
  createProductsAPI,
  createStoreAPI,
  deleteStoreAPI,
  getStoreAPI,
  updateStoreSettingsAPI,
} from "../api";

const Settings: FunctionComponent<ExtensionContextValue> = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const flags = useFlags(["app_env"]);
  const appEnv: string = String(flags.app_env.value) || "";

  const stripeAccountId = userContext?.account.id;
  const stripeName = `${userContext?.account.name?.trim()}'s store`;
  const stripeSubdomain = userContext?.account.name
    ?.trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .slice(0, 4);

  const [store, setStore] = useState<any>({});
  const [status, setStatus] = useState("");

  const getStore = () => {
    getStoreAPI({ accountId: stripeAccountId }, appEnv).then((data) => {
      console.log("sukh data", data);
      if (data && !data.error) {
        setStore(data.data);
      } else {
        setStore({});
      }
    });
  };

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

  useEffect(() => {
    console.log("sukh, trying to get store");
    getStore();
  }, [stripeAccountId, getStore, appEnv, status]);

  return (
    <SettingsView onSave={saveSettings} statusMessage={status}>
      <Box
        css={{
          paddingY: "xxlarge",
          paddingX: "xxlarge",
          background: "container",
        }}
      >
        {store && JSON.stringify(store) === "{}" ? (
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
                  await createStoreAPI(
                    {
                      accountId: stripeAccountId,
                      name: stripeName,
                      subdomain: stripeSubdomain,
                    },
                    appEnv
                  );

                  await createProductsAPI(
                    {
                      accountId: stripeAccountId,
                    },
                    appEnv
                  );

                  getStore();
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
                await deleteStoreAPI({ accountId: stripeAccountId }, appEnv);
                setStatus("Store deleted!");
                await getStore();
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
