
import { useEffect } from 'react';
import {
    getBoundingClientRect,
    getHighlightsContainingNode,
    highlightRange,
    removeHighlights,
    removeAllHighlights,
    setHighlightsFocused,
    setHighlightsVisible,
} from '../utils/highlighter';


function PdfPage({ showPlaceholder = false }) {
    return (
        <div className="page">
            <div className="canvasWrapper">
                {/* Canvas where PDF.js renders the visual PDF output. */}
                <canvas />
            </div>
            {/* Transparent text layer created by PDF.js to enable text selection */}
            {!showPlaceholder && (
                <div className="textLayer">
                    {/* Text span created to correspond to some text rendered into the canvas.
              Hypothesis creates `<hypothesis-highlight>` elements here. */}
                    <span className="testText">Text to highlight</span>
                </div>
            )}
            {showPlaceholder && (
                <div className="annotator-placeholder testText">
                    {/* Placeholder created to anchor annotations to if the text layer has not finished
                rendering. */}
            Loading annotations
                </div>
            )}
        </div>
    );
}



const pdfTest = () => {
    // cool things on rages https://medium.com/@alexandrawilll/window-getselection-and-range-in-javascript-5a13453d22
    const handelOnMouseUp = () => {
        const ranges = window.getSelection();
        const range = window.getSelection().getRangeAt(0);
        highlightRange();
        debugger;
    }


    return (<PdfPage onMouseUp={handelOnMouseUp} />)
}

export default pdfTest;