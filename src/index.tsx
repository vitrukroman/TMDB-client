import { install } from "@material-ui/styles";

install();

import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Layout from "./components/layout";
import Movie from "./components/movie/movie";
import cache from "./graphql/cache";
import Mutation from "./graphql/localSchema/resolvers/mutation";
import "./localization/i18n";
import theme from "./styles/theme";

const typeDefs = require("./graphql/localSchema/localSchema.graphql");

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const stateLink = withClientState({
  cache,
  defaults: {
    language: "uk",
  },
  resolvers: {
    Mutation,
  },

  typeDefs,
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache,
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
