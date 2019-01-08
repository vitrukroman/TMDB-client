import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: "2rem",
    },
  },
});

export default theme;
