/* eslint-disable no-unused-vars */
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CLIENT } from "../mutations/clientMutations";

// ** MUI imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
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

const AddClientModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all field!");
    }

    addClient(name, email, phone);

    setOpen(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md text-sm mt-4"
      >
        Add Client
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
            Add New Client
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
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
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
  );
};

export default AddClientModal;
