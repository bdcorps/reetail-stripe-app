import axios from "axios";

export const createRequest = async ({ endpoint, method, body, headers }: any, appEnv: string) => {
  const domain = appEnv ? appEnv : "http://localhost:3000"
  console.log("sukh", { endpoint, method, body, headers, appEnv })
  let res;
  try {
    console.log("sukh", domain + endpoint)
    res = await axios({
      method,
      url: domain + endpoint,
      data: body,
      headers: { "Content-Type": "application/json", ...headers }
    })
  } catch (e: any) {
    console.log("sukh req error", e)
  }

  return res?.data
}