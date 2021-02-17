import { useEffect, useState } from 'react';
import rangy from 'rangy';
import 'rangy/lib/rangy-serializer';
import { Document, Page, pdfjs } from 'react-pdf';
import { makeStyles } from '@material-ui/core/styles';
import { matchQuote } from '../utils/match-quote';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextRange, TextPosition } from '../utils/text-range';

import {
    getBoundingClientRect,
    getHighlightsContainingNode,
    highlightRange,
    removeHighlights,
    removeAllHighlights,
    setHighlightsFocused,
    setHighlightsVisible,
} from '../utils/highlighter';

const sampleAnnotation =

{
    id: "123456",
    exact: "Ok, this is a little test, we are currently on the first paragraph.   Here is the second p",
    prefix: "",
    suffix: "aragraph.   Here is the third pa"
}


const useStyles = makeStyles((theme) => ({
    pdfRoot: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        fontSize: '40px !important'
    },

    loader: {

        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

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


const PdfTest = () => {
    const classes = useStyles();
    const [numPages, setNumPages] = useState(null);
    const [documentRoot, setDocumentRoot] = useState(null);
    const [file, setFile] = useState('sample2.pdf');
    //const savedRange = "0/6/1/0/0/1/3/0/0/0/1:7,0/12/1/0/0/1/3/0/0/0/"


    const Loader = () => {

        useEffect(() => {

            return () => {
                debugger;
            }
        }, [])

        return (<div className={classes.loader}><CircularProgress /></div>)

    }


    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [])


    const handleLoadSuccess = ({ numPages }) => {
        const root = document.querySelector('.react-pdf__Document');
        debugger;
        setNumPages(numPages);
    }

    const handleLoadError = (e) => {
        console.log(e);
    }


    const handleSourceLoadError = (e) => {
        console.log(e);
    }



    const handleClick = () => {

        const root = document.querySelector('.react-pdf__Document');
        const text = root.textContent;
        const match = matchQuote(text, sampleAnnotation.exact, {
            ...{ prefix: sampleAnnotation.prefix, suffix: sampleAnnotation.suffix },
            hint: 0
        })

        const range = TextRange.fromOffsets(root, match.start, match.end).toRange();

        const onClick = () => { alert("hello there") }

        highlightRange(range, sampleAnnotation.id, onClick);

        document.querySelectorAll('hypothesis-highlight').forEach(e => {
            e.addEventListener('click', (e) => alert(e.target.getAttribute('annotationid')));
        })



    }

    const handleMouseUp = (e) => {

        if (!window.getSelection().toString()) {
            return;
        }
        const range = window.getSelection().getRangeAt(0);
        console.log(JSON.stringify(range));
        const root = document.querySelector('.react-pdf__Document');
        const text = root.textContent;
        const textRange = TextRange.fromRange(range).relativeTo(root);
        const start = textRange.start.offset;
        const end = textRange.end.offset;
        const contextLen = 32;

        const textQuote = {
            exact: text.slice(start, end),
            prefix: text.slice(Math.max(0, start - contextLen), start),
            suffix: text.slice(end, Math.min(text.length, end + contextLen)),
        }

        debugger;

        window.getSelection().removeAllRanges();
    }

    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };

    return (
        <div className={classes.pdfRoot}>
            <Document
                options={options}
                id="document"
                file={file}
                loading={<Loader />}
                onLoadSuccess={handleLoadSuccess}
                onSourceError={handleSourceLoadError}
                onLoadError={handleLoadError}
            >
                {
                    Array.from(
                        new Array(numPages),
                        (el, index) => {

                            return (
                                <Page
                                    onRenderSuccess={() => {
                                        if ((index + 1) === numPages) {
                                            //handleClick();
                                        }
                                    }}

                                    loading={<Loader />}
                                    onMouseUp={handleMouseUp}
                                    scale={2.0}
                                    className={classes.page}
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                />
                            )
                        },
                    )


                }
            </Document></div>)

}


export default PdfTest;