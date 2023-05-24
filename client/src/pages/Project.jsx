/* eslint-disable no-unused-vars */
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import { GET_PROJECT } from "../queries/projectQueries";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!!</p>;

  return (
    <>
      {!loading && !error && (
        <div className="">
          <div className="">
            <Link to="/" className="text-sm font-normal">
              Back
            </Link>
          </div>

          <div className="max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold my-4">{data.project.name}</h1>

            <h5 className="text-lg font-semibold mt-2">Project Description</h5>
            <p>{data.project.description}</p>

            <h5 className="text-lg font-semibold mt-2">Project Status</h5>
            <p className="text-sm text-gray-600 font-medium">
              {data.project.status}
            </p>

            <ClientInfo client={data.project.client} />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
