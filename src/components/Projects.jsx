import React, { useState } from 'react';
import ProjectModal from './Projectmodal';

const PROJECTS = [
  {
    title: 'Sistema de Gestión Académica',
    desc: 'Aplicación web para administrar horarios, calificaciones y asistencias en el colegio Simón Bolívar-Sunampe.',
    tags: ['React', 'Node.js', 'MySQL'],
    link: 'https://josec36.github.io/aula-virtual-simon-bolivar/', repo: '#',
  },
  {
    title: 'Desarrollo de JARVIS-IA',
    desc: 'API desarrollada para gestionar las funcionalidades y servicios de una inteligencia artificial.',
    tags: ['Express', 'PostgreSQL', 'JWT'],
    link: 'https://jarvis-ia-steel.vercel.app/', repo: '#',
  },
  {
    title: 'Página Web "Entre Lineas"',
    desc: 'Plataforma interactiva que fomenta la lectura mediante preguntas dinámicas y almacenamiento de datos en Firebase.',
    tags: ['React', 'Socket.io', 'MongoDB'],
    link: 'https://entre-lineas-alpha.vercel.app/', repo: '#',
  },
  {
    title: 'Página Web Corporativa-GELI',
    desc: 'Sitio web corporativo desarrollado para presentar productos, servicios e información institucional de una empresa.',
    tags: ['React', 'Chart.js', 'Python'],
    link: 'https://jc-system-pro.github.io/Geli-pagina.web/', repo: '#',
  },
];

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const RepoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="proyectos" style={{ background: 'var(--white)' }}>
      <div className="container">
        <p className="section-label">proyectos</p>
        <h2 className="section-title">
          Lo que he<br /><em>construido</em>
        </h2>
        <p style={{ color: 'var(--ink-muted)', maxWidth: 480, lineHeight: 1.7 }}>
          Una selección de proyectos académicos y personales.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="project-card">
              <span className="project-num">0{i + 1}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
              <div className="project-links">
                <a
                  className="project-link"
                  onClick={(e) => { e.preventDefault(); setSelectedProject(p); }}
                  href="#"
                >
                  <ExternalIcon /> Demo
                </a>
                <a href={p.repo} className="project-link"><RepoIcon /> Código</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}