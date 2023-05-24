import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <Projects />
      <AddProjectModal/>
      <Clients />
      <AddClientModal />
    </>
  );
};

export default Home;
