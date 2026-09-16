import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { HashRouter, Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router';
import { navigationItems } from './routes.js';
import { profile } from './profile.js';

const ResumePage = lazy(() => import('./pages/ResumePage.jsx'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage.jsx'));

const { email } = profile;

function ProfileSection({ title, children }) {
  return (
    <section className="innerMid">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function useEmailCopy() {
  const [copyStatus, setCopyStatus] = useState('');
  const resetTimeout = useRef(null);

  useEffect(() => () => window.clearTimeout(resetTimeout.current), []);

  async function copyEmail() {
    window.clearTimeout(resetTimeout.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('Email Copied!');
    } catch {
      setCopyStatus(`Unable to copy. Email: ${email}`);
    }
    resetTimeout.current = window.setTimeout(() => setCopyStatus(''), 7000);
  }

  return { copyStatus, copyEmail };
}

function ContactLogos() {
  const { copyStatus, copyEmail } = useEmailCopy();

  return (
    <footer className="contact-logos" aria-label="Contact links">
      <div className="icon-Container">
        <div className="icon-wrap" style={{ animationDelay: '0s' }}>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn Profile">
            <img src="/images/LinkedIn1.png" alt="" className="icon" />
            <span>LinkedIn</span>
          </a>
        </div>
        <div className="icon-wrap" style={{ animationDelay: '0.4s' }}>
          <a className="contact-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" title="GitHub Profile">
            <img src="/images/GitHubIcon.png" alt="" className="icon" />
            <span>GitHub</span>
          </a>
        </div>
        <div className="icon-wrap" style={{ animationDelay: '0.8s' }}>
          <button className="contact-link email-button" type="button" onClick={copyEmail} aria-label="Copy email address" title={copyStatus || 'Copy email address'}>
            <img src="/images/GmailIcon.png" alt="" className="icon" />
            <span>Email</span>
          </button>
        </div>
      </div>
      <div className="copy-status" role="status" aria-atomic="true">
        {copyStatus && <span className="copy-message">{copyStatus}</span>}
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <div className="octopus-track" aria-hidden="true">
        <div id="octopus" />
      </div>
        <div className="circle">
          <img src="/images/MyPhoto.jpg" alt="Ariel Sosa" className="profileImg" />
        </div>
        <h1 id="h1" tabIndex={-1}>Ariel Sosa</h1>
        <div className="homecontent">
          <p>
            Computer Science Student @ University at Buffalo · Expected May 2027
            <br />Full-Stack Web | Mobile Development | Applied AI
            <br />AI Systems Trainer @ Handshake AI
            <br />{profile.location}
          </p>
          <br />
          <div className="Middle">
            <ProfileSection title="About Me">
              {profile.about}
            </ProfileSection>
            <br />
            <ProfileSection title="Education">
              <h3>{profile.education.school}</h3>
              <div>{profile.education.degree}</div>
              <div>{profile.education.graduation}</div>
              <p className="school-experience">{profile.education.experience}</p>
            </ProfileSection>
            <br />
            <ProfileSection title="Skills">
              <strong>Languages:</strong> {profile.skills.languages.join(', ')}<br />
              <strong>Frameworks & Libraries:</strong> {profile.skills.frameworks.join(', ')}<br />
              <strong>Tools & Platforms:</strong> {profile.skills.tools.join(', ')}
            </ProfileSection>
            <br />
            <ProfileSection title="Hobbies">
              <strong>Sports:</strong> Tennis | Swimming<br />
              Making Music<br />
              Fishing<br />
              Video Games | Programming
            </ProfileSection>
          </div>
        </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="top-bar">
      <NavLink className="site-name" to="/" end title="Go to homepage">
        Ariel Sosa
      </NavLink>
      <nav aria-label="Main navigation">
        {navigationItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className="nav-link"
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function PlaceholderPage({ title }) {
  return (
    <section className="route-page placeholder-page">
      <span className="placeholder-mark" aria-hidden="true">✦</span>
      <h1 tabIndex={-1}>{title}</h1>
      <p>Something new is on the way. Check back soon.</p>
      <Link className="button" to="/">Back to home</Link>
    </section>
  );
}

function RouteContent() {
  const { pathname } = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    contentRef.current?.focus({ preventScroll: true });
    const title = pathname === '/' ? 'Home' : navigationItems.find(item => pathname.startsWith(item.path))?.label || 'Page';
    document.title = `${title} | Ariel Sosa`;
  }, [pathname]);

  return (
    <main
      id="main"
      className={pathname === '/certifications' ? 'certifications-main' : undefined}
      ref={contentRef}
      tabIndex={-1}
    >
      <Suspense fallback={<p role="status">Loading page…</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/coming-soon-1" element={<Navigate to="/certifications" replace />} />
          {/* <Route path="/coming-soon-2" element={<PlaceholderPage title="Coming Soon 2" />} /> */}
          <Route path="*" element={
            <section className="route-page">
              <h1 tabIndex={-1}>Page not found</h1>
              <Link className="button" to="/">Back to home</Link>
            </section>
          } />
        </Routes>
      </Suspense>
      <ContactLogos />
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <a className="skip-link" href="#main" onClick={event => {
        event.preventDefault();
        document.getElementById('main')?.focus();
      }}>Skip to content</a>
      <TopBar />
      <RouteContent />
    </HashRouter>
  );
}
