import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const themeObj = {
  overrides: {
    MuiTableCell: {
      root: {
        fontSize: "1rem",
      },
    },
    MuiAlert: {
      message: {
        "&div": { fontWeight: "20" },
        fontSize: "1rem",
      },
    },
    MuiFormLabel: {
      root: {
        color: "black",
        fontSize: 13,
        "&$focused": {
          color: "black",
          fontWeight: "bold",
        },
      },
    },
  },

  drawer: { width: 400 },
  typography: {
    fontSize: 20,
    h1: {
      fontSize: "2.0rem",
      lineHeight: 2,
    },
    h2: {
      fontSize: "1.4rem",
      lineHeight: 1.5,
    },

    h3: {
      fontSize: "1.4rem",
      lineHeight: 1.5,
    },

    h6: {
      fontSize: "1.4rem",
    },

    body1: {
      fontSize: "1.2rem",
    },
  },

  palette: {
    primary: {
      main: "#03A9F4",
      dark: "#01579B",
      light: "#B3E5FC",
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
};

// Create a theme instance.
const theme = createMuiTheme(themeObj);

export { themeObj };
export default theme;
