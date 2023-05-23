import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import AddClientModal from "./components/AddClientModal";
import Clients from "./components/Clients";
import Header from "./components/Header";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

// ** MUI theme
const theme = createTheme({
  typography: {
    fontSize: 14,
  },
  components: {},
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Header />
          <div className="m-4">
            <AddClientModal />
            <Clients />
          </div>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
