import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AnswerIcon from "@material-ui/icons/Create";
import { useEffect, useRef, useState } from "react";
import { useFirebase } from "../../services/firebase";
import { useStores } from "../../stores/";
import FilterMenu from "../Filter";
import Editor from "../RichEditor/";
import AnswerBlock from "./Answer";
import RenderDialog from "./Dialog";


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
    "& li": {
      textDecoration: "underline",
      listStyle: "none",
      marginLeft: "2%",
    },
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



const AnswerQuestionDialog = (props) => {
  const { children, id, question, manualOpen, onClose } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [answers, setAnswers] = useState([]);
  const buttonRef = useRef(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const fb = useFirebase();
  const userStore = useStores().user;
  const uiStore = useStores().uiStore;



  const FILTER_LIST = [
    { label: "Most Upvotes", value: "upvotes_count", order: "desc" },
    { label: "Least Upvotes", value: "upvotes_count", order: "asc" },
    { label: "Newest", value: "created", order: "desc" },
    { label: "Oldest", value: "created", order: "asc" },
  ];

  const [filter, setFilter] = useState(FILTER_LIST[0]);
  /**
   * currently we are set up such that each user can only answer a question once
   */
  useEffect(() => {
    setCurrentAnswer(null);
    const answer = answers.find((a) => userStore.user.uid === a.id);
    if (!answer) {
      return;
    }
    setCurrentAnswer(answer.data);
  }, [answers]);


  var subscription = null;

  const getAnswers = async (id) => {
    if (subscription) subscription();
    subscription = fb.question.realtimeRead(id, (answersRef) => {
      setAnswers([]);
      const tmpArray = [];
      answersRef.forEach((a) =>
        tmpArray.push({ ...a.data(), ...{ id: a.id } })
      );
      debugger;
      setAnswers(tmpArray);
    }, filter.value, filter.order);
  }

  useEffect(() => {
    if (!userStore.user) {
      return;
    }
    const setQuestion = async (fb, id, user, question) => {
      // we place this line in to check that the question service exists
      if (!fb.question) return;

      const questionRef = await fb.question.read(id);
      if (!questionRef.exists) {
        const qx = {
          userName: user.firstName + user.lastName,
          question: question,
          photoURL: user.photoURL,
          answers: 0,
        };

        try {
          await fb.question.create(qx, id);
        } catch (e) {
          console.log("error could not create question", e);
        }
      } else {
        // in this instance the question exists
        const qx = await questionRef.data();
        getAnswers(id);
      }
    };
    setQuestion(fb, id, userStore.user, question, children);
  }, [id, fb, userStore.user, question, children]);

  // when the filter changes we need to update the answers

  useEffect(() => {
    getAnswers(id);
  }, [filter]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };


  const handleSubmit = async (answer, isUpdate = false) => {
    try {
      await fb.question.createAnswer(
        { ...answer, ...userStore.user, ...{ upvotes_count: 0 } },
        id,
        userStore.user.uid
      );
      const message = isUpdate
        ? "😎 You've updated your answer 😎"
        : "😎 You've answered the question 😎";
      uiStore.deployAlert(message, "success");
      setShowAnswerBox(false);
    } catch (e) {
      uiStore.deployAlert("Oh no, there was an issue tell Joe", "success");
      console.log("error could not answer question", e);
    }
  };

  const handleClickAnswer = () => {
    if (!showAnswerBox) {
      buttonRef.current.scrollIntoView();
    }
    setShowAnswerBox(!showAnswerBox);
  };
  const handleCancel = () => {
    setShowAnswerBox(false);
  };



  {/*** children in this case is the area of text that is highlighted.*/ }
  return (
    <div>
      {!manualOpen && (
        <div className={classes.text} onClick={handleOpen}>
          {children}
        </div>
      )}
      <RenderDialog open={open} onClose={handleClose} title={children}>
        <>
          {!userStore.user.uid && (
            <Typography align="center" style={{ marginTop: "10%" }} variant="h2">
              Sorry, but to maintain the privacy of you and your peers you will
              need to join in order to view this content.
            </Typography>
          )}
          {userStore.user.uid && (
            <>
              <Grid container spacing={2}>
                <Typography variant="h6" className={classes.question} gutterBottom>
                  {question} = {JSON.stringify(filter)}
                </Typography>
              </Grid>
              <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={12} sm={4} className={classes.buttonRoot}>
                  <IconButton aria-label="close" className={classes.button}>
                    <AnswerIcon onClick={handleClickAnswer} />
                  </IconButton>
                  <Typography
                    style={{ cursor: "pointer" }}
                    onClick={handleClickAnswer}
                  >
                    {currentAnswer ? "Edit Answer" : "Answer"}
                  </Typography>

                </Grid>
                <Grid item xs={1}>
                  <FilterMenu items={FILTER_LIST} onFilterChange={(v) => setFilter(v)} />
                </Grid>
                {showAnswerBox && (
                  <Grid item xs={12}>
                    <Editor
                      onSubmit={handleSubmit}
                      data={currentAnswer}
                      onCancel={handleCancel}
                    />
                  </Grid>
                )}

              </Grid>
              <Grid container spacing={2} ref={buttonRef}>
                <Grid item xs={12} className={classes.answerArea}>
                  <Divider style={{ marginBottom: "2%" }} />
                  {answers.map((answer) => (
                    <AnswerBlock key={answer.id} answer={answer} id={id} onAnswerUpdate={handleSubmit} />
                  ))}
                </Grid>

              </Grid>
            </>
          )}
        </>
      </RenderDialog>
    </div>
  );
};

AnswerQuestionDialog.defaultProps = {
  onClose: () => { },
};

export default AnswerQuestionDialog;


