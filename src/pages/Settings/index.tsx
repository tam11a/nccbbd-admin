import useUser from "@/hooks/useUser";
import { useUpdateUserInfo } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { message } from "@components/antd/message";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Input } from "antd";
import React, { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

const Settings: React.FC = () => {
  const user = useUser();
  console.log(user);

  const { control, handleSubmit, reset } = useForm();
  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
  }, [user.firstName, user.lastName, user.username]);

  const { mutateAsync: updateUser } = useUpdateUserInfo();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    message.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
          },
        }),
      [201]
    );
    message.destroy();
    if (res.status) message.success("Information updated successfully!");
    else message.error(res.message);
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
                Settings
              </Typography>
            </div>
          </Grid>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-4"
          >
            {/* <Label>Email</Label>
        <Input
          disabled
          readOnly
          placeholder="Email"
          size="large"
            deafaultValue={user?.email}
        /> */}

            <Input.Group compact>
              <Label isRequired>Full Name</Label>
              <Controller
                control={control}
                name={"firstName"}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className="w-1/2"
                    placeholder="First Name"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
              <Controller
                control={control}
                name={"lastName"}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className="w-1/2"
                    placeholder="Last Name"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </Input.Group>
            <div>
              <Label isRequired>Username</Label>
              <Controller
                control={control}
                name={"username"}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="username"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>

            <Button
              variant="contained"
              size="large"
              fullWidth
              className="my-4"
              type="submit"
            >
              Update Information
            </Button>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default Settings;
