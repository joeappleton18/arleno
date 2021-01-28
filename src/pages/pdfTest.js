import React, { useState, useEffect } from 'react';
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import Typography from '@material-ui/core/Typography';
import { Document, Page, pdfjs } from 'react-pdf';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { CallReceivedTwoTone } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import highlightSVG from '../assets/customIcons/highlight.svg';


const useStyles = makeStyles({
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
        width: '167px',
        height: '40px',
        display: 'flex',
    },

    page: {

        marginTop: '0.5rem',
        maxWidth: 'calc(~"100% - 2em")',
        boxShadow: '0 0 8px rgba(0, 0, 0, .5);'
    }
});


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

    function handleMouseUp(event) {

        if (!window.getSelection().toString()) {
            return;
        }

        const x = event.clientX;     // Get the horizontal coordinate
        const y = event.clientY;     // Get the vertical coordinate
        setAnchorPosition({ top: y - 40, left: x });
        debugger;

        //highlighter.highlightSelection("highlight", { containerElementId: "document" });
    }

    function handleClose() {
        setAnchorPosition(null);

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
                }}
            >
                <div className={classes.popOver}>
                    <img src={highlightSVG} />
                </div>

            </Popover>


            <div className="Example__container" id="document">


                <div className={classes.pdfRoot}>
                    <Document
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

