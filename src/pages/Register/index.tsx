import React from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Container,
  IconButton,
} from "@mui/material";
import { Input} from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm, FieldValues } from "react-hook-form";
import { signupResolver } from "./resolver";
import AuthContext from "@/contexts/AuthContext";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import moment from "moment";
import Iconify from "@components/iconify";

const Register: React.FC = () => {
  const { signup, isSignupLoading } = React.useContext(AuthContext);

  const {
    // reset,
    handleSubmit,
    control,
  } = useForm({
    resolver: joiResolver(signupResolver),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onValid = async ({ username, firstName, lastName,
    email, password }: FieldValues) => {
    signup(username, firstName, lastName, email, password);
  };

  return (
    <Container
      maxWidth={"sm"}
      className="min-h-screen flex flex-col items-center justify-between relative py-2 "
    >
      <div />
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(onValid)}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              width: "95vw",
              maxWidth: "350px",
              "& > *": { my: 0.5 },
            }}
            className="shadow shadow-slate-400"
          >
            <Typography>First name</Typography>

            <Controller
              control={control}
              name={"firstName"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  prefix={
                    <Icon
                      icon="icon-park-outline:edit-name"
                      color="#999"
                      className="mr-1 text-xl"
                    />
                  }
                  placeholder={"FirstName"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
            <Typography>Last Name</Typography>

            <Controller
              control={control}
              name={"lastName"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  prefix={
                    <Icon
                      icon="icon-park-outline:edit-name"
                      color="#999"
                      className="mr-1 text-xl"
                    />
                  }
                  placeholder={"LastName"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
            <Typography>Email</Typography>

            <Controller
              control={control}
              name={"email"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  prefix={
                    <Icon
                      icon="ic:outline-alternate-email"
                      color="#999"
                      className="mr-1 text-xl"
                    />
                  }
                  placeholder={"Email"}
                  size={"large"}
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
              name={"password"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Typography className="flex flex-row items-center gap-1">
                    Password
                    <ErrorSuffix error={error} size="small" />
                  </Typography>
                  <Input.Password
                    prefix={
                      <Icon
                        icon="ri:lock-password-line"
                        color="#999"
                        className="mr-1 text-xl"
                      />
                    }
                    placeholder={"Password"}
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    // suffix={}
                  />
                </>
              )}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              type={"submit"}
              disabled={isSignupLoading}
            >
              Sign up
            </Button>
          </Paper>
        </form>
        <Stack className="flex flex-col items-center my-5">
          <Stack className="flex flex-row items-center gap-1">
            <Link to="/app/login">
              <IconButton
                sx={{
                  color: "primary.contrastText",
                  fontSize: "12px",
                }}
              >
                <Iconify
                  icon={"material-symbols:arrow-back-ios-rounded"}
                  className="text-black"
                />
                <Typography variant="caption" className="font-md text-black">
                  Already have an account?
                </Typography>
              </IconButton>
            </Link>
          </Stack>
        </Stack>
      </div>
      <Stack className="flex flex-col items-center">
        <Stack className="flex flex-row items-center gap-1 ">
          <Typography component={Link} to={"/privacy"} variant="caption">
            Privacy Policy
          </Typography>{" "}
          |
          <Typography variant="caption" component={Link} to={"/terms"}>
            Terms and Conditions
          </Typography>
        </Stack>
        <Stack className="flex flex-row items-center gap-1">
          <Typography variant="caption">
            ©{moment().format("yyyy")} All Rights Reserved by ---
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Register;
