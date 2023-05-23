/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ClientRow = ({ client, refetch }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
  });

  return (
    <StyledTableRow key={client.id}>
      <StyledTableCell component="th" scope="row">
        {client.name}
      </StyledTableCell>
      <StyledTableCell align="left">{client.email}</StyledTableCell>
      <StyledTableCell align="left">{client.phone}</StyledTableCell>
      <StyledTableCell align="right">
        <button
          className="bg-red-600 text-white p-2"
          onClick={() => {
            deleteClient();
            refetch();
          }}
        >
          Delete
        </button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ClientRow;
