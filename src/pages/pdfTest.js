import React, { useState, useEffect } from 'react';
import { htmlToText } from 'html-to-text';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-serializer';
import 'rangy/lib/rangy-textrange';
import Typography from '@material-ui/core/Typography';
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
import { CallReceivedTwoTone } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import highlightSVG from '../assets/customIcons/highlight.svg';
import IconButton from '@material-ui/core/IconButton';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useFirebase } from '../services/firebase/';
import { useStores } from "../stores/";

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

    },

    margin: {
        margin: theme.spacing(1),
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
    const [file, setFile] = useState('bitcoin.pdf');
    const [highlighter, setHighlighter] = useState();
    const [numPages, setNumPages] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorPosition, setAnchorPosition] = useState(null);
    const classes = useStyles();
    const fb = useFirebase();
    const user = useStores().user;




    const documentID = '8di5dfQGLorWwdpOc3DV';



    const getAnnotations = async () => {
        const annotations = [];
        const annotationsRef = await fb.document.readAnnotations(documentID);
        annotationsRef.forEach(annotationRef => annotations.push(annotationRef.data()));
        annotations.forEach(annotation => deSerialise(annotation));

    }


    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        rangy.init();
        const highlighterRef = rangy.createHighlighter();
        highlighterRef.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
        }))

        setHighlighter(highlighterRef);


    }, [])

    function onFileChange(event) {
        setFile(event.target.files[0]);
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
        getAnnotations();
        const holder = document.querySelector('#document');
        

    }

    function onLoadError(error) {
        console.error(error);
    }

    function onSourceError(error) {
        console.log(error);

    }



    async function handleHighlight() {
        setAnchorPosition(null);
        highlighter.highlightSelection("highlight", { containerElementId: "document" });
        // var selObj = rangy.getSelection();
        // var sel = rangy.serializeSelection(selObj, true);
        // document.querySelector('#range').value = sel;
        /// 
        const holder = document.querySelector('#document');
        const sel = rangy.getSelection();
        let selectedText = sel.toString();
        const parentRange = rangy.createRange();
        parentRange.selectNodeContents(holder);
        const findRange = rangy.createRange();
        const findOptions = {
            withinRange: parentRange
        };


        let findCount = 0;
        const selToSerialzie = {
            Text: selectedText,
            FindIndex: -1
        };

        searchTerm = new RegExp(selectedText.replaceAll(" ", "(.|\s)*"));

        while (findRange.findText(selectedText, findOptions)) {
            const intersects = findRange.intersection(sel._ranges[0]);

            if (intersects && intersects !== null) {
                selToSerialzie.FindIndex = findCount;
                break;
            }
            findRange.collapse(false);
            findCount++;
        }

        const annotation = { ...{ range: selToSerialzie }, ...{ type: 'highlight', uid: user.user.uid } }
        await fb.document.createAnnotation(annotation, documentID);

    }

    function handleDeserialise() {
        const selection = "10/1/2/0/0/0/1/3/0/0/0/1:0,12/1/2/0/0/0/1/3/0/0/0/1:0{6d8be6cf}";
        const range = rangy.deserializeSelection(selection);
    }

    function handleMouseUp(event) {

        if (!window.getSelection().toString()) {
            return;
        }

        const x = event.clientX;     // Get the horizontal coordinate
        const y = event.clientY;     // Get the vertical coordinate
        setAnchorPosition({ top: y - 40, left: x });
        const range = window.getSelection().getRangeAt(0);
        highlightRange(range);
        const selection = rangy.serializeSelection();
        handleDeserialise();
    }

    function handleClose() {
        setAnchorPosition(null);

    }

    function deSerialise(annotation) {
        /*const selection = {
            FindIndex: 0,
            Text: "   another   with"
        }*/

        const selection = annotation.range;


        const doc = document.querySelector('#document');
        const baseSelection = rangy.getSelection(doc);
        const selItem = selection;//JSON.parse(selection);
        baseSelection.removeAllRanges();
        const parentRange = rangy.createRange();
        parentRange.selectNodeContents(doc);

        const findRange = rangy.createRange();
        const findOptions = {
            withinRange: parentRange,
            characterOptions: true
        };
        let findCount = 0;

        while (findRange.findText(selItem.Text, findOptions)) {
            if (findCount === selItem.FindIndex) {
                //todo -- do something with the range;
                baseSelection.setSingleRange(findRange);
                highlighter.highlightSelection("highlight", { containerElementId: "document" });
                baseSelection.removeAllRanges();
                return findRange;
            }
            findRange.collapse(false);
            findCount++;
        }
        return null;
    }

    const open = Boolean(anchorPosition);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="Example">
            <Popover
                elevation={1}
                anchorReference="anchorPosition"
                anchorPosition={anchorPosition}
                id={id}

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
                </div>

            </Popover>


            <div className="Example__container" id="document">


                <div className={classes.pdfRoot}>
                    <Document
                        id="document"
                        onMouseUp={handleMouseUp}
                        onItemClick={(f) => {
                            debugger;
                        }}
                        file={file}
                        onSourceSuccess={() => { debugger; }}
                        onLoadError={onLoadError}
                        onSourceError={onSourceError}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                    >
                        {
                            Array.from(
                                new Array(numPages),
                                (el, index) => (
                                    <Page
                                        scale={2.0}
                                        className={classes.page}
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                    />
                                ),
                            )
                        }
                    </Document>
                </div>
            </div>
        </div>
    );
}

