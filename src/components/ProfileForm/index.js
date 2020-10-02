import { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import coloudinaryConfig from "../../config/cloudinary";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { SimpleGreyButton } from "../Buttons";
import Divider from "@material-ui/core/Divider";
import Form from "./Form";
import { useStores } from "../../stores";
import { useFirebase } from "../../services/firebase";
import { Image, Transformation } from "cloudinary-react";
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
    height: "800px",
    [theme.breakpoints.up("md")]: {
      width: "40vw",
      height: "500px",
    },
    backgroundColor: "white",
    backgroundColor: "#D8D8D8",
  },
  paperWidthSm: {
    maxWidth: "3000px",
  },
}))(MuiDialog);

function ProfileForm({ open }) {
  let uploadWidget;
  const fbService = useFirebase();
  const userStore = useStores().user;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    uploadWidget = cloudinary.createUploadWidget(
      {
        cloudName: coloudinaryConfig.cloudName,
        uploadPreset: coloudinaryConfig.preset,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          try {
            await fbService.user.update(
              {
                photoURL: result.info.public_id,
              },
              userStore.user.uid
            );

            userStore.setUser({
              ...userStore.user,
              ...{ photoURL: result.info.public_id },
            });
          } catch (e) {
            console.log("could not update photo");
          }
        }
      }
    );
  });

  const handleClick = () => {
    uploadWidget.open();
  };

  const transform = (
    <Transformation
      width="80"
      height="80"
      gravity="face"
      crop="thumb"
      radius="max"
    />
  );

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {userStore.user && !userStore.user.photoURL && (
            <img
              src="avatar-placeholder.png"
              style={{ display: "block", margin: "0 auto" }}
            />
          )}

          {userStore.user && userStore.user.photoURL && (
            <Image
              style={{ display: "block", margin: "0 auto" }}
              publicId={userStore.user.photoURL}
            >
              {transform}
            </Image>
          )}

          <SimpleGreyButton text={"Edit/Add Photo"} onClick={handleClick} />
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

export default ProfileForm;
