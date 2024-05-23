import { useField } from "formik";
import React from "react";

interface FileUploadProps {
  fieldName: string;
  imgUrl: string;
}

export const FileUpload = ({ fieldName, imgUrl }: FileUploadProps) => {
  return (
    <div className="border-2 w-full ml-5 p-5 rounded-lg">
      <div className="border-2 m-auto h-96">
        <img className="m-auto h-full" alt="image uploaded" src={imgUrl} />
      </div>
    </div>
  );
};
