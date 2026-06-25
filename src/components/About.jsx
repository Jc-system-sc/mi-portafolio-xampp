import React from 'react';

export default function About() {
  return (
    <section id="sobre-mi" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="about-grid">

          {/* Texto */}
          <div>
            <p className="section-label">sobre mí</p>
            <h2 className="section-title">
              Desarrollador en<br /><em>formación continua</em>
            </h2>
            <p style={{ color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
              Soy estudiante de Ingeniería de Sistemas con un fuerte enfoque en el desarrollo de software.
              Me apasiona construir aplicaciones que sean funcionales, accesibles y visualmente cuidadas.
            </p>
            <p style={{ color: 'var(--ink-muted)', lineHeight: 1.8 }}>
              Actualmente exploro el ecosistema web moderno — React, APIs REST, bases de datos — y busco
              proyectos donde aprender y aportar al mismo tiempo.
            </p>

            <div className="about-stats">
              {[
                { value: '15+', label: 'Proyectos realizados' },
                { value: '4to', label: 'Año de carrera' },
                { value: '∞',  label: 'Ganas de aprender' },
              ].map(s => (
                <div key={s.label}>
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card terminal */}
          <div className="about-card">
            <p className="about-card-prompt">DATOS PERSONALES</p>
            {[
              { key: 'Nombre',     val: 'José Saravia' },
              { key: 'Carrera',    val: 'Ing. de Sistemas' },
              { key: 'Email',      val: 'jcsaraviac05@gmail.com' },
              { key: 'Disponible', val: 'Prácticas / Freelance' },
              { key: 'Idiomas',    val: 'Español, Inglés (básico)' },
            ].map(r => (
              <div key={r.key} className="about-card-row">
                <span className="about-card-key">{r.key}</span>
                <span className="about-card-val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
