import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { TodoStatus } from "../../redux/models/TodoStatus";
import { useTodoHelper } from "../../helper/todoHelper";
import { TodoModel } from "../../redux/models/TodoModel";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../TextInput/TextInput";
import { FileUpload } from "../FileUpload/FileUpload";
import { ActionMenu } from "../ActionMenu";
import { useEffect, useState } from "react";

interface CreateFormProps {
  id?: number;
  title?: string;
  project?: string;
  status?: TodoStatus;
  frame?: string;
  startOn?: Date;
  callback?: () => void;
  isEdit?: boolean;
  file?: File;
  assignee?: string;
}

export const CreateForm = ({
  id,
  title = "Todo Title",
  project,
  status = TodoStatus.NEW,
  isEdit = false,
  startOn,
  frame,
  file,
  assignee,
  callback,
}: CreateFormProps) => {
  const params = useParams();
  const paramId = params["id"];
  const { todoList } = useTodoHelper();
  const toDoParam = todoList.find(
    (item) => item.id === parseInt(paramId ?? "")
  );
  const defaultValue = {
    title: title,
    project: project,
    status: status,
    frame: frame,
    file: file,
    assignee: assignee,
  } as TodoModel;
  const initialValue = toDoParam ?? defaultValue;
  const isEditing = !!toDoParam;

  const fieldName = {
    title: "title",
    project: "project",
    status: "status",
    frame: "frame",
    file: "file",
    assignee: "assignee",
  };
  const { createTodoItem, updateTodoItem } = useTodoHelper();
  const [imgUrl, setImgUrl] = useState("second");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<any>) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImgUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (values: TodoModel) => {
    if (isEdit || isEditing) {
      updateTodoItem(values);
    } else {
      createTodoItem(values);
    }
    navigate(`/dashboard`);
    callback?.();
  };

  return (
    <>
      <h1 className="mb-5 text-center text-3xl font-semibold">
        Create new Task
      </h1>
      <div className="border-2 border-solid rounded-l p-10 mb-10 relative">
        <div className="absolute right-0 top-2">
          <Button color="error" onClick={() => navigate("/dashboard")}>
            <CloseIcon />
          </Button>
        </div>
        <Formik
          validateOnChange
          validateOnBlur
          initialValues={initialValue}
          validationSchema={Yup.object().shape({
            [fieldName.title]: Yup.string().required("Title is required!"),
            [fieldName.project]: Yup.string().required("Project is required!"),
          })}
          onSubmit={(values) => {
            handleSubmit({
              ...values,
              imgUrl: imgUrl,
              id: parseInt(paramId ?? ""),
              startOn: startOn ?? new Date().toString(),
            } as TodoModel);
          }}
        >
          {({ isValid, values, errors, handleBlur, handleChange }) => (
            <Form>
              <TextInput
                error={errors.title}
                fieldName={fieldName.title}
                required
                label={"Title"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.title}
                showCheckedIcon={!errors.title && !!values.title}
              />
              <TextInput
                error={errors.project}
                fieldName={fieldName.project}
                required={false}
                label={"Project"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.project}
                showCheckedIcon={!errors.project && !!values.project}
              />

              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                className="w-full"
                name={fieldName.status}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.status}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value={TodoStatus.NEW}>{TodoStatus.NEW}</MenuItem>
                <MenuItem value={TodoStatus.IN_PROGRESS}>
                  {TodoStatus.IN_PROGRESS}
                </MenuItem>
                <MenuItem value={TodoStatus.DONE}>{TodoStatus.DONE}</MenuItem>
              </Select>
              <TextInput
                error={errors.frame}
                fieldName={fieldName.frame}
                required
                label={"Frame Name"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.frame}
                showCheckedIcon={!errors.frame && !!values.frame}
              />
              <TextInput
                error={errors.assignee}
                fieldName={fieldName.assignee}
                required
                label={"Assigned To"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.assignee}
                showCheckedIcon={!errors.assignee && !!values.assignee}
              />
              <div className="flex w-full">
                <ActionMenu
                  fileUploadProps={{
                    fieldName: fieldName.file,
                    onUpload: handleImageUpload,
                    handleBlur: handleBlur,
                  }}
                />
                <FileUpload imgUrl={imgUrl} fieldName={fieldName.file} />
              </div>
              <div className="mt-5 flex flex-row-reverse gap-5">
                {isEdit || isEditing ? (
                  <Button type="submit" disabled={!isValid} color="primary">
                    Update
                  </Button>
                ) : (
                  <Button
                    disabled={!isValid}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add
                  </Button>
                )}
                <Button onClick={() => navigate("/dashboard")} color="error">
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
