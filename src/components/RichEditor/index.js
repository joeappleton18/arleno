import MUIRichTextEditor from "mui-rte";
import { createMuiTheme, MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
      replySection: {

      },
    },
  },
});

const RichEditor = () =>  {
 return (
  <>
    <MuiThemeProvider theme={defaultTheme}>
      <Grid container spacing={1}>
         <Grid item xs={12}>
          <MUIRichTextEditor label="Start typing..." />
        </Grid>
        <Grid item xs={12} >
          <Button variant="contained" color="secondary">
            Submit Answer
          </Button>
        </Grid>
      </Grid>
    
    </MuiThemeProvider>
  </>
)};

export default RichEditor;
