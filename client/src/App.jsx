/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

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
          <Router>
            <Header />
            <div className="m-10">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
