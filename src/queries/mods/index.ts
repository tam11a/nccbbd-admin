import instance from "@/services";
import { useMutation } from "@tanstack/react-query";
import { ISignup } from "../auth/types";

const postRegister = (data: ISignup) => {
  return instance.post("v1/admin/register", data);
};

export const usePostRegister = () => {
  return useMutation(postRegister);
};
