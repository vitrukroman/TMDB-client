import { Theme } from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import { green, red } from "@material-ui/core/colors";
import unstable_useMediaQuery from "@material-ui/core/es/useMediaQuery/unstable_useMediaQuery";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { capitalize } from "@material-ui/core/utils/helpers";
import ExtensionIcon from "@material-ui/icons/Extension";
import FaceIcon from "@material-ui/icons/Face";
import StarIcon from "@material-ui/icons/StarRounded";
import { useTheme } from "@material-ui/styles";
import gql from "graphql-tag";
import React from "react";
import Query from "react-apollo/Query";
import { useTranslation } from "react-i18next";
import { GetLanguage } from "../../graphql/types/GetLanguage";
import { useBreakPoint } from "../../hooks/useBreakpoint";
import Movie from "../../models/movie";
import LanguagePicker from "../languagePicker";
import RatingBadge from "../ratingBadge";
import SimilarMovies from "../similarMovies";
import { movieQuery, MovieQuery } from "./movieQuery";

interface IComponentProps {
  id: string;
}

class GetLanguageQuery extends Query<GetLanguage> {}

export default (props: IComponentProps) => {
  const breakpoint = useBreakPoint();
  const theme = useTheme<Theme>();
  const smAndUp = unstable_useMediaQuery(theme.breakpoints.up("sm"));
  const [t] = useTranslation();
  const id = Number(props.id);

  return <GetLanguageQuery query={gql`
    query GetLanguage {
      language @client
    }
  `}>
    {(languageResult) => {
      if (languageResult.loading) {
        return <span>loading...</span>;
      }

      if (languageResult.error) {
        return <span>error...</span>;
      }

      return <MovieQuery
        query={movieQuery}
        variables={{
          id,
          language: languageResult.data!.language,
        }}
      >
        {(result) => {
          if (result.loading) {
            return <span>loading...</span>;
          }

          if (result.error) {
            return <span>error...</span>;
          }

          const movie = new Movie(result.data!.movie);

          const genreChips = movie.genres.map((genre) => {
            return <Chip icon={<StarIcon/>} label={genre.name} key={genre.id} variant="outlined" style={{
              margin: "0 2px 2px 0",
            }}/>;
          });

          const keywordChips = movie.keywords.map((keyword) => {
            return <Chip icon={<ExtensionIcon/>} label={keyword.name} key={keyword.id} style={{
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
            }}>{capitalize(t("cast"))}: </Typography>
            {movie.mainCast.map((actor) => {
              let color: "primary" | "secondary" = "primary";

              if (actor.isFemale) {
                color = "secondary";
              }

              return <Chip key={actor.name} label={actor.name} icon={<FaceIcon/>} color={color} variant="outlined"
                           style={{
                             margin: 2,
                           }}/>;
            })}</Grid>;

          return <section style={{
            padding: 8,
            gridGap: 8,
            display: "grid",
            gridTemplateColumns: "100%",
            gridTemplateAreas: `
          "header"
          "budgetInfo"
          "poster"
          "main"
        `,
            ...(smAndUp && {
              gridTemplateAreas: `
          "poster header"
          "poster budgetInfo"
          "poster main"
        `,
              gridTemplateRows: "56px 24px",
              gridTemplateColumns: "50% 50%",
            }),
          }}>

            <header style={{
              gridArea: "header",
              display: "flex",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",

              }}>
              <RatingBadge movie={movie}/>
              </div>
              <div style={{
                flex: "1 1 auto",
              }}>

                <Typography variant="h1" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                }}>
                  {movie.title}
                  <LanguagePicker/>
                </Typography>
                <Typography variant="subtitle1" style={{
                  fontStyle: "italic",
                }}>{movie.tagline}</Typography>
              </div>
            </header>
            {!!movie.budget && !!movie.revenue && <div style={{
              marginBottom: 8,
              gridArea: "budgetInfo",
            }}>
              <Typography style={{
                display: "inline",
              }}>{capitalize(t("budget"))}/{capitalize(t("revenue"))}: {movie.budgetFormatted} </Typography>
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
            </div>}
            <img style={{
              maxWidth: "100%",
              gridArea: "poster",
            }} src={movie.getPosterUrl(result.data!.configuration!.images.base_url, breakpoint)}/>
            <main style={{
              gridArea: "main",
            }}>
              <div>
                <Typography style={{
                  display: "inline",
                }}>{capitalize(t("genres"))}: </Typography>
                <div style={{
                  display: "inline",
                }}>{genreChips}</div>
              </div>
              <div>
                <Typography style={{
                  display: "inline",
                }}>{capitalize(t("tags"))}: </Typography>
                <div style={{
                  display: "inline",
                }}>{keywordChips}</div>
              </div>
              <div style={{
                marginBottom: 8,
              }}>
                <Typography style={{
                  display: "inline",
                }}>{capitalize(t("countries"))}: </Typography>
                <div style={{
                  display: "inline",
                }}>{productionCountries}</div>
              </div>
              <Typography style={{
                marginBottom: 8,
              }}>{movie.overview}</Typography>
              {cast}
              <SimilarMovies id={id} language={languageResult.data!.language}/>
            </main>
          </section>;
        }}

      </MovieQuery>;
    }}

  </GetLanguageQuery>;
};
