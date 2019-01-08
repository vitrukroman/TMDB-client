import CssBaseline from "@material-ui/core/CssBaseline";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Movie from "./components/movie";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <CssBaseline>
      <BrowserRouter>
        <Route exact path="/movie/:id" render={(props: RouteComponentProps<{
          id: string,
        }>) => <Movie id={props.match.params.id}/>}/>
      </BrowserRouter>
    </CssBaseline>
  </ApolloProvider>,
  document.getElementById("root"),
);
