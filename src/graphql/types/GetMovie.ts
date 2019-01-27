/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMovie
// ====================================================

export interface GetMovie_movie_genres {
  __typename: "Genre";
  id: string;
  name: string;
}

export interface GetMovie_movie_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
}

export interface GetMovie_movie_similarMovies {
  __typename: "Movie";
  id: number;
  title: string;
}

export interface GetMovie_movie_production_countries {
  __typename: "ProductionCountry";
  iso_3166_1: string;
  name: string;
}

export interface GetMovie_movie_cast {
  __typename: "Cast";
  name: string;
  order: number;
  character: string;
  gender: number | null;
}

export interface GetMovie_movie {
  __typename: "Movie";
  id: number;
  original_title: string;
  title: string;
  genres: GetMovie_movie_genres[];
  budget: number;
  imdb_id: string | null;
  overview: string | null;
  keywords: GetMovie_movie_keywords[] | null;
  similarMovies: GetMovie_movie_similarMovies[];
  production_countries: GetMovie_movie_production_countries[];
  vote_average: number;
  vote_count: number;
  revenue: number;
  tagline: string | null;
  poster_path: string | null;
  cast: GetMovie_movie_cast[];
}

export interface GetMovie_configuration_images {
  __typename: "ImageConfiguration";
  base_url: string;
  poster_sizes: string[];
}

export interface GetMovie_configuration {
  __typename: "Configuration";
  images: GetMovie_configuration_images;
}

export interface GetMovie {
  movie: GetMovie_movie;
  configuration: GetMovie_configuration;
}

export interface GetMovieVariables {
  id: number;
  language: Language;
}
