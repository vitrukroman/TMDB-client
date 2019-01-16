import { Theme } from "@material-ui/core";
import Badge from "@material-ui/core/Badge/Badge";
import Chip from "@material-ui/core/Chip/Chip";
import { green, red } from "@material-ui/core/colors";
import unstable_useMediaQuery from "@material-ui/core/es/useMediaQuery/unstable_useMediaQuery";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import FaceIcon from "@material-ui/icons/Face";
import StarIcon from "@material-ui/icons/StarRounded";
import { makeStyles, useTheme } from "@material-ui/styles";
import React from "react";
import Query from "react-apollo/Query";
import getMovie from "../graphql/queries/getMovie";
import { GetMovie } from "../graphql/types/getMovie";
import { useBreakPoint } from "../hooks/useBreakpoint";
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
  const breakpoint = useBreakPoint();
  const theme = useTheme<Theme>();
  const smAndUp = unstable_useMediaQuery(theme.breakpoints.up("sm"));

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
        {movie.mainCast.map((actor) => {
          let color: "primary" | "secondary" = "primary";

          if (actor.isFemale) {
            color = "secondary";
          }

          return <Chip key={actor.name} label={actor.name} icon={<FaceIcon/>} color={color} variant="outlined" style={{
            margin: 2,
          }}/>;
        })}</Grid>;

      return <section style={{
        padding: 8,
        display: "flex",
        flexDirection: "column",
      }}>
        <header style={{
          marginBottom: 16,
          display: "flex",
          order: 1,
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
        <div style={{
          order: 2,
          marginBottom: 8,
        }}>
          <Typography style={{
            display: "inline",
          }}>Budget/Revenue: {movie.budgetFormatted} </Typography>
          <Typography style={{
            display: "inline",
            ...(movie.budgetRevenueDiff > 0 && {
              color: green[400],
            }),
            ...(movie.budgetRevenueDiff <= 0 && {
              color: red[400],
            }),
          }}>
            ({movie.budgetRevenueDiffFormattedWithSign})
          </Typography>
        </div>
        <img style={{
          maxWidth: "100%",
          marginBottom: 8,
          ...(smAndUp && {
            margin: "0 8px 0 0",
          }),
          order: 3,
          ...(smAndUp && {
            order: 4,
          }),
        }} src={movie.getPosterUrl(result.data.configuration.images.base_url, breakpoint)}/>
        <main style={{
          order: 4,
          ...(smAndUp && {
            order: 3,
          }),
        }}>
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
          {cast}
        </main>
      </section>;
    }}
  </GetMovieQuery>;
};
