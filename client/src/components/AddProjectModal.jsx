/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

// ** MUI imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { GET_CLIENTS } from "../queries/clientQueries";

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

const AddProjectModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  //
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  //
  const { loading, error, data, refetch } = useQuery(GET_CLIENTS);

  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all field!");
    }

    addProject(name, description, status, clientId);

    setOpen(false);
    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
  };

  if (loading) return null;
  if (error) return <p>Something went wrong!!</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div>
            <button
              onClick={handleOpen}
              className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md text-sm my-4"
            >
              Add Project
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h1"
                  sx={{
                    mb: 1,
                  }}
                >
                  Add New Project
                </Typography>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "100%", mb: 2 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
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
                  <Select
                    placeholder="Select Client..."
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
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    {data.clients.map((client) => (
                      <Option key={client.id} value={client.id}>
                        {client.name}
                      </Option>
                    ))}
                  </Select>
                  <button
                    className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md text-sm"
                    data-bs-dismiss="modal"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </Box>
              </Box>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
