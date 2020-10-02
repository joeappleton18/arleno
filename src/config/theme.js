import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  drawer: { width: 400 },
  typography: {
    fontSize: 20,
    h1: {
      fontSize: "2.5rem",
      lineHeight: 2,
    },
    h2: {
      fontSize: "2.0rem",
      lineHeight: 1.5,
    },

    h3: {
      fontSize: "1.5rem",
      lineHeight: 1.5,
    },
  },

  palette: {
    primary: {
      main: "#9ea7fc",
      dark: "#6c78c9",
      light: "#d1d8ff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },

    text: {
      secondary: "#fff",
    },
  },
});

export default theme;
