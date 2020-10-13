import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ProfilePicture from "../ProfilePicture";
import FollowIcon from "@material-ui/icons/RssFeed";
import AnswerIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  text: { background: theme.palette.primary.main, cursor: "pointer" },
  question: { marginTop: theme.spacing(2) },
  button: { background: theme.palette.primary.light, color: "white" },
  buttonRoot: {
    display: "flex",
    "& p": {
      color: theme.palette.primary.dark,
      marginLeft: "2%",
      marginRight: "2%",
      marginTop: "5%",
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: "white",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    background: `linear-gradient(45deg, #03A9F4 30%, #B3E5FC 90%)`,
  },
  quote: {
    fontStyle: "italic",
    color: "grey !important",
    "& *": {
      fontSize: "20px",
      fontWeight: "bolder",
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, title, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{title}</Typography>
      <Typography gutterBottom variant="h6" className={classes.quote}>
        {" "}
        {children}{" "}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Dialog = withStyles((theme) => ({
  root: {
    backdropFilter: "blur(8px)",
  },

  paper: {
    width: "70vw",
    height: "80vh",
    backgroundColor: "#D8D8D8",
  },
  paperWidthSm: {
    maxWidth: "3000px",
  },
}))(MuiDialog);

function CustomizedDialogs(props) {
  const classes = useStyles();
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.text} onClick={handleClickOpen}>
        {children}
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          title=""
          onClose={handleClose}
        >
          <Grid container>
            <Grid item xs={11}>
              {children}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <ProfilePicture
            name={{ first: "Joe", last: "Appleton" }}
            size={50}
            center={false}
          />
          <Typography variant="h6" className={classes.question} gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros?
          </Typography>

          <Grid container spacing={2} >
            <Grid item xs={12} sm={4} className={classes.buttonRoot}>
              <IconButton aria-label="close" className={classes.button}>
                <AnswerIcon />
              </IconButton>
              <Typography> Answer </Typography>
              <IconButton aria-label="close" className={classes.button}>
                <FollowIcon />
              </IconButton>
              <Typography> Follow </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomizedDialogs;
