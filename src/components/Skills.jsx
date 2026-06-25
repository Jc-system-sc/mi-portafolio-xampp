import React from 'react';

const SKILLS = [
  { category: 'Frontend',     items: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Backend',      items: ['Node.js', 'Express', 'FireBase', 'REST APIs', 'SQL'] },
  { category: 'Herramientas', items: ['Git Lab & Git Hub', 'VS Code', 'Figma', 'Postman'] },
  { category: 'Aprendiendo',  items: ['TypeScript', 'Next.js', 'Docker', 'Python', 'Linux'] },
];

export default function Skills() {
  return (
    <section id="habilidades">
      <div className="container">
        <p className="section-label">habilidades</p>
        <h2 className="section-title">
          Tecnologías que<br /><em>manejo</em>
        </h2>
        <p style={{ color: 'var(--ink-muted)', maxWidth: 480, lineHeight: 1.7 }}>
          Herramientas y lenguajes que uso en mis proyectos, en constante expansión.
        </p>

        <div className="skills-grid">
          {SKILLS.map(group => (
            <div key={group.category} className="skill-card">
              <p className="skill-card-cat">{group.category}</p>
              <ul style={{ listStyle: 'none' }}>
                {group.items.map(item => (
                  <li key={item} className="skill-item">
                    <span className="skill-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
