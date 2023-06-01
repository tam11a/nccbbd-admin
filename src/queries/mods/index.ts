import instance from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ISignup } from "../auth/types";

const getAdmin = (params: any) =>
  instance.get(`v1/admin`, {
    params,
  });

export const useGetAdmin = (params: any) => {
  return useQuery(["admins", params], () => getAdmin(params), {
    select(data) {
      return data.data;
    },
  });
};

const postRegister = (data: ISignup) => {
  return instance.post("v1/admin/register", data);
};

export const usePostRegister = () => {
  return useMutation(postRegister);
};
