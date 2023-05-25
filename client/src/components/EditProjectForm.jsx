/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";

// ** MUI Imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 3,
  px: 3,
  fontSize: 12,
  borderRadius: "8px",
};

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("new");

  //
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }]
  })

  //
  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill in all field!");
    }

    updateProject(name, description, status);


    setName("");
    setDescription("");
    setStatus("");
  }

  return (
    <div className="">
      <h3>Update Projects Details</h3>

      <Box sx={style}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextareaAutosize
          minRows={2}
          placeholder="Project Description..."
          sx={{
            p: 4,
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select
          placeholder="Project status..."
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 240,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <Option value="new">New</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
        <button
          className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md text-sm"
          data-bs-dismiss="modal"
          onClick={onSubmit}
        >
          Submit
        </button>
      </Box>
    </div>
  );
}

export default EditProjectForm;