import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { makeStyles } from '@material-ui/core/styles';
import { CallReceivedTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
    pdfRoot: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        fontSize: '40px !important'
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
    const [numPages, setNumPages] = useState(null);
    const classes = useStyles();


    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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



    return (
        <div className="Example">

            <div className="Example__container">

                <div className={classes.pdfRoot}>
                    <Document
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

