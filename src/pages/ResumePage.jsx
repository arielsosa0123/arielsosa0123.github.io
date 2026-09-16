import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import { profile } from '../profile.js';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function ResumePage() {
  const viewerRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.min(850, Math.max(1, entry.contentRect.width - 24)));
    });
    observer.observe(viewerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="route-page resume-page">
      <div className="resume-heading">
        <div>
          <h1 tabIndex={-1}>Resume</h1>
          <h2>Scroll to explore my experience</h2>
        </div>
        <div className="resume-controls" role="group" aria-label="Resume zoom">
          <button type="button" aria-label="Zoom out" disabled={zoom <= 0.75} onClick={() => setZoom(value => Math.max(0.75, value - 0.25))}>−</button>
          <output aria-live="polite">{Math.round(zoom * 100)}%</output>
          <button type="button" aria-label="Zoom in" disabled={zoom >= 2} onClick={() => setZoom(value => Math.min(2, value + 0.25))}>+</button>
          <button type="button" onClick={() => setZoom(1)}>Fit</button>
        </div>
      </div>
      <div className="resume-viewer" ref={viewerRef} tabIndex={0} role="region" aria-label="Scrollable resume">
        {pageWidth > 0 && (
          <Document
            suspense={false}
            file={profile.resumePath}
            onLoadSuccess={({ numPages }) => setPageCount(numPages)}
            loading={<p role="status">Loading résumé…</p>}
            error={<p role="alert">The résumé could not load. Please refresh the page to try again.</p>}
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                width={pageWidth * zoom}
                renderAnnotationLayer={false}
                loading={<p role="status">Loading page {index + 1}…</p>}
                error={<p role="alert">This page could not load. Please refresh to try again.</p>}
              />
            ))}
          </Document>
        )}
      </div>
      <div className="resume-download">
        <a className="button" href={profile.resumePath} download="Ariel-Sosa-Resume.pdf">
          Download Resume
        </a>
      </div>
    </section>
  );
}
