import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import { GetLanguage } from "../graphql/types/GetLanguage";
import { Language } from "../graphql/types/globalTypes";

const withLanguage = <TComponentProps>(component: React.ComponentType<TComponentProps & {
  language: Language,
}>) =>
  graphql<TComponentProps, GetLanguage, {},
    TComponentProps & {
    language: Language,
  }>(gql`
  query GetLanguage {
    language
  }
`, {
    props: (params) => ({
      language: params.data!.language!,
      ...params.ownProps,
    }),
  })(component);

export default withLanguage;
