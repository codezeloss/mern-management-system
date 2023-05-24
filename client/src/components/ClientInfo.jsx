/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const ClientInfo = ({ client }) => {
  return (
    <>
      <h5 className="text-lg font-semibold mt-2">Client Information</h5>

      <ul>
        <li>Name: {client.name}</li>
        <li>Email: {client.email}</li>
        <li>Phone: {client.phone}</li>
      </ul>
    </>
  );
};

export default ClientInfo;
