import MUIRichTextEditor from "mui-rte";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        backgroundColor: "#ebebeb",
      },

      editor: {
        backgroundColor: "#ebebeb",
        padding: "20px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
      },
      toolbar: {
        borderBottom: "1px solid gray",
        backgroundColor: "#ebebeb",
      },
      placeHolder: {
        backgroundColor: "#ebebeb",
        paddingLeft: 20,
        width: "inherit",
        position: "absolute",
        top: "60px",
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});

const RichEditor = () => (
  <>
    <MuiThemeProvider theme={defaultTheme}>
      <MUIRichTextEditor label="Start typing..." />
    </MuiThemeProvider>
  </>
);

export default RichEditor;
