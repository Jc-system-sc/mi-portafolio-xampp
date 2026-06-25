import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos', label: 'Proyectos' },
];

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const close = () => setContactOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [contactOpen]);

  // Cerrar menú móvil al navegar
  const handleMobileNav = (href) => {
    setMenuOpen(false);
    window.location.hash = href.slice(1);
  };

  const contacts = [
    {
      id: 'whatsapp', label: 'WhatsApp',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.013L2.007 22l5.101-1.338A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.7 0-3.3-.467-4.667-1.267l-.333-.2-3.467.933.933-3.4-.2-.333A7.958 7.958 0 014 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>,
    },
    {
      id: 'dni', label: 'Consultar DNI',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 9h4M14 12h4M14 15h2"/></svg>,
    },
    {
      id: 'email', label: 'Correo',
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    },
  ];

  const navClass = `navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`;

  return (
    <>
      <nav className={navClass}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo">
            <span className="navbar-logo-bold">JC</span>
            <span className="navbar-logo-italic">Saravia</span>
          </a>

          {/* Desktop links */}
          <div className="navbar-links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="navbar-link">{l.label}</a>
            ))}

            {/* Contact dropdown */}
            <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button
                className="navbar-contact-btn"
                onClick={() => setContactOpen(o => !o)}
              >
                Contactar
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {contactOpen && (
                <div className="navbar-dropdown">
                  <div className="navbar-dropdown-accent" />
                  {contacts.map(c => (
                    <button key={c.id} className="navbar-dropdown-item"
                      onClick={() => { setContactOpen(false); onOpenModal(c.id); }}
                    >
                      <span className="navbar-dropdown-item-icon">{c.icon}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburguesa móvil */}
          <button
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} className="navbar-mobile-link"
            onClick={() => setMenuOpen(false)}
          >{l.label}</a>
        ))}
        <div className="navbar-mobile-contact">
          {contacts.map(c => (
            <button key={c.id} className="navbar-mobile-contact-btn"
              onClick={() => { setMenuOpen(false); onOpenModal(c.id); }}
            >
              <span className="navbar-mobile-contact-icon">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
