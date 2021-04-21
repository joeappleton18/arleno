import { useRef, useState } from 'react';
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import { createMuiTheme, MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { EditorState, convertFromHTML, convertToRaw } from 'draft-js'


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


const WriteEditor = (props) => {
  const { onSubmit, onCancel, data, submitButtonText, editorPlaceholderText } = props;


  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [disabled, setDisabled] = useState(true);

  const ref = useRef(TMUIRichTextEditorRef);

  const handleSubmitClick = () => {
    ref.current?.save()
  }

  const handleChange = (editorState) => {
    console.log(editorState.getCurrentContent().count());
    const length = editorState.getCurrentContent().getPlainText().length;
    setDisabled(!length);
    setEditorState(editorState.getCurrentContent());
  }

  const handleSave = (data) => {
    const html = "";
    onSubmit({ data, html });
  };

  const handleCancelClick = () => {
    onCancel();
  }

  return (
    <>
      <MuiThemeProvider theme={writeTheme}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MUIRichTextEditor onChange={handleChange} editorState={editorState} onSave={handleSave} defaultValue={data} ref={ref} label={editorPlaceholderText} controls={["title", "bold", "italic", "underline", "strikethrough", "link", "numberList", "bulletList", "quote", "code"]} />
          </Grid>
          <Grid item xs={12} >
            <Button disabled={disabled} onClick={handleSubmitClick} elevation={1} variant="contained" color="secondary">
              {submitButtonText}
            </Button>
            <Button onClick={handleCancelClick} variant="outlined" elevation={0} style={{ marginLeft: '10px' }} variant="contained" color="primary">
              Cancel
          </Button>
          </Grid>
        </Grid>

      </MuiThemeProvider>
    </>)
}


const RichEditor = (props) => {
  const { onSubmit, readOnly, data, onCancel, submitButtonText, editorPlaceholderText } = props;
  if (!readOnly) {
    return <WriteEditor
      onSubmit={onSubmit}
      data={data}
      onCancel={onCancel}
      submitButtonText={submitButtonText}
      editorPlaceholderText={editorPlaceholderText}
    />
  }
  if (readOnly) { return <ReadEditor data={data} /> }

}

RichEditor.defaultProps = {
  readOnly: false,
  data: null,
  submitButtonText: 'Submit Answer',
  editorPlaceholderText: 'Enter your answer here... 😊',
  cancelButtonText: 'Cancel'
}

export default RichEditor;
