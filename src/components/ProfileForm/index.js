import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { SimpleGreyButton } from "../Buttons";
import Divider from "@material-ui/core/Divider";
import Form from "./Form";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(20),
    display: "flex",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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
    marginTop: "-10px",
    padding: theme.spacing(2),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
  },
}))(MuiDialogContent);

const Dialog = withStyles((theme) => ({
  root: {
    backdropFilter: "blur(8px)",
  },
  MuiTypography: {
    fontSize: "20px",
  },
  paper: {
    width: "100vw",
    height: "100vh",
    [theme.breakpoints.up("md")]: {
      width: "40vw",
      height: "70vh",
    },
    backgroundColor: "white",
    backgroundColor: "#D8D8D8",
  },
  paperWidthSm: {
    maxWidth: "3000px",
  },
}))(MuiDialog);

function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <img
            src="avatar-placeholder.png"
            style={{ display: "block", margin: "0 auto" }}
          />

          <SimpleGreyButton text={"Edit/Add Photo"} />
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant={"body2"} gutterBottom>
            Let's get you started. I need to know a little more please.
          </Typography>
          <Divider />
          <Form />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomizedDialogs;
