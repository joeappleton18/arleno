import { useRef, useState, useEffect } from 'react';
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import { createMuiTheme, MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { EditorState, convertToRaw } from 'draft-js'
import { convertToHTML, convertFromHTML } from 'draft-convert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const writeTheme = {
  ...defaultTheme, ...{
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
  }
}

const readTheme = {
  ...defaultTheme, ...{
    overrides: {
      MUIRichTextEditor: {
        root: {
          marginTop: "24px",
          marginLeft: "-20px",
          backgroundColor: "grey",
          borderTop: 0,
          borderBottom: '-10px'
        },

        editor: {
          marginTop: '-24px',
          backgroundColor: "#D8D8D8;",
          padding: "20px",
          /* maxHeight: "500px",*/
          overflow: "auto",
        },
      },
    },
  }
}


const ReadEditor = ({ data }) => {

  return (
    <>
      <MuiThemeProvider theme={readTheme}>

        <MUIRichTextEditor
          defaultValue={data}
          controls={[]}
          readOnly={true}
        />

      </MuiThemeProvider>
    </>)
}


const WriteEditor = ({ onSubmit }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const ref = useRef(TMUIRichTextEditorRef);

  const handleClick = () => {
    ref.current?.save()
  }

  const handleChange = (editorState) => {
    setEditorState(editorState);
  }

  const handleSave = (data) => {
    const html = "";
    //const html = convertToHTML(editorState.getCurrentContent());
    onSubmit({ data, html });
  };


  return (
    <>
      <MuiThemeProvider theme={writeTheme}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MUIRichTextEditor onChange={handleChange} editorState={editorState} onSave={handleSave} ref={ref} label="Enter your answer here... 😊" controls={["title", "bold", "italic", "underline", "strikethrough", "link", "numberList", "bulletList", "quote", "code"]} />
          </Grid>
          <Grid item xs={12} >
            <Button onClick={handleClick} variant="contained" color="secondary">
              Submit Answer
          </Button>
          </Grid>
        </Grid>

      </MuiThemeProvider>
    </>)
}


const RichEditor = ({ onSubmit, readOnly, data }) => {

  if (!readOnly) { return <WriteEditor onSubmit={onSubmit} /> }
  if (readOnly) { return <ReadEditor data={data} /> }

}

RichEditor.defaultProps = {
  readOnly: false,
  data: {}
}

export default RichEditor;
