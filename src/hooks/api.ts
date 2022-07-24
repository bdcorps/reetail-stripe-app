import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { adjectives, animals, colors, Config, uniqueNamesGenerator } from "unique-names-generator";

const uniqueNameConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: '-',
};

const getBackendURL = (appEnv: string, endpoint: string) => {
  const url = appEnv ? appEnv + endpoint : ("http://localhost:3000" + endpoint);
  return url;
}

const fetchStore = async (url: string) => {
  const response = await axios.get(url);
  return response.data.data;
};

const useStore = (appEnv: string, accountId: string) => {
  const url = getBackendURL(appEnv, `/api/store/accounts/${accountId}`)
  return useQuery(["store", appEnv, accountId], () => fetchStore(url));
};

const useCreateStore = (appEnv: string) => {
  const queryClient = useQueryClient();
  const url = getBackendURL(appEnv, "/api/store")

  return useMutation((data: any) => axios.post(url, {
    ...data, subdomain: uniqueNamesGenerator(uniqueNameConfig)
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries("store");
    },
  });
};

const useDeleteStore = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => {
    const { appEnv, accountId } = data;
    const url = getBackendURL(appEnv, `/api/store/accounts/${accountId}`);
    return axios.delete(url)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("store");
    },
  });
};

const useUpdateStore = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => {
    const { appEnv, accountId, values } = data;
    const url = getBackendURL(appEnv, `/api/store/accounts/${accountId}`);
    return axios.patch(url, { ...values })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("store");
    },
  });
};

const useCreateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation(({ appEnv, accountId }: any) => {
    const url = getBackendURL(appEnv, `/api/store/accounts/${accountId}/products`);
    return axios.get(url)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("store");
    },
  });
};

export {
  useStore,
  useCreateStore,
  useCreateProducts,
  useDeleteStore,
  useUpdateStore
};
