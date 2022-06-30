import { createRequest } from "../utils";

export async function getStoreAPI({ accountId }: any) {
  console.log("Asking for store for ", accountId)
  const data = await createRequest({
    endpoint: `/api/store/a/${accountId}`,
    body: {},
    method: "GET",
  })

  console.log("> ", data)

  return data;
}

export async function refreshProductsAPI({ accountId }: any) {
  const data = await createRequest({
    endpoint: `/api/store/a/${accountId}/products`,
    body: {},
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  console.log("> ", data)

  return data;
}

export async function createStoreAPI({ accountId, name, subdomain }: any) {
  console.log("Asking for store for ", accountId, name, subdomain)
  const data = await createRequest({
    endpoint: `/api/store`,
    body: { accountId, name, subdomain },
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  console.log("> ", data)

  return data;
}


export async function updateStoreSettingsAPI({ accountId, settings }: any) {
  const data = await createRequest({
    endpoint: `/api/store/a`,
    body: { accountId, settings },
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  console.log("> ", data)

  return data;
}

export async function deleteStoreAPI({ accountId }: any) {
  console.log(accountId)
  const data = await createRequest({
    endpoint: `/api/store/a/${accountId}`,
    body: { accountId },
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  return data;
}