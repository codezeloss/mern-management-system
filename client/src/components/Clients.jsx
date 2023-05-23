/* eslint-disable no-unused-vars */
import { useQuery, gql } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data, refetch } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!!</p>;
  }

  return (
    <>
      {!loading && !error && (
        <table>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} refetch={refetch} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
