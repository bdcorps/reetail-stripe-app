import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { Button, SettingsView, TextField } from "@stripe/ui-extension-sdk/ui";
import { deleteStoreAPI, updateStoreSettingsAPI } from "../api";

const AppSettings = ({ userContext, environment }: ExtensionContextValue) => {
  const accountId = userContext?.account.id;
  const saveSettings = async (values: any) => {
    try {
      updateStoreSettingsAPI({ accountId, settings: { values } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingsView onSave={saveSettings}>
      <TextField name="firstname" label="First name" />
      <TextField name="lastname" label="Last name" />

      <Button
        type="destructive"
        css={{ width: "fill", alignX: "center" }}
        onPress={async () => {
          await deleteStoreAPI({ accountId });
        }}
      >
        Delete my store
      </Button>
    </SettingsView>
  );
};

export default AppSettings;
