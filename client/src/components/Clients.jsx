/* eslint-disable no-unused-vars */
import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

// **
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { GET_PROJECTS } from "../queries/projectQueries";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#448aff",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Clients = () => {
  const { loading, error, data, refetchClients } = useQuery(GET_CLIENTS);
  const { refetchProjects } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!!</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Clients</h1>
      <div>
        {!loading && !error && (
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.clients.map((client) => (
                  <ClientRow
                    key={client.id}
                    client={client}
                    refetchClients={refetchClients}
                    refetchProjects={refetchProjects}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default Clients;
