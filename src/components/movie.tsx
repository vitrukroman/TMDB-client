import { Theme } from "@material-ui/core";
import Badge from "@material-ui/core/Badge/Badge";
import Chip from "@material-ui/core/Chip/Chip";
import { green, red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import unstable_useMediaQuery from "@material-ui/core/useMediaQuery/unstable_useMediaQuery";
import FaceIcon from "@material-ui/icons/Face";
import StarIcon from "@material-ui/icons/StarRounded";
import { makeStyles, useTheme } from "@material-ui/styles";
import numeral from "numeral";
import React from "react";
import Query from "react-apollo/Query";
import getMovie from "../graphql/queries/getMovie";
import { GetMovie } from "../graphql/types/getMovie";
import Actor from "../models/actor";
import Movie from "../models/movie";

class GetMovieQuery extends Query<GetMovie> {}

interface IComponentProps {
  id: string;
}

const useStyles = makeStyles({
  badge: {
    padding: "0 4px",
    width: "auto",
  },
});

export default (props: IComponentProps) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const xs = unstable_useMediaQuery(theme.breakpoints.down("xs"));
  const sm = unstable_useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const md = unstable_useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lg = unstable_useMediaQuery(theme.breakpoints.between("md", "lg"));
  const xl = unstable_useMediaQuery(theme.breakpoints.between("lg", "xl"));

  return <GetMovieQuery
    query={getMovie}
    variables={{
      id: Number(props.id),
    }}
  >
    {(result) => {
      if (result.loading) {
        return <span>loading...</span>;
      }

      if (result.error) {
        return <span>error...</span>;
      }

      if (!result.data) {
        return <span>movie not found</span>;
      }

      const movie = new Movie(result.data.movie);

      const genreChips = movie.genres.map((genre) => {
        return <Chip icon={<StarIcon/>} label={genre.name} key={genre.id} variant="outlined" style={{
          margin: "0 2px 2px 0",
        }}/>;
      });

      const productionCountries = movie.production_countries.map((productionCountry) => {
        return <Chip label={productionCountry.name} key={productionCountry.iso_3166_1} variant="outlined"
                     style={{
                       margin: 2,
                     }}/>;
      });

      const cast = <Grid container justify="flex-start" alignItems="center">
        <Typography style={{
          margin: 2,
        }}>Cast: </Typography>
        {movie.cast.slice(0, 10).sort((person1, person2) => {
          return person1.order < person2.order ? -1 : person1.order > person2.order ? 1 : 0;
        }).map((person) => {
          const actor = new Actor(person);
          let color: "primary" | "secondary" = "primary";

          if (actor.isFemale) {
            color = "secondary";
          }

          return <Chip label={actor.name} icon={<FaceIcon/>} color={color} variant="outlined" style={{
            margin: 2,
          }}/>;
        })}</Grid>;

      const budgetRevenueDifference = movie.revenue - movie.budget;
      const budgetRevenueSign = budgetRevenueDifference > 0 ? "+" : "-";
      const budgetText = numeral(movie.budget).format("$0,0");

      return <section style={{
        padding: 8,
      }}>
        <header style={{
          marginBottom: 16,
          display: "flex",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",

          }}>
            <div style={{
              backgroundColor: green[movie.ratingColorHue],
              borderRadius: "1.25rem",
              width: "2.5rem",
              textAlign: "center",
              marginRight: 16,
            }}>
              <Badge badgeContent={movie.vote_count} color="secondary" classes={{
                badge: classes.badge,
              }}>
                <Typography variant="h2" style={{
                  lineHeight: "2.5rem",
                  ...(movie.vote_average >= 6 && {
                    color: "white",
                  }),
                }}>{movie.vote_average}</Typography>
              </Badge>
            </div>
          </div>
          <div>
            <Typography variant="h1">{movie.title}</Typography>
            <Typography variant="subtitle1" style={{
              fontStyle: "italic",
            }}>{movie.tagline}</Typography>
          </div>
        </header>
        <main>
          <div style={{
            marginBottom: 8,
          }}>
            <Typography style={{
              display: "inline",
            }}>Budget/Revenue: {budgetText} </Typography>
            <Typography style={{
              display: "inline",
              ...(budgetRevenueDifference > 0 && {
                color: green[400],
              }),
              ...(budgetRevenueDifference <= 0 && {
                color: red[400],
              }),
            }}>
              ({budgetRevenueSign}{numeral(budgetRevenueDifference).format("$0,0")})
            </Typography>
          </div>
          <div style={{
            display: "flex",
          }}>
            <img src={`${result.data.configuration.images.base_url}/`}/>
            <div>
              <div style={{
                marginBottom: 8,
              }}>
                <Typography style={{
                  display: "inline",
                }}>Genres: </Typography>
                <div style={{
                  display: "inline",
                }}>{genreChips}</div>
              </div>
              <div style={{
                marginBottom: 8,
              }}>
                <Typography style={{
                  display: "inline",
                }}>Countries: </Typography>
                <div style={{
                  display: "inline",
                }}>{productionCountries}</div>
              </div>
              <Typography style={{
                marginBottom: 8,
              }}>{movie.overview}</Typography>
            </div>
          </div>
          {cast}
        </main>
      </section>;
    }}
  </GetMovieQuery>;
};
