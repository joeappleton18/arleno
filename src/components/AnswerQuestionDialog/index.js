import { useRef, useEffect } from 'react';
import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import { useStores } from "../../stores/";
import { useFirebase } from "../../services/firebase";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import AvatarGroup from "../AvatarGroup/";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Editor from "../RichEditor/";

const useStyles = makeStyles((theme) => ({
  text: { background: theme.palette.primary.main, cursor: "pointer" },
  question: { marginTop: theme.spacing(2) },
  button: { background: theme.palette.primary.light, color: "white" },
  photoSection: {
    display: "flex",
  },
  buttonRoot: {
    display: "flex",
    "& p": {
      color: theme.palette.primary.main,
      marginLeft: "2%",
      marginRight: "2%",
      marginTop: "5%",
    },
  },
  answerArea: {
    marginTop: theme.spacing(2),
  },
  likeArea: {},

  likeIcon: {
    color: theme.palette.primary.main,
    cursor: "pointer",
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

const Answer = (props) => {
  const { photo, children } = props;
  const classes = useStyles();
  const userStore = useStores().user;
  const tmpUserArray = [
    {
      photoURL: "wsh3t9dsa1wo5ummmm7h",
      lastName: "Appleton",
      firstName: "Joe",
    },
    {
      photoURL: "wsh3t9dsa1wo5ummmm7h",
      lastName: "Appleton",
      firstName: "Joe",
    },
    {
      photoURL: "wsh3t9dsa1wo5ummmm7h",
      lastName: "Appleton",
      firstName: "Joe",
    },
    {
      photoURL: "wsh3t9dsa1wo5ummmm7h",
      lastName: "Appleton",
      firstName: "Joe",
    },
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {photo}
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12} className={classes.photoSection}>
        <ThumbUpAltOutlinedIcon className={classes.likeIcon} />
        <AvatarGroup
          style={{ marginLeft: "0.2%", marginTop: "0.2%" }}
          photos={tmpUserArray}
          onlineBadge={false}
          size={30}
        />

        <Divider style={{ marginTop: "2%" }} />
      </Grid>

    </Grid>
  );
};

const AnswerQuestionDialog = (props) => {

  const { children, id, question } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [photoURL, setPhotoURL] = useState("");
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [userName, setUserName] = useState();
  const [answers, setAnswers] = useState([]);
  const [date, setDate] = useState(Date.now());
  const buttonRef = useRef(null);
  const fb = useFirebase();
  const userStore = useStores().user;


  useEffect(() => {

    if (!userStore.user) {
      return;
    }


    const setQuestion = async (fb, id, user, question) => {

      const questionRef = await fb.question.read(id);

      if (!questionRef.exists) {
        const qx = {
          userName: user.firstName + user.lastName,
          question: question,
          photoURL: user.photoURL,
          answers: 0
        }

        try {
          await fb.question.create(qx, id);
          setPhotoURL(qx.photoURL);
          setUserName(qx.userName);
        } catch (e) {
          console.log('error could not create question', e)
        }

      } else { // in this instance the question exists 
        const qx = await questionRef.data();
        setPhotoURL(qx.photoURL);
        setUserName(qx.userName);
        setDate(qx.created.toDate());
        const answersRef = await fb.question.readAnswers(id);

        if (answersRef.size) {
          answersRef.forEach(a => setAnswers([...answers, ...[a.data()]]))
        }

      }
    }
    setQuestion(fb, id, userStore.user, question, children);
  }, [id, fb, userStore.user, question, children])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (answer) => {
    try {
      fb.question.createAnswer({ ...answer, ...userStore.user }, id, userStore.user.uid);
    } catch (e) {
      console.log('error could not answer question', e);

    }
  }

  const handleClickAnswer = () => {
    if (!showAnswerBox) {
      buttonRef.current.scrollIntoView();
    }
    setShowAnswerBox(!showAnswerBox);


  }

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
            name={userName}
            size={50}
            photoURL={photoURL}
            center={false}
            date={date}
          />
          <Typography variant="h6" className={classes.question} gutterBottom>
            {question}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} className={classes.buttonRoot}>
              <IconButton aria-label="close" className={classes.button}>
                <AnswerIcon onClick={handleClickAnswer} />
              </IconButton>
              <Typography> Answer </Typography>
              <IconButton aria-label="close" className={classes.button}>
                <FollowIcon />
              </IconButton>
              <Typography> Follow </Typography>
            </Grid>
            {showAnswerBox && <Grid item xs={12}>
              <Editor onSubmit={handleSubmit} />
            </Grid>}
          </Grid>
          <Grid container spacing={2} ref={buttonRef}>
            <Grid item xs={12} className={classes.answerArea}>
              <Divider style={{ marginBottom: "2%" }} />

              {answers.map(answer => <>
                <Answer
                  photo={
                    <ProfilePicture
                      name={{ first: "Joe", last: "Appleton" }}
                      size={50}
                      center={false}
                    />
                  }
                >
                  <Editor readOnly={true} data={answer.data} />
                </Answer>
                <Divider style={{ marginTop: "2%", marginBottom: "1%" }} />

              </>)}

            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AnswerQuestionDialog;
