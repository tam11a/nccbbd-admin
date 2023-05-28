import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUploadFile } from "./types";

const getGallery = (params: any) =>
  instance.get(`v1/gallery`, {
    params,
  });

export const useGetGallery = (params: any) => {
  return useQuery(["gallery", params], () => getGallery(params), {
    select(data) {
      return data.data;
    },
  });
};

const postGallery = ( {
	data,
}: {
	data: IUploadFile;
}) => instance.post(`v1/gallery`, data);

export const usePostGallery = () => {
  const qc = useQueryClient();
  return useMutation(postGallery, {
    onSuccess: () => {
      qc.invalidateQueries(["gallery"]);
    },
  });
};

const delGallery = ({
  id,
  fileName,
  userName,
}: {
  id: number;
  fileName: string;
  userName: string;
}) =>
  instance.delete(`v1/gallery/${id}`, {
    data: {
      fileName,
      userName,
    },
  });

export const useDelGallery = () => {
  const queryClient = useQueryClient();
  return useMutation(delGallery, {
    onSuccess: () => {
      queryClient.invalidateQueries(["gallery"]);
    },
  });
};
