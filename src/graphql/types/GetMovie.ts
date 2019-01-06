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

export interface GetMovie_movie {
  __typename: "Movie";
  id: number;
  original_title: string;
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
}

export interface GetMovie {
  movie: GetMovie_movie | null;
}
