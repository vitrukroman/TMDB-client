import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import numeral from "numeral";
import {
  GetMovie_movie, GetMovie_movie_genres, GetMovie_movie_keywords,
  GetMovie_movie_production_countries,
  GetMovie_movie_similarMovies,
} from "../graphql/types/GetMovie";
import { assertNever } from "../utils/utils";
import Actor from "./actor";

class Movie implements GetMovie_movie {
  public readonly __typename: "Movie" = "Movie";
  public readonly budget: number;
  public readonly cast: Actor[];
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
    this.cast = props.cast.map((cast) => new Actor(cast)).sort((person1, person2) => {
      return person1.order < person2.order ? -1 : person1.order > person2.order ? 1 : 0;
    });
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
      case "xs":
        return "w500";
      case "sm":
        return "w500";
      case "md":
        return "w500";
      case "lg":
        return "w500";
      case "xl":
        return "w500";
      default:
        return assertNever(breakPoint);
    }
  }

  public getPosterUrl(baseUrl: string, breakPoint: Breakpoint) {
    return [
      baseUrl,
      this.getPosterWidthByBreakpoint(breakPoint),
      this.poster_path,
    ].join("");
  }

  public get mainCast() {
    return this.cast.slice(0, 10);
  }

  public get budgetRevenueDiff() {
    return this.revenue - this.budget;
  }

  public get budgetRevenueDiffSign() {
    return this.budgetRevenueDiff > 0 ? "+" : "-";

  }

  public get budgetFormatted() {
    return numeral(this.budget).format("$0,0");
  }

  public get budgetRevenueDiffFormatted() {
    return numeral(this.budgetRevenueDiff).format("$0,0");
  }

  public get budgetRevenueDiffFormattedWithSign() {
    return this.budgetRevenueDiffSign + this.budgetRevenueDiffFormatted;
  }

}

export default Movie;
