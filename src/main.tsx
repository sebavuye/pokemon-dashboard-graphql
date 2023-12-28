import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const client = new ApolloClient({ uri: "https://graphql-pokeapi.vercel.app/api/graphql", cache: new InMemoryCache() });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CssBaseline />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
