import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: "1.75rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
  },
});

export default theme;
