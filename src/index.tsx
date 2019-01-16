import { install } from "@material-ui/styles";

install();

import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Layout from "./components/layout";
import Movie from "./components/movie";
import theme from "./styles/theme";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Layout>
            <Route exact path="/movie/:id" render={(props: RouteComponentProps<{
              id: string,
            }>) => <Movie id={props.match.params.id}/>}/>
          </Layout>
        </BrowserRouter>
      </CssBaseline>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
