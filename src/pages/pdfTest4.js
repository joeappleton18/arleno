import React, { useState, useEffect } from 'react';
import { htmlToText } from 'html-to-text';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-serializer';
import 'rangy/lib/rangy-textrange';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import AskQuestionDialog from '../components/AskQuestionDialog';
import { matchQuote } from '../utils/match-quote';
import {
    getBoundingClientRect,
    getHighlightsContainingNode,
    highlightRange,
    removeHighlights,
    removeAllHighlights,
    setHighlightsFocused,
    setHighlightsVisible,
} from '../utils/highlighter';

import { Document, Page, pdfjs } from 'react-pdf';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import highlightSVG from '../assets/customIcons/highlight.svg';
import IconButton from '@material-ui/core/IconButton';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useFirebase } from '../services/firebase/';
import { useStores } from "../stores/";
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextRange, TextPosition } from '../utils/text-range';

const useStyles = makeStyles((theme) => ({
    pdfRoot: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        fontSize: '40px !important'
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
    }
}));


const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

export default function Sample() {
    const [file, setFile] = useState('sample2.pdf');
    const [highlighter, setHighlighter] = useState();
    const [numPages, setNumPages] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState(null);
    const [focusedAnnotation, setFocusedAnnotation] = useState({});
    const classes = useStyles();

    const fb = useFirebase();
    const user = useStores().user;


    const Loader = () => {

        return (<div className={classes.loader}><CircularProgress /></div>)
    }


    const documentID = '8di5dfQGLorWwdpOc3DV';



    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        rangy.init();

    }, [])


    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
        // getAnnotations();
    }

    function onLoadError(error) {
        console.error(error);
    }

    function onSourceError(error) {
        console.log(error);

    }

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

    async function getAnnotations() {

        const annotations = [];
        const annotationsRef = await fb.document.readAnnotations(documentID);
        annotationsRef.forEach(annotationRef => annotations.push({ ...annotationRef.data(), id: annotationRef.id }));
        annotations.forEach(annotation => deSerialise(annotation));

    }

    async function handleQuestion() {
        setOpenQuestionDialog(true);
    }

    async function handleQuestionSave(question) {

        const qx = {
            userName: user.user.firstName + user.user.lastName,
            question: question,
            photoURL: user.user.photoURL,
            answers: 0,

        }

        debugger;
        try {
            const questionResult = await fb.question.create(qx);
            const result = await fb.document.createAnnotation({ ...focusedAnnotation, type: 'question', question_id: questionResult.id }, documentID);
            highlightRange(range, result.id);
            setOpenQuestionDialog(false);

        } catch (e) {
            console.log('error could not create question', e)
        }
    }


    async function handleHighlight() {

        const range = window.getSelection().getRangeAt(0);
        const result = await fb.document.createAnnotation(focusedAnnotation, documentID);
        highlightRange(range, result.id);

    }



    function handleMouseUp(event) {


        const range = window.getSelection().getRangeAt(0);
        const root = document.querySelector('.react-pdf__Document');
        const text = root.textContent;
        const textRange = TextRange.fromRange(range).relativeTo(root);
        const start = textRange.start.offset;
        const end = textRange.end.offset;
        const contextLen = 32;

        if (!window.getSelection().toString()) {
            return;
        }

        const x = event.clientX;     // Get the horizontal coordinate
        const y = event.clientY;     // Get the vertical coordinate
        setAnchorPosition({ top: y - 40, left: x });


        const annotation = {
            exact: text.slice(start, end),
            prefix: text.slice(Math.max(0, start - contextLen), start),
            suffix: text.slice(end, Math.min(text.length, end + contextLen)),
            type: 'question',
            uid: user.user.uid

        }

        setFocusedAnnotation(annotation);
    }

    function handleClose() {
        setAnchorPosition(null);

    }



    const open = Boolean(anchorPosition);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="Example">
            <AskQuestionDialog open={openQuestionDialog} highlight={focusedAnnotation.exact} onSave={handleQuestionSave} onClose={() => { setOpenQuestionDialog(false) }} />
            <Popover
                elevation={1}
                anchorReference="anchorPosition"
                anchorPosition={anchorPosition}
                id={id}
                loading={<Loader />}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                    alignItems: 'center'
                }}
            >
                <div className={classes.popOver}>
                    <IconButton aria-label="delete" onClick={handleHighlight} className={classes.margin}>
                        <img src={highlightSVG} className={classes.highlightSVG} />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={handleQuestion} className={classes.margin}>
                        <HelpOutlineIcon className={classes.highlightSVG} />
                    </IconButton>
                </div>

            </Popover>


            <div className="Example__container" id="document">


                <div className={classes.pdfRoot}>
                    <Document
                        id="document"
                        onMouseUp={handleMouseUp}
                        loading={<Loader />}
                        file={file}
                        onLoadError={onLoadError}
                        onSourceError={onSourceError}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                    >
                        {
                            Array.from(
                                new Array(numPages),
                                (el, index) => {
                                    if (index + 1 === numPages) {
                                        setTimeout(getAnnotations, 0)
                                    }
                                    return (
                                        <Page
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
                </div>
            </div>
        </div>
    );
}

