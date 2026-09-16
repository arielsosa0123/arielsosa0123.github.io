import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import { certifications } from '../certifications.js';
import { profile } from '../profile.js';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function CertificateViewer({ certification }) {
  const viewerRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.min(980, Math.max(1, entry.contentRect.width - 24)));
    });
    observer.observe(viewerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="certificate-display">
      <div
        className="certificate-viewer"
        ref={viewerRef}
        tabIndex={0}
        role="region"
        aria-label={`Scrollable ${certification.title} certificate`}
      >
        {pageWidth > 0 && (
          <Document
            file={certification.file}
            suspense={false}
            onLoadSuccess={({ numPages }) => setPageCount(numPages)}
            loading={<p role="status">Loading certificate…</p>}
            error={<p role="alert">This certificate could not load. Please refresh the page to try again.</p>}
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                width={pageWidth}
                renderAnnotationLayer={false}
                loading={<p role="status">Loading certificate page…</p>}
                error={<p role="alert">This certificate page could not load.</p>}
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <section className="route-page certifications-page">
      <header className="certifications-heading">
        <h1 tabIndex={-1}>Certifications</h1>
        <p>Professional coursework and certificates earned through CodePath.</p>
      </header>

      <section className="certification-provider" aria-labelledby="codepath-heading">
        <img src="/images/CodepathLogo.jpg" alt="CodePath.org" />
        <div>
          <h2 id="codepath-heading">CodePath</h2>
          <p>
            Instructor-led, hands-on training in AI engineering, modern web development,
            and technical interview problem solving.
          </p>
          <p className="codepath-github-note">
            Most of my CodePath projects can be found on my{' '}
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub account
            </a>.
          </p>
        </div>
      </section>

      <div className="certification-list">
        {certifications.map(certification => (
          <article className="certification-card" key={certification.code}>
            <header className="certification-title">
              <div>
                <span className="course-code">{certification.code}</span>
                <h2>{certification.title}</h2>
              </div>
              <div className="certificate-meta">
                <span>{certification.award}</span>
                <span>{certification.term}</span>
                <span>ID {certification.certificateId}</span>
              </div>
            </header>

            <div className="certification-copy">
              <h3>Course overview</h3>
              <p>{certification.description}</p>
              <h3>What I learned</h3>
              <p>{certification.learning}</p>
            </div>

            <CertificateViewer certification={certification} />
          </article>
        ))}
      </div>

    </section>
  );
}
