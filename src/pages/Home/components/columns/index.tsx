import useAreYouSure from "@/hooks/useAreYouSure";
import { useDelHomeBanner } from "@/queries/Home";
import handleResponse from "@/utilities/handleResponse";
import { IDataTable } from "@components/Datatable/Types";
import { message } from "@components/antd/message";
import { IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";


const Column = (): GridColumns<IDataTable> => {

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 200,
      // flex: 1,
      sortable: false,
      hide: true,
    },
    {
      headerName: "Title",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
    },
    {
      headerName: "Sub-Title",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
    },
    {
      headerName: "Description",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
    },
    // {
    //   headerName: "Action",
    //   headerAlign: "center",
    //   field: "action",
    //   sortable: true,
    //   align: "center",
    //   width: 80,
    //   renderCell: (data: any) => {
    //     const { mutateAsync: delHomeBanner } = useDelHomeBanner();

    //     const onDelete = async (id: any) => {
    //       message.open({
    //         type: "loading",
    //         content: "Deleting Banner..",
    //         duration: 0,
    //       });
    //       const res = await handleResponse(() => delHomeBanner(id), [200]);
    //       message.destroy();
    //       if (res.status) {
    //         message.success(res.message);
    //       } else {
    //         message.error(res.message);
    //       }
    //     };

    //     const { contextHolder: delContextHolder, open: openClose } =
    //       useAreYouSure({
    //         title: "WANT TO Delete?",
    //         okText: "Delete",
    //         cancelText: "Cancel",
    //       });

    //     return (
    //       <>
    //         {delContextHolder}

    //         <IconButton
    //           sx={{ fontSize: "large" }}
    //           color="error"
    //           onClick={() =>
    //             openClose(
    //               () => onDelete(data.row.id),
    //               <>
    //                 Are you sure you want to delete this review?
    //               </>
    //             )
    //           }
    //         >
    //           <MdDelete />
    //         </IconButton>
    //       </>
    //     );
    //   },
    // },
  ];
};

export default Column;
