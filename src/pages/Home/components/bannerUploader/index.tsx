import { useDelHomeBanner, usePostHomeBanner } from "@/queries/Home";
import { IGalleryFile } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";

const useUploader = (): {
  onUpload: (fileType: IGalleryFile, file?: File) => Promise<boolean>;
  onDelete: (id:number, fileName: string) => Promise<boolean>;
} => {
  // upload query
  const { mutateAsync: uploadBanner } = usePostHomeBanner();

  const onUpload = async (fileType: IGalleryFile, file?: File) => {
    if (!file) {
      message.error("No image added to upload");
      return false;
    }
    message.open({
      type: "loading",
      content: "Uploading Photo..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        uploadBanner({
          data: {
            File: file,
            FileType: fileType
          },
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Photo uploaded successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  // delete query
  const { mutateAsync: deleteFile } = useDelHomeBanner();

  const onDelete = async (id: number,fileName: string) => {
    message.open({
      type: "loading",
      content: "Deleting Photo..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      deleteFile({
        id,
        fileName
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Photo deleted successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  return {
    onUpload,
    onDelete,
  };
};

export default useUploader;
