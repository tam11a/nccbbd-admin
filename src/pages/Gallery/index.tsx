import React from "react";
import { Container, Grid, Skeleton, Typography } from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import { previewGalleryImage, useDelGallery, useGetGallery, usePostGallery } from "@/queries/gallery";;
import Upload, { IFile } from "@components/Upload";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";

const Gallery: React.FC = () => {
  const { getQueryParams } = usePaginate();

  // get gallery data
  const { data: galleryData, isLoading: galleryLoading } = useGetGallery(
    getQueryParams()
  );
  // console.log(galleryData);

  const { mutateAsync: galleryPost } = usePostGallery();
  const { mutateAsync: deleteGallery } = useDelGallery();
  const [gallery, setGallery] = React.useState<IFile[]>([]);

  // onUpload 
  const onUpload = async (data: any) => {
    message.open({
      type: "loading",
      content: "Uploading image..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        galleryPost({
          data: {
            File: data,
          },
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Gallery created successfully!");
    } else {
      message.error(res.message);
    }
  };

   React.useEffect(() => {
     if (!galleryData) return;
     setGallery(
       Array.from(galleryData?.data, (data: any) => ({
         id: data.id,
         preview: previewGalleryImage(data.filename),
         data: data,
       }))
     );
   }, [galleryData]);
  
  //onDelete
  const onDelete = async (id: number) => {
    message.open({
      type: "loading",
      content: "Deleting Photo..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      deleteGallery({
        id
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

 

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        maxWidth: "1500px !important",
      }}
    >
      <Grid container rowGap={2} direction="column" marginTop={4}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <Typography variant="subtitle1" fontWeight={700}>
              Gallery
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid className="mt-5">
        <Container maxWidth={"md"} className="py-4">
          {galleryLoading ? (
            <div className="flex flex-row flex-wrap items-center justify-start gap-2">
              {Array.from(Array(4).keys())?.map((l) => (
                <Skeleton
                  variant="rectangular"
                  className="relative h-28 w-28"
                  key={l}
                />
              ))}
            </div>
          ) : (
            <>
              <Upload
                multiple
                showPreview
                showDeleteWarning
                defaultValue={gallery}
                onDelete={async (file) => await onDelete(file.data.id)}
                onChange={async (files) => {
                  files.map(async (file) => await onUpload(file));
                  return false;
                }}
              />
            </>
          )}
        </Container>
      </Grid>
    </Container>
  );
};

export default Gallery;
