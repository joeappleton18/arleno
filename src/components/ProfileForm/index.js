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
import ProfilePicture from "../../components/ProfilePicture";

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
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: "40vw",
    },
    backgroundColor: "white",
    backgroundColor: "#D8D8D8",
  },
  paperWidthSm: {
    maxWidth: "3000px",
  },
}))(MuiDialog);

function ProfileForm(props) {
  const { open, onSubmit, firstUpdate } = props;
  let uploadWidget;
  const fbService = useFirebase();
  const userStore = useStores().user;
  const uiStore = useStores().uiStore;

  const handleClose = () => {
    if (!firstUpdate) {
      onSubmit();
    }
  };

  const updateUser = async (newUser) => {
    try {
      await fbService.user.update(newUser, userStore.user.uid);

      userStore.setUser({
        ...userStore.user,
        ...newUser,
      });

      await fbService.presenceService.setStatus("online", userStore.user.uid, {
        ...userStore.user,
        ...newUser,
      });
      await fbService.presenceService.setRtStatus(
        "online",
        userStore.user.uid,
        {
          ...userStore.user,
          ...newUser,
        }
      );
    } catch (e) {
      console.log("could not update photo", e);
    }
  };

  const handleSubmit = (data) => {
    const user = { ...data, ...{ joinStage: 2 } };
    updateUser(user);
    uiStore.deployAlert("I have updated your profile", "success");
    onSubmit();
  };

  useEffect(() => {
    uploadWidget = cloudinary.createUploadWidget(
      {
        cloudName: coloudinaryConfig.cloudName,
        uploadPreset: coloudinaryConfig.preset,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const newUser = {
            photoURL: result.info.public_id,
          };

          updateUser(newUser);
        }
      }
    );
  });

  const handleClick = () => {
    uploadWidget.open();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={firstUpdate ? false : handleClose}
        >
          <ProfilePicture />

          <SimpleGreyButton
            text={
              (userStore.user && userStore.user.photoURL ? "Edit" : "Add") +
              " Photo"
            }
            onClick={handleClick}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant={"body2"}
            gutterBottom
            style={{ textAlign: "center" }}
          >
            {firstUpdate
              ? "Let's get you started. I need to know a little more please."
              : 'Update and click "All Done"'}
          </Typography>
          <Divider />
          <Form onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfileForm;
