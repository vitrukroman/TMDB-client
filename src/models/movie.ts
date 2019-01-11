import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import {
  GetMovie_movie, GetMovie_movie_cast, GetMovie_movie_genres, GetMovie_movie_keywords,
  GetMovie_movie_production_countries,
  GetMovie_movie_similarMovies,
} from "../graphql/types/GetMovie";

class Movie implements GetMovie_movie {
  public readonly __typename: "Movie" = "Movie";
  public readonly budget: number;
  public readonly cast: GetMovie_movie_cast[];
  public readonly genres: GetMovie_movie_genres[];
  public readonly id: number;
  public readonly imdb_id: string | null;
  public readonly keywords: GetMovie_movie_keywords[];
  public readonly original_title: string;
  public readonly overview: string | null;
  public readonly poster_path: string | null;
  public readonly production_countries: GetMovie_movie_production_countries[];
  public readonly revenue: number;
  public readonly similarMovies: GetMovie_movie_similarMovies[];
  public readonly tagline: string | null;
  public readonly title: string;
  public readonly vote_average: number;
  public readonly vote_count: number;

  public constructor(props: GetMovie_movie) {
    this.budget = props.budget;
    this.cast = [...props.cast];
    this.genres = [...props.genres];
    this.id = props.id;
    this.imdb_id = props.imdb_id;
    this.keywords = props.keywords === null ? [] : props.keywords;
    this.original_title = props.original_title;
    this.overview = props.overview;
    this.poster_path = props.poster_path;
    this.production_countries = props.production_countries;
    this.revenue = props.revenue;
    this.similarMovies = [...props.similarMovies];
    this.tagline = props.tagline;
    this.title = props.title;
    this.vote_average = props.vote_average;
    this.vote_count = props.vote_count;
  }

  public get ratingColorHue(): 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 {
    let voteAverageHue = this.vote_average * 100;
    voteAverageHue = voteAverageHue - voteAverageHue % 100;
    if (voteAverageHue === 1000) {
      return 900;
    }

    return voteAverageHue as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  }

  public getPosterWidthByBreakpoint(breakPoint: Breakpoint) {
    switch (breakPoint) {
      case "xs": return "w154";
      case "sm": return "w185";
      case "md": return "w342";
      case "lg": return "w500";
      case "xl": return "w780";
      default: return ne;
    }
  }

}

export default Movie;
