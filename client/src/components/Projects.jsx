/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Projects</h1>
      <div>
        {data.projects.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p>No Project</p>
        )}
      </div>
    </>
  );
};

export default Projects;
