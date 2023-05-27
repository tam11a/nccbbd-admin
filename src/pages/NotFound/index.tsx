import React from "react";
import { Avatar } from "@mui/material";

const NotFound: React.FC = () => {
	return (
    <div className="h-[100vh] max-h-full flex flex-col items-center justify-center gap-2">
      <Avatar
        src={"/404.svg"}
        sx={{
          width: "90%",
          maxWidth: "750px",
          height: "auto",
        }}
        variant={"square"}
      />
    </div>
  );
};

export default NotFound;
