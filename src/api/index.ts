import { createRequest } from "../utils";

export async function getStoreAPI({ accountId }: any, appEnv: string) {
  const data = await createRequest({
    endpoint: `/api/store/accounts/${accountId}`,
    body: {},
    method: "GET",
  }, appEnv)

  console.log("> sukh ", data, { appEnv })

  return data;
}

export async function createProductsAPI({ accountId }: any, appEnv: string) {
  const data = await createRequest({
    endpoint: `/api/store/accounts/${accountId}/products`,
    body: {},
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }, appEnv)

  console.log("> ", data)

  return data;
}

export async function createStoreAPI({ accountId, name, subdomain }: any, appEnv: string) {
  console.log("Asking for store for ", accountId, name, subdomain)
  const data = await createRequest({
    endpoint: `/api/store`,
    body: { accountId, name, subdomain },
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }, appEnv)

  console.log("> ", data)

  return data;
}


export async function updateStoreSettingsAPI({ accountId, settings }: any, appEnv: string) {
  const data = await createRequest({
    endpoint: `/api/store/accounts/${accountId}`,
    body: { ...settings.values },
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }, appEnv)

  console.log("> settings", settings)

  return data;
}

export async function deleteStoreAPI({ accountId }: any, appEnv: string) {
  console.log(accountId)
  const data = await createRequest({
    endpoint: `/api/store/accounts/${accountId}`,
    body: { accountId },
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }, appEnv)

  return data;
}