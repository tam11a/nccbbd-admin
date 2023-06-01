import {
  Button,
  Container,
  DialogContent,
  Grid,
  Input,
  Skeleton,
  Typography,
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import Create from "./components/create";
import {
  useDelHomeBanner,
  useGetHome,
  useGetHomeBanner,
  usePostHomeBanner,
} from "@/queries/Home";
import Label from "@components/Label";
import Upload, { IFile } from "@components/Upload";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { previewGalleryImage } from "@/queries/gallery";

const Home: React.FC = () => {
  const { getQueryParams } = usePaginate();

  const { state: open, toggleState: onClose } = useToggle(false);
  const { data } = useGetHome(getQueryParams());
  // get gallery data
  const { data: galleryData, isLoading: galleryLoading } = useGetHomeBanner(getQueryParams());
  const { mutateAsync: galleryPost } = usePostHomeBanner();
  const { mutateAsync: deleteGallery } = useDelHomeBanner();

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
      message.success("Banner created successfully!");
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
        id,
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
    <>
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
              {/* <BackButton /> */}
              <Typography variant="subtitle1" fontWeight={700}>
                Home Page Details
              </Typography>
            </div>
          </Grid>
          <form>
            <DialogContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex flex-col relative">
                  <Label>Title</Label>
                  <Input
                    readOnly
                    // className="w-1/2"
                    placeholder="Home Page Title"
                    value={data?.data.title}
                  />
                </div>
                <div className="flex flex-col relative">
                  <Label>Sub-Title</Label>
                  <Input
                    readOnly
                    // className="w-1/2"
                    placeholder="Home Page Subtitle"
                    value={data?.data.subtitle}
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <Label>Description</Label>
                  <Input
                    readOnly
                    multiline
                    rows={4}
                    defaultValue={data?.data.description}
                  />
                </div>
              </div>

              <div>
                <Label>Banner</Label>
                <div className=" overflow-hidden rounded-md shadow-sm">
                  <div className="flex flex-row flex-wrap items-center justify-start gap-2">
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
                            onDelete={async (file) =>
                              await onDelete(file.data.id)
                            }
                            onChange={async (files) => {
                              files.map(async (file) => await onUpload(file));
                              return false;
                            }}
                          />
                        </>
                      )}
                    </Container>
                  </div>
                </div>
              </div>
              <Button
                className="w-1/6 my-2"
                variant="contained"
                onClick={() => onClose()}
              >
                Update Details
              </Button>
            </DialogContent>
          </form>
        </Grid>
        <Create open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Home;
