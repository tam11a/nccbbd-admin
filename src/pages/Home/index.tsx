import { Button, Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import Create from "./components/create";
import { useGetHome } from "@/queries/Home";


const Home: React.FC = () => {
  const { getQueryParams } = usePaginate();

  const { data, isLoading } = useGetHome(getQueryParams());
  console.log(data);

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
            <div className="flex flex-row">
              {/* <BackButton /> */}
              <Typography variant="subtitle1" fontWeight={700}>
                Home Page Details
              </Typography>
            </div>

            <Button variant="contained" onClick={() => onClose()}>
              Create Details
            </Button>
          </Grid>
          <Typography variant="subtitle1" fontWeight={700}>
            {data?.data.title}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            {data?.data.subtitle}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            {data?.data.description}
          </Typography>
        </Grid>
        <Create open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Home;
