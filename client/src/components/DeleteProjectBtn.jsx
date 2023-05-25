/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMutation ,useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const DeleteProjectBtn = ({ projectId }) => {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT,
    {
      variables: { id: projectId },
      onCompleted: () => navigate('/'),
      refreshQueries: [{ query: GET_PROJECTS }]
    })

  return (
    <div className="flex items-center justify-between">
      <div></div>

      <button className="bg-red-600 text-white text-sm rounded-md font-medium py-2 px-4 mt-4" onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default DeleteProjectBtn;