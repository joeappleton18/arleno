import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from "clsx";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Document, Page, pdfjs } from 'react-pdf';
import { useFirebase } from '../../services/firebase/';
import { useStores } from '../../stores/';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextPopover from '../../components/TextPopOver';
import { TextRange } from '../../utils/text-range';
import AskQuestionDialog from '../../components/AskQuestionDialog';
import { matchQuote } from '../../utils/match-quote';
import AnswerQuestionDialog from "../../components/AnswerQuestionDialog";
import Button from '@material-ui/core/Button';
import NotesIcon from '@material-ui/icons/Notes';
import ReadingDrawer from "../../components/ReadingDrawer";
import {
    setFocusedHighlight,
    highlightRange,
    removeHighlights

} from '../../utils/highlighter';

const useStyles = makeStyles((theme) => ({
    pdfRoot: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '80vw',
        [theme.breakpoints.up('lg')]: {
            width: '100vw',
        },
        fontSize: '40px !important'
    },


    contentShiftLeft: {

        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),

        paddingRight: theme.drawer.width + 50,
    },

    readingDrawer: {
        marginTop: '64px'
    },

    popOver: {
        background: 'rgb(41, 41, 41)',
        borderRadius: '3px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
    },

    highlightSVG: {

        width: '25px',
        height: '25px',
        color: 'white'

    },

    margin: {
        margin: theme.spacing(0),
    },

    page: {

        marginTop: '0.5rem',
        maxWidth: 'calc(~"100% - 2em")',
        boxShadow: '0 0 8px rgba(0, 0, 0, .5);'
    },

    sideTab: {
        top: '10',
        right: '0',
        zIndex: '1000',
        display: 'flex',
        position: 'fixed',
        borderTopLefRadius: '18px',


    },

    loader: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },

    error: {
        display: 'flex',
        height: '100vh',
        width: '60vw',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',

        '& h4': {
            color: theme.palette.error.main,
            fontSize: '2rem'
        }

    }

}));


const Readings = () => {

    const router = useRouter();
    const { rid } = router.query;
    const { user, uiStore } = useStores();
    const [file, setFile] = useState('');
    const [answerTextHighlight, setAnswerTextHighlight] = useState("");
    const [questionID, setQuestionID] = useState("");
    const [question, setQuestion] = useState("");
    const [annotations, setAnnotations] = useState();
    const [openAnswerBox, setOpenAnswerBox] = useState(false);
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const [focusedAnnotation, setFocusedAnnotation] = useState({});
    const [focusedRange, setFocusedRange] = useState({});
    const [anchorPosition, setAnchorPosition] = useState(null)
    const [numPages, setNumPages] = useState(0);
    const classes = useStyles();
    const fb = useFirebase();



    function deSerialise(annotation) {
        const root = document.querySelector('.react-pdf__Document');
        const text = root.textContent;
        const match = matchQuote(text, annotation.exact, {
            ...{ prefix: annotation.prefix, suffix: annotation.suffix },
            hint: 0
        })
        const range = TextRange.fromOffsets(root, match.start, match.end).toRange();
        highlightRange(range, annotation.id);
    }



    async function handleAnnotationClick(e) {

        console.log('fired');

        e.preventDefault();
        e.stopPropagation();
        const id = e.target.getAttribute('annotationid');
        const annotationRef = await fb.document.readAnnotations(rid, id);
        const { exact, question_id } = annotationRef.data();
        const questionRef = await fb.question.read(question_id);
        const question = questionRef.data();

        setQuestionID(question_id);
        setAnswerTextHighlight(exact);
        setQuestion(question.question);
        setOpenAnswerBox(true);

    }

    async function getAnnotations() {

        const annotations = [];
        const annotationsRef = await fb.document.readAnnotations(rid);
        annotationsRef.forEach(annotationRef => annotations.push({ ...annotationRef.data(), id: annotationRef.id }));
        annotations.forEach(annotation => deSerialise(annotation));
        setAnnotations(annotations);

        document.querySelectorAll('hypothesis-highlight').forEach(e => {
            e.addEventListener('click', handleAnnotationClick);
        })

    }


    const setDocument = async (id) => {

        try {
            const documentRef = await fb.document.read(id);
            if (!documentRef.exists && user.user.uid) {

                const document = {
                    user_id: user.user.uid
                }
                fb.document.create(document, rid)
            }
        } catch (e) {
            console.log('could not set document', e)
        }
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        uiStore.setReadingMode(true);
        return () => {
            uiStore.setReadingMode(false);
        }
    }, [])



    const setFileDisplay = async (rid) => {
        const storagePath = await fb.storage.refFromURL(`gs://computing-notes/files/${rid}.pdf`);
        const url = await storagePath.getDownloadURL();
        debugger;
        setFile(url);
    }

    useEffect(() => {
        if (rid && !file) {
            setFileDisplay(rid);
        }
        if (user.user && rid) {
            setDocument(rid);
        }
    }, [rid, user]);

    const Loader = () => (<div className={classes.loader}><CircularProgress /></div>);
    const Error = () => (<div className={classes.error}><h4> Could not load the pdf, check you have the correct path</h4></div>);

    const handleLoadError = (e) => {
        console.error(`could not load the pdf: ${e}`)
    }

    const handleLoadSuccess = ({ numPages: nextNumPages }) => {
        setNumPages(nextNumPages);
        setTimeout(getAnnotations, 3000);
    }

    async function handleQuestion() {
        setOpenQuestionDialog(true);
    }



    const handleMouseUp = (event) => {


        if (window.getSelection().toString() == "" || user.user.type != "A") {
            return;
        }

        const range = window.getSelection().getRangeAt(0);
        const root = document.querySelector('.react-pdf__Document');
        const text = root.textContent;
        const textRange = TextRange.fromRange(range).relativeTo(root);
        const start = textRange.start.offset;
        const end = textRange.end.offset;
        const contextLen = 32;

        const tmpRange = highlightRange(range, "tmp");
        const annotation = {
            exact: text.slice(start, end),
            prefix: text.slice(Math.max(0, start - contextLen), start),
            suffix: text.slice(end, Math.min(text.length, end + contextLen)),
            type: 'question',
            uid: user.user.uid

        }

        const x = event.clientX;     // Get the horizontal coordinate
        const y = event.clientY;     // Get the vertical coordinate
        setAnchorPosition({ top: y - 40, left: x });
        setFocusedAnnotation(annotation);
        setFocusedRange(tmpRange);
        setOpenPopover(true);
    }

    const handlePopOverClose = () => {
        setOpenPopover(false);
        setFocusedAnnotation({});
        setAnchorPosition({});
        removeHighlights(focusedRange);
    }

    const handleQuestionSave = async (question) => {

        const qx = {
            userName: user.user.firstName + user.user.lastName,
            question: question,
            photoURL: user.user.photoURL,
            answers: 0,

        }
        try {

            const range = window.getSelection().getRangeAt(0);
            const questionResult = await fb.question.create(qx);
            await fb.document.createAnnotation({ ...focusedAnnotation, type: 'question', question: qx, question_id: questionResult.id }, rid);
            setOpenQuestionDialog(false);
            handlePopOverClose();
            getAnnotations();

        } catch (e) {
            console.log('error could not create question', e)
        }
    }

    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };

    const handleSideBarHighlightClick = (id) => {
        const nodes = document.querySelectorAll(`[annotationid="${id}"]`);
        setFocusedHighlight(nodes);

    }

    const handleSideBarHighlightHover = (id) => {
        const nodes = document.querySelectorAll(`[annotationid="${id}"]`);
        setFocusedHighlight(nodes, false);

    }



    return (

        <div className={clsx({ [classes.pdfRoot]: true, [classes.contentShiftLeft]: uiStore.readingDrawOpen })} >


            <div className={classes.sideTab}>
                <p style={{
                    'writing-mode': 'vertical-l',
                    'text-orientation': 'upright-right'
                }}>
                    <Fab color="primary" aria-label="add">
                        <NotesIcon onClick={() => { uiStore.setReadingDrawOpen(true) }} />
                    </Fab>
                </p>
            </div>
            <ReadingDrawer
                annotations={annotations}
                onAnnotationClick={handleSideBarHighlightClick}
                onAnnotationHover={handleSideBarHighlightHover}
            />
            <AnswerQuestionDialog id={questionID} manualOpen={openAnswerBox} onClose={() => setOpenAnswerBox(false)} question={question}>

                {openAnswerBox && answerTextHighlight}

            </AnswerQuestionDialog>

            <AskQuestionDialog
                open={openQuestionDialog}
                highlight={focusedAnnotation.exact}
                onSave={handleQuestionSave}
                onClose={() => { setOpenQuestionDialog(false) }}
            />
            <TextPopover
                open={openPopover}
                onClose={handlePopOverClose}
                onQuestion={handleQuestion}
                anchorPosition={anchorPosition}
                id="question-pop-over"
            />

            {
                file && <Document
                    id="document"
                    onMouseUp={handleMouseUp}
                    loading={<Loader />}
                    file={file}
                    onLoadError={handleLoadError}
                    onSourceError={handleLoadError}
                    onLoadSuccess={handleLoadSuccess}
                    options={options}
                    error={<Error />}
                >
                    {
                        Array.from(
                            new Array(numPages),
                            (el, index) => {
                                return (
                                    <Page
                                        loading={<Loader />}
                                        scale={2.0}
                                        className={classes.page}
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                    />
                                )
                            },
                        )
                    }
                </Document>
            }
        </div >
    );
}


export default Readings;