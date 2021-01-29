import React, { useState, useEffect } from 'react';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-serializer';
import Typography from '@material-ui/core/Typography';
import { Document, Page, pdfjs } from 'react-pdf';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { CallReceivedTwoTone } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import highlightSVG from '../assets/customIcons/highlight.svg';
import IconButton from '@material-ui/core/IconButton';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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

    const annotations = [{ range: "0/21/1/0/0/0/1/1/3/0/0/0/1:31,0/1/21/1/0/0/0/1/1/3/0/0/0/1:27{a7f7209b}" }];



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
    }

    function onLoadError(error) {
        console.error(error);
    }

    function onSourceError(error) {
        console.log(error);

    }

    function handleHighlight() {
        setAnchorPosition(null);
        // highlighter.highlightSelection("highlight", { containerElementId: "document" });
        var selObj = rangy.getSelection();
        var sel = rangy.serializeSelection(selObj, true);
        document.querySelector('#range').value = sel;

    }

    function handleMouseUp(event) {

        if (!window.getSelection().toString()) {
            return;
        }

        const x = event.clientX;     // Get the horizontal coordinate
        const y = event.clientY;     // Get the vertical coordinate
        setAnchorPosition({ top: y - 40, left: x });
    }

    function handleClose() {
        setAnchorPosition(null);

    }

    function handleDeserialLIse() {

        //rangy.deserializeSelection(document.querySelector('#range').value);
        //highlighter.deserialize(document.querySelector('#range').value);
    }

    const open = Boolean(anchorPosition);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="Example">
            <button onClick={handleDeserialLIse}> unserialise me</button>
            <input id="range"></input>
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

