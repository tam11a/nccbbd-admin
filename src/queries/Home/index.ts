import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// home
const getHome = (params: any) =>
  instance.get(`v1/home`, {
    params,
  });

export const useGetHome = (params: any) => {
  return useQuery(["home", params], () => getHome(params), {
    select(data) {
      return data.data;
    },
  });
};

const postHome = (data: {
  title: string;
  subtitle: string;
  description: string;
}) => instance.post(`v1/home`, data);

export const usePostHome = () => {
  const qc = useQueryClient();
  return useMutation(postHome, {
    onSuccess: () => {
      qc.invalidateQueries(["home"]);
    },
  });
};

// home-banner
const getHomeBanner = (params: any) =>
  instance.get(`v1/home/banner`, {
    params,
  });

export const useGetHomeBanner = (params: any) => {
  return useQuery(["home-banner", params], () => getHomeBanner(params), {
    select(data) {
      return data.data;
    },
  });
};

const postHomeBanner = (data: {
  title: string;
  subtitle: string;
  description: string;
}) => instance.post(`v1/home/banner`, data);

export const usePostHomeBanner = () => {
  const qc = useQueryClient();
  return useMutation(postHomeBanner, {
    onSuccess: () => {
      qc.invalidateQueries(["home-banner"]);
    },
  });
};

const delHomeBanner = (id: any) => instance.delete(`v1/home/banner/${id}`);

export const useDelHomeBanner = () => {
  const queryClient = useQueryClient();
  return useMutation(delHomeBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["home-banner"]);
    },
  });
};


