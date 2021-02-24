// import { useEffect, useState } from 'react';
// import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";
// import testHighlights from '../assets/test-highlights';
// import dynamic from 'next/dynamic';
// const pdfLib = import('react-pdf-highlighter');
// const PdfLoader = dynamic(() => import('react-pdf-highlighter/build/components/PdfLoader'));
// const PdfHighlighter = dynamic(() => import('react-pdf-highlighter/build/components/PdfHighlighter'));
// const Tip = dynamic(() => import('react-pdf-highlighter/build/components/Tip'));
// const Highlight = dynamic(() => import('react-pdf-highlighter/build/components/Highlight'));
// const Popup = dynamic(() => import('react-pdf-highlighter/build/components/Popup'));
// const AreaHighlight = dynamic(() => import('react-pdf-highlighter/build/components/Popup'));


/*const {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight
} = dynamic(() => import('react-pdf-highlighter'), { ssr: false })*/

const pdfTest2 = () => (<h1>Hello world</h1>)



// const pdfTest2 = () => {

//     const [libraryLoaded, setLibraryLoaded] = useState(false);
//     const [highlights, setHighlights] = useState([...testHighlights["https://arxiv.org/pdf/1708.08021.pdf"]]);

//     const loadLibrary = async () => {
//         const { setPdfWorker } = await import('react-pdf-highlighter');
//         const worker = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;
//         setPdfWorker(worker);
//     }


//     useEffect(() => {
//         loadLibrary();
//         window.addEventListener(
//             'hashchange',
//             scrollToHighlightFromHash,
//         )
//     }, [])

//     const handleClick = () => {
//         setLibraryLoaded(true);
//     }


//     const getHighlightById = (id) => highlights.find(highlight => highlight.id === id);

//     const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);

//     const resetHash = () => {
//         document.location.hash = "";
//     };

//     const HighlightPopup = ({ comment }) =>
//         comment.text ? (
//             <div className="Highlight__popup">
//                 {comment.emoji} {comment.text}
//             </div>
//         ) : null;

//     const scrollViewerTo = (highlight) => { };

//     const scrollToHighlightFromHash = () => {
//         const highlight = getHighlightById(parseIdFromHash());

//         if (highlight) {
//             scrollViewerTo(highlight);
//         }
//     }

//     const getNextId = () => String(Math.random()).slice(2);

//     const addHighlight = (highlight) => {
//         setHighlights([{ ...highlight, id: getNextId() }, ...highlights])
//     }

//     /*


//     h => {
//             const {
//               id,
//               position,
//               content,
//               ...rest
//             } = h;
//             return id === highlightId
//               ? {
//                   id,
//                   position: { ...originalPosition, ...position },
//                   content: { ...originalContent, ...content },
//                   ...rest
//                 }
//               : h;
//           })
//         }

//         */

//     const updateHighlight = (highlightId, position, content) => {
//         console.log("Updating highlight", highlightId, position, content);
//         setHighlights(highlights.map(h => {
//             const {
//                 id,
//                 position: originalPosition,
//                 content: originalContent,
//                 ...rest
//             } = h;
//             return id === highlightId
//                 ? {
//                     id,
//                     position: { ...originalPosition, ...position },
//                     content: { ...originalContent, ...content },
//                     ...rest
//                 }
//                 : h;
//         }))
//     }




//     return (
//         <div className="App" style={{ display: "flex", height: "100vh" }}>
//             <button onClick={() => setLibraryLoaded(true)}> </button>
//             {libraryLoaded && <PdfLoader url="/bitcoin.pdf" beforeLoad={<p> LOADING</p>} >

//                 {pdfDocument => (
//                     <PdfHighlighter
//                         pdfDocument={pdfDocument}
//                         enableAreaSelection={event => event.altKey}
//                         onScrollChange={resetHash}
//                         scrollRef={scrollTo => {
//                             scrollViewerTo = scrollTo;
//                             scrollToHighlightFromHash();
//                         }}

//                         onSelectionFinished={(
//                             position,
//                             content,
//                             hideTipAndSelection,
//                             transformSelection
//                         ) => (
//                             <Tip
//                                 onOpen={transformSelection}
//                                 onConfirm={comment => {
//                                     addHighlight({ content, position, comment });
//                                     hideTipAndSelection();
//                                 }}
//                             />
//                         )}

//                         highlightTransform={(
//                             highlight,
//                             index,
//                             setTip,
//                             hideTip,
//                             viewportToScaled,
//                             screenshot,
//                             isScrolledTo
//                         ) => {
//                             const isTextHighlight = !Boolean(
//                                 highlight.content && highlight.content.image
//                             );

//                             const component = isTextHighlight ? (
//                                 <Highlight
//                                     isScrolledTo={isScrolledTo}
//                                     position={highlight.position}
//                                     comment={highlight.comment}
//                                 />
//                             ) : (
//                                     <AreaHighlight
//                                         highlight={highlight}
//                                         onChange={boundingRect => {
//                                             this.updateHighlight(
//                                                 highlight.id,
//                                                 { boundingRect: viewportToScaled(boundingRect) },
//                                                 { image: screenshot(boundingRect) }
//                                             );
//                                         }}
//                                     />
//                                 );

//                             return (
//                                 <Popup
//                                     popupContent={<HighlightPopup {...highlight} />}
//                                     onMouseOver={popupContent =>
//                                         setTip(highlight, highlight => popupContent)
//                                     }
//                                     onMouseOut={hideTip}
//                                     key={index}
//                                     children={component}
//                                 />
//                             );
//                         }}
//                         highlights={highlights}
//                     />
//                 )}

//             </PdfLoader>}
//         </div>)
// }


export default pdfTest2;