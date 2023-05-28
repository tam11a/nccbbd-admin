import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { MdClose } from "react-icons/md";
import handleResponse from "@/utilities/handleResponse";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import Label from "@components/Label";
import { usePostHome } from "@/queries/Home";
import { Icon } from "@iconify/react";

const Create: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const user = useUser();

  const { handleSubmit, control } = useForm({});
  const { mutateAsync: createHome } = usePostHome();

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Product..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createHome({
          ...data,
          createdBy: user.username,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Home created successfully!");
      onClose();
    } else {
      message.error(res.message);
    }
  };

  const { contextHolder: closeContextHolder, open: openClose } = useAreYouSure({
    title: "WANT TO CLOSE?",
    okText: "Close Anyway",
    cancelText: "Cancel",
  });

  const handleClose = () =>
    openClose(
      onClose,
      <>
        You may have some unsaved changes which will be lost closing the dialog.
      </>
    );
  {
    ("");
  }
  return (
    <>
      {closeContextHolder}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "98vw !important",
            maxWidth: "560px !important",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={"flex flex-row items-center justify-between"}>
            <ListItemText
              primary={"Home Page"}
              secondary={`Create a New Home Page Details`}
              primaryTypographyProps={{
                fontWeight: "700",
                color: "#000",
              }}
              className="p-0 m-0"
            />
            <IconButton size="small" onClick={handleClose}>
              <MdClose />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col relative">
                <Label isRequired>Title</Label>
                <Controller
                  control={control}
                  name={"name"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Home Page Title"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col relative">
                <Label isRequired>Sub-Title</Label>
                <Controller
                  control={control}
                  name={"name"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Home Page Subtitle"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <Label>Description</Label>
                <Controller
                  control={control}
                  name={"description"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Description.."
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <Label>Icon</Label>
              <Button
                variant="contained"
                startIcon={<Icon icon="ic:round-file-upload" />}
              >
                Click to Upload
              </Button>
            </div>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant={"contained"}
              // disabled={createLoading}
              disabled
              type={"submit"}
            >
              Create
            </Button>
            <Button variant={"outlined"} onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Create;
