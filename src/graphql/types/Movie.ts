/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Language } from "./globalTypes";

// ====================================================
// GraphQL query operation: Movie
// ====================================================

export interface Movie_movie_lang {
  __typename: "MovieLang";
  value: Language;
}

export interface Movie_movie_genres {
  __typename: "Genre";
  id: string;
  name: string;
}

export interface Movie_movie_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
}

export interface Movie_movie_similarMovies {
  __typename: "Movie";
  id: number;
  title: string;
}

export interface Movie_movie_production_countries {
  __typename: "ProductionCountry";
  iso_3166_1: string;
  name: string;
}

export interface Movie_movie_cast {
  __typename: "Cast";
  name: string;
  order: number;
  character: string;
  gender: number | null;
}

export interface Movie_movie {
  __typename: "Movie";
  id: number;
  original_title: string;
  title: string;
  lang: Movie_movie_lang;
  genres: Movie_movie_genres[];
  budget: number;
  imdb_id: string | null;
  overview: string | null;
  keywords: Movie_movie_keywords[] | null;
  similarMovies: Movie_movie_similarMovies[];
  production_countries: Movie_movie_production_countries[];
  vote_average: number;
  vote_count: number;
  revenue: number;
  tagline: string | null;
  poster_path: string | null;
  cast: Movie_movie_cast[];
}

export interface Movie_configuration_images {
  __typename: "ImageConfiguration";
  base_url: string;
  poster_sizes: string[];
}

export interface Movie_configuration {
  __typename: "Configuration";
  images: Movie_configuration_images;
}

export interface Movie {
  movie: Movie_movie;
  configuration: Movie_configuration;
}

export interface MovieVariables {
  id: number;
  language: Language;
}
