import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useTodoHelper } from "../../helper/todoHelper";
import StickyHeadTable from "../StickyHeadTable/StickyHeadTable";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { TextInput } from "../TextInput/TextInput";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const { todoList } = useTodoHelper();
  const [setselectedTodo, setSetselectedTodo] = useState(todoList[0]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex border-2 w-full mb-10">
        <div className="w-96 p-5">
          <h1 className="text-center text-2xl font-semibold">{setselectedTodo?.title}</h1>
          <div className="overflow-hidden h-60 object-cover">
            <img
              className="object-cover m-auto h-60"
              src={setselectedTodo?.imgUrl}
              alt="model image"
              height={60}
            />
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{setselectedTodo?.title}</TableCell>
                <TableCell>{setselectedTodo?.project}</TableCell>
                <TableCell>{setselectedTodo?.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="w-full p-10">
          <h1>{`${setselectedTodo?.title} - ${moment(
            setselectedTodo?.startOn
          )}`}</h1>
          <TextInput
            label="Assign To"
            required={false}
            showCheckedIcon={false}
            fieldName="assignee"
            handleBlur={(e: React.ChangeEvent<any>) => {}}
            handleChange={(e: React.ChangeEvent<any>) => {}}
          />
        </div>
      </div>
      <div className="w-full flex flex-row-reverse">
        <Button
          sx={{ marginBottom: 1 }}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          <AddIcon />
        </Button>
      </div>

      <StickyHeadTable setSelectedJob={setSetselectedTodo} data={todoList} />
    </div>
  );
};
