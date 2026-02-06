import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper'
import { Download } from 'lucide-react';
import { Document, Page,  pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const Resume = () => {
  const [, setNumPages] = useState(null);
  const [, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <>
        <div id='window-header'>
            <WindowControls target="resume"/>
            <h2>Resume.pdf</h2>
            <a href='files/resume.pdf' download className='cursor-pointer' title='Download resume' aria-label='Download resume'>
                <Download className='icon'/>
            </a>
        </div>
        <Document file="files/resume.pdf" onLoadSuccess={onDocumentLoadSuccess} onLoadError={(err) => setError(err)} loading={<div className="p-5">Loading PDF...</div>} error={<div className="p-5 text-red-500">Failed to load PDF</div>}>
        <Page 
            pageNumber={1} 
            renderTextLayer 
            renderAnnotationLayer
        />
      </Document>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow
