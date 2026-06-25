import React, { useState, useEffect } from 'react';

const ROLES = [
  'Desarrollador Web',
  'Estudiante de Sistemas',
  'Apasionado por el código',
  'Pensamiento Creativo',
];

export default function Hero({ onDownloadCV }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section id="hero" className="hero-section">

      {/* Cuadrícula decorativa */}
      <div className="hero-grid-line hero-grid-line--v-left" />
      <div className="hero-grid-line hero-grid-line--v-right" />
      <div className="hero-grid-line hero-grid-line--h-top" />

      {/* Marca de agua */}
      <div className="hero-watermark">JC</div>

      {/* Contenido principal */}
      <div className="hero-content">

        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">Portafolio · 2026</span>
        </div>

        {/* Nombre */}
        <div>
          <div className="hero-name-bold">José C.</div>
          <div className="hero-name-italic">Saravia C.</div>
          <div className="hero-subname">Ing. de Sistemas</div>
        </div>

        {/* Divider ornamental */}
        <div className="hero-divider">
          <div className="hero-divider-line" />
          <div className="hero-divider-dot" />
          <div className="hero-divider-line" />
        </div>

        {/* Typing infinito */}
        <div className="hero-typing">
          {displayed}
          <span className="hero-cursor" />
        </div>

        {/* Descripción */}
        <p className="hero-desc">
          Construyo soluciones digitales con código limpio mejorando la
          experiencia de usuario. Apasionado por el desarrollo web y los sistemas
          bien diseñados.
        </p>

        {/* Botones */}
        <div className="hero-btns">
          <a href="#proyectos" className="hero-btn-primary">
            Ver proyectos
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <button onClick={onDownloadCV} className="hero-btn-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar CV
          </button>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">scroll</span>
        </div>
      </div>

      {/* Franja inferior editorial */}
      <div className="hero-footer-bar">
        <span>01 | Presentación</span>
        <span>Jc.Sarvavia</span>
      </div>
    </section>
  );
}
