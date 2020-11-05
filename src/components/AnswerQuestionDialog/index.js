import { useRef, useEffect } from 'react';
import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
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
import IconButton from '@material-ui/core/IconButton';
import Answer from "./Answer";
const useStyles = makeStyles((theme) => ({
  text: { background: theme.palette.primary.main, cursor: "pointer" },
  question: { marginTop: theme.spacing(2) },
  button: { background: theme.palette.primary.light, color: "white" },
  photoSection: {
    display: "flex",
  },
  caption: {
    fontSize: "1rem",
    color: "grey",
    display: "flex",
    '& li': {
      textDecoration: "underline",
      listStyle: "none",
      marginLeft: "2%"
    }
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





const AnswerQuestionDialog = (props) => {

  const { children, id, question } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [userName, setUserName] = useState();
  const [answers, setAnswers] = useState([]);
  const [date, setDate] = useState(Date.now());
  const buttonRef = useRef(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const fb = useFirebase();
  const userStore = useStores().user;
  const uiStore = useStores().uiStore;


  useEffect(() => {
    setCurrentAnswer(null);
    const answer = answers.find(a => userStore.user.uid === a.id);
    if (!answer) {
      return;
    }
    setCurrentAnswer(answer.data);
  }, [answers])

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
          answers: 0,
          upvotes: 0
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
        fb.question.realtimeRead(id, (answersRef) => {
          setAnswers([]);
          const tmpArray = []
          answersRef.forEach(a => tmpArray.push({ ...a.data(), ...{ id: a.id } }));
          setAnswers(tmpArray);
        })

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

  const handleSubmit = async (answer, isUpdate = false) => {
    try {
      await fb.question.createAnswer({ ...answer, ...userStore.user }, id, userStore.user.uid);
      const message = isUpdate ? "😎 You've updated your answer 😎" : "😎 You've answered the question 😎";
      uiStore.deployAlert(message, "success");
      setShowAnswerBox(false);
    } catch (e) {
      debugger;
      uiStore.deployAlert("Ohhh there was an issue tell Joe", "success");
      console.log('error could not answer question', e);

    }
  }


  const handleClickAnswer = () => {
    if (!showAnswerBox) {
      buttonRef.current.scrollIntoView();
    }
    setShowAnswerBox(!showAnswerBox);

  }
  const handleCancel = () => {
    setShowAnswerBox(false);
  }
  const AnswerBlock = ({ answer }) => {
    const [editable, setEditable] = useState(false);

    const handleCancel = () => {
      setEditable(false)
    }

    const handleDelete = async () => {
      try {
        await fb.question.deleteAnswer(id, answer.id);
        uiStore.deployAlert("💩 You've deleted your answer 💩", "success");
      } catch (e) {
        uiStore.deployAlert("Oh, there was an issue deleting your answer, tell Joe", "error");
        console.log('error, could not delete answer', e);
      }
    }

    const handleUnvote = async (e) => {
      e.preventDefault();
      let newUpvotes = (answer.upvotes.filter(x => x.uid !== userStore.user.uid));
      try {
        await fb.question.updateAnswer({ upvotes: newUpvotes }, id, answer.id);
      } catch (e) {
        uiStore.deployAlert("Oh, there was an issue with un voting, tell Joe", "error");
        console.log('error, could not delete answer', e);
      }
    }
    const handleUpvote = async () => {
      try {
        //updateAnswer(answer, questionId, id)
        let userVoted = (answer.upvotes.filter(x => x.uid === userStore.user.uid)).length > 0;
        if (!userVoted) {
          await fb.question.updateAnswer({
            upvotes: [
              ...answer.upvotes,
              ...[{
                uid: userStore.user.uid,
                photoURL: userStore.user.photoURL,
                firstName: userStore.user.firstName,
                lastName: userStore.user.lastName
              }]]
          }, id, answer.id);
        }

      } catch (e) {
        uiStore.deployAlert("Oh, there was an issue with up voting, tell Joe", "error");
        console.log('error, could not delete answer', e);
      }
    }


    return (<>
      <Answer
        answer={answer}
        onUpvote={handleUpvote}
        onUnvote={handleUnvote}
        showEdit={userStore.user.uid === answer.id}
        onUpdate={(type) => type === "edit" ? setEditable(true) : handleDelete(answer.id)}
        photo={
          <ProfilePicture
            name={{ first: answer.firstName, last: answer.lastName }}
            photoURL={answer.photoURL}
            date={answer.created && answer.created.toDate()}
            size={50}
            center={false}
          />
        }


      >
        <Editor readOnly={!editable} onSubmit={(answer) => handleSubmit(answer, true)} onCancel={handleCancel} data={answer.data} />
      </Answer>
      <Divider style={{ marginTop: "2%", marginBottom: "1%" }} />

    </>)
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

        {!userStore.user.uid && <Typography align="center" style={{ marginTop: "10%" }} variant="h2"> Sorry, but to maintain the privacy of you and your peers you will need to join in order to view this content. </Typography>}

        {userStore.user.uid && (<DialogContent dividers>

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
              <Typography style={{ cursor: "pointer" }} onClick={handleClickAnswer}> {currentAnswer ? "Edit Answer" : "Answer"} </Typography>
              {/*<IconButton aria-label="close" className={classes.button}>
                <FollowIcon />
              </IconButton>
              <Typography> Follow </Typography> */}
            </Grid>
            {showAnswerBox && <Grid item xs={12}>
              <Editor onSubmit={handleSubmit} data={currentAnswer} onCancel={handleCancel} />
            </Grid>}
          </Grid>
          <Grid container spacing={2} ref={buttonRef}>
            <Grid item xs={12} className={classes.answerArea}>
              <Divider style={{ marginBottom: "2%" }} />

              {answers.map(answer => <AnswerBlock key={answer.id} answer={answer} />)}

            </Grid>
          </Grid>
        </DialogContent>)}
      </Dialog>
    </div >
  );
}

export default AnswerQuestionDialog;
