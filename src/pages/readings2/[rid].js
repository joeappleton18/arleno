import { useState } from 'react';
import { Document, Page } from 'react-pdf';


export default function MyApp() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file="https://firebasestorage.googleapis.com/v0/b/computing-notes/o/files%2Feffects-swearing-on-strength-and-power-performance.pdf?alt=media&token=b962667e-8246-473b-8b31-f61b737cced6" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}