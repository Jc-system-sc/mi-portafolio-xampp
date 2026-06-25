import { useState, useEffect } from 'react';
import './Projectmodal.css';

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const MonitorIcon = () => (
  <svg className="pm-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const hasLink = project?.link && project.link !== '#';

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  return (
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm-modal">

        {/* ── Header ── */}
        <div className="pm-header">
          <div className="pm-header-left">
            <span className="pm-title">{project.title}</span>
            <div className="pm-tags">
              {project.tags.map((t) => (
                <span key={t} className="pm-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="pm-header-right">
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-open-btn"
              >
                <ExternalIcon />
                Abrir sitio
              </a>
            )}
            <button className="pm-close" onClick={onClose} aria-label="Cerrar">✕</button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="pm-iframe-wrapper">
          {hasLink ? (
            <>
              {/* Spinner mientras carga */}
              <div className={`pm-loading ${loaded ? 'hidden' : ''}`}>
                <div className="pm-spinner"/>
              </div>

              <iframe
                className="pm-iframe"
                src={project.link}
                title={project.title}
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </>
          ) : (
            // Placeholder cuando el link es #
            <div className="pm-placeholder">
              <MonitorIcon />
              <p>preview no disponible</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}