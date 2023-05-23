/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
// import { GET_CLIENTS } from "../queries/clientQueries";

const ClientRow = ({ client, refetch }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="bg-red-600 text-white p-2"
          onClick={() => {
            deleteClient({ variables: { id: client.id } });
            refetch();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
