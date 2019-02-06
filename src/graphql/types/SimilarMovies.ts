/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: SimilarMovies
// ====================================================

export interface SimilarMovies_similarMovies {
  __typename: "Movie";
  title: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  poster_path: string | null;
}

export interface SimilarMovies {
  similarMovies: SimilarMovies_similarMovies[];
}

export interface SimilarMoviesVariables {
  id: number;
  language: Language;
}
