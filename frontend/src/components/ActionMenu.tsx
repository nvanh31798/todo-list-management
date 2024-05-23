import React from "react";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForever";
import { Button, Input } from "@mui/material";
import { useField } from "formik";

interface FileUploadProps {
  fieldName: string;
  onUpload: (e: React.FocusEvent<any, Element>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
}

interface ActionMenuProps {
  fileUploadProps?: FileUploadProps;
}

export const ActionMenu = ({ fileUploadProps }: ActionMenuProps) => {
  const [field, meta, helpers] = useField(fileUploadProps?.fieldName ?? "");

  const { setValue } = helpers;

  const handleFileChange = (e: React.FocusEvent<any, Element>) => {
    let file = e.currentTarget.files[0];
    const fileObject = { file };
    fileUploadProps?.onUpload(e);
    setValue(fileObject);
  };

  return (
    <div className="flex flex-col gap-5 w-16">
      <Button disabled variant="outlined" className="border-2 p-3">
        <ZoomOutMapOutlinedIcon fontSize="small" />
      </Button>
      <Button variant="outlined" className="border-2 p-3 relative m-auto">
        <input
          accept="image/*"
          onChange={handleFileChange}
          onBlur={fileUploadProps?.handleBlur}
          name={fileUploadProps?.fieldName}
          className="w-full"
          style={{ opacity: 0, position: "absolute" }}
          type="file"
        />
        <PermMediaOutlinedIcon fontSize="small" />
      </Button>
      <Button disabled variant="outlined" className="border-2 p-3">
        <DeleteForeverOutlinedIcon fontSize="small" />
      </Button>
    </div>
  );
};
