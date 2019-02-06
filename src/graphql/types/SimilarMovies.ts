/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: SimilarMovies
// ====================================================

export interface SimilarMovies_configuration_images {
  __typename: "ImageConfiguration";
  base_url: string;
}

export interface SimilarMovies_configuration {
  __typename: "Configuration";
  images: SimilarMovies_configuration_images;
}

export interface SimilarMovies_similarMovies {
  __typename: "Movie";
  id: number;
  title: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  poster_path: string | null;
}

export interface SimilarMovies {
  configuration: SimilarMovies_configuration;
  similarMovies: SimilarMovies_similarMovies[];
}

export interface SimilarMoviesVariables {
  id: number;
  language: Language;
}
