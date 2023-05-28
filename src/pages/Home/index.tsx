import {
  Button,
  Container,
  DialogContent,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import Create from "./components/create";
import { useGetHome, useGetHomeBanner } from "@/queries/Home";
import Label from "@components/Label";

const Home: React.FC = () => {
  const { getQueryParams } = usePaginate();

  const { data } = useGetHome(getQueryParams());
  console.log(data);
  const { data: homeBanner } = useGetHomeBanner(getQueryParams());
  console.log(homeBanner);

  const { state: open, toggleState: onClose } = useToggle(false);

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
                  <img
                    src={homeBanner?.data.filename}
                    alt=""
                    className="h-1/2 w-1/2 aspect-video"
                  />
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
