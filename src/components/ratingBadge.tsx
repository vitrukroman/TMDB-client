import Badge from "@material-ui/core/Badge/Badge";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Movie from "../models/movie";

interface IComponentProps {
  movie: Movie;
}

const useStyles = makeStyles({
  badge: {
    padding: "0 4px",
    width: "auto",
  },
});

const RatingBadge = (props: IComponentProps) => {
  const classes = useStyles();

  return <div style={{
    backgroundColor: green[props.movie.ratingColorHue],
    borderRadius: "1.25rem",
    width: "2.5rem",
    textAlign: "center",
    marginRight: 16,
  }}>
    <Badge badgeContent={props.movie.vote_count} color="secondary" classes={{
      badge: classes.badge,
    }}>
      <Typography variant="h2" style={{
        lineHeight: "2.5rem",
        ...(props.movie.vote_average >= 6 && {
          color: "white",
        }),
      }}>{props.movie.vote_average}</Typography>
    </Badge>
  </div>;
};

export default RatingBadge;
