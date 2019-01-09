/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Status } from "./globalTypes";

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

export interface GetMovie_movie {
  __typename: "Movie";
  id: number;
  original_title: string;
  title: string;
  adult: boolean | null;
  status: Status;
  genres: GetMovie_movie_genres[];
  budget: number;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  overview: string | null;
  popularity: number;
  keywords: GetMovie_movie_keywords[] | null;
  similarMovies: GetMovie_movie_similarMovies[];
  production_countries: GetMovie_movie_production_countries[];
  vote_average: number;
  vote_count: number;
  revenue: number;
  tagline: string | null;
}

export interface GetMovie {
  movie: GetMovie_movie | null;
}

export interface GetMovieVariables {
  id: number;
}
