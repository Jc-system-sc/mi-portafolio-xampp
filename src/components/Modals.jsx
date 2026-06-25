import React, { useState, useEffect } from 'react';

/* ── helpers ── */
function CloseBtn({ onClick }) {
  return (
    <button className="modal-close" onClick={onClick} aria-label="Cerrar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  );
}

/* ══════════════════════════════════
   WHATSAPP MODAL
══════════════════════════════════ */
function WhatsAppModal({ onClose }) {
  const [form, setForm] = useState({ nombre: '', mensaje: '' });
  const WA_NUMBER = '51978159209';

  const handleSend = () => {
    if (!form.nombre.trim() || !form.mensaje.trim()) return;
    const text = encodeURIComponent(`Hola JC, soy ${form.nombre}.\n\n${form.mensaje}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div>
      <CloseBtn onClick={onClose} />
      <h3>WhatsApp</h3>
      <p className="sub">Te redirigirá a una conversación directa.</p>
      <div className="form-group">
        <label>Tu nombre</label>
        <input
          type="text" placeholder="¿Cómo te llamas?"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Mensaje</label>
        <textarea
          placeholder="Cuéntame en qué puedo ayudarte..."
          value={form.mensaje}
          onChange={e => setForm({ ...form, mensaje: e.target.value })}
        />
      </div>
      <button className="btn-primary" onClick={handleSend}
        disabled={!form.nombre.trim() || !form.mensaje.trim()}>
        Abrir WhatsApp
      </button>
    </div>
  );
}

/* ══════════════════════════════════
   DNI MODAL
══════════════════════════════════ */
function DniModal({ onClose }) {
  const [dni, setDni] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buscarDni = async () => {
    if (dni.length !== 8) { setError('El DNI debe tener exactamente 8 dígitos.'); return; }
    setError(''); setLoading(true); setResult(null);
    try {
      const res = await fetch(`https://apiperu.dev/api/dni/${dni}`, {
        headers: { Authorization: 'Bearer bffd4776530fda66314bfcd4b66735de515fa288d3b04d0d24467148500d864e' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error('No encontrado');
      setResult(data.data);
    } catch(err) {
      setError('No se encontraron datos. Verifica el número ingresado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CloseBtn onClick={onClose} />
      <h3>Consultar DNI</h3>
      <p className="sub">Consulta de datos RENIEC · Perú</p>

      <div className="form-group">
        <label>Número de DNI</label>
        <input
          type="text" placeholder="12345678" maxLength={8}
          value={dni}
          onChange={e => { setDni(e.target.value.replace(/\D/g, '').slice(0, 8)); setError(''); setResult(null); }}
          onKeyDown={e => e.key === 'Enter' && buscarDni()}
        />
      </div>
      {error && (
        <p style={{ fontSize: '.82rem', color: '#c0392b', marginBottom: '1rem' }}>{error}</p>
      )}
      <button className="btn-primary" onClick={buscarDni} disabled={loading || dni.length !== 8}>
        {loading ? 'Consultando...' : 'Consultar'}
      </button>

      {result && (
        <div style={{
          marginTop: '1.4rem', background: 'var(--beige)',
          borderRadius: 'var(--radius)', padding: '1.2rem',
          border: '1px solid var(--border)',
        }}>
          {[
            { k: 'Nombres', v: result.nombres },
            { k: 'Apellido paterno', v: result.apellidoPaterno },
            { k: 'Apellido materno', v: result.apellidoMaterno },
            { k: 'DNI', v: result.numeroDocumento },
          ].map(r => (
            <div key={r.k} style={{
              display: 'flex', gap: '.8rem', padding: '.35rem 0',
              borderBottom: '1px solid var(--border)', fontSize: '.85rem',
            }}>
              <span style={{ color: 'var(--ink-muted)', minWidth: 130, fontWeight: 500 }}>{r.k}</span>
              <span style={{ color: 'var(--ink)' }}>{r.v || '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════
   EMAIL MODAL (EmailJS)
══════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'service_ocf0trj';
const EMAILJS_TEMPLATE_ID = 'template_oc4aiii';
const EMAILJS_PUBLIC_KEY  = 'ooV8zYY0ibrrjYdYp';
const MY_EMAIL            = 'jcsaraviac05@gmail.com';

function EmailModal({ onClose }) {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) return;
    setStatus('loading');

    const templateParams = {
      from_name:   form.nombre,
      from_email:  form.email,
      subject:     form.asunto || 'Mensaje desde el portafolio',
      message:     form.mensaje,
      to_email:    MY_EMAIL,
      reply_email: form.email,
    };

    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  if (status === 'success') {
    return (
      <div className="form-success">
        <CloseBtn onClick={onClose} />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h4>¡Mensaje enviado!</h4>
        <p>Te llegará una copia a <strong>{form.email}</strong> y yo recibiré el tuyo. Te respondo pronto.</p>
      </div>
    );
  }

  return (
    <div>
      <CloseBtn onClick={onClose} />
      <h3>Enviar correo</h3>
      <p className="sub">Recibirás una copia en tu bandeja de entrada.</p>

      <div className="form-group">
        <label>Tu nombre</label>
        <input type="text" placeholder="Nombre completo" value={form.nombre} onChange={set('nombre')} />
      </div>
      <div className="form-group">
        <label>Tu correo</label>
        <input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={set('email')} />
      </div>
      <div className="form-group">
        <label>Asunto <span style={{ opacity: .5 }}>(opcional)</span></label>
        <input type="text" placeholder="¿De qué trata?" value={form.asunto} onChange={set('asunto')} />
      </div>
      <div className="form-group">
        <label>Mensaje</label>
        <textarea placeholder="Escribe tu mensaje aquí..." value={form.mensaje} onChange={set('mensaje')} />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '.82rem', color: '#c0392b', marginBottom: '.8rem' }}>
          Hubo un error al enviar. Verifica los IDs de EmailJS.
        </p>
      )}

      <button className="btn-primary" onClick={handleSubmit}
        disabled={status === 'loading' || !form.nombre || !form.email || !form.mensaje}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </div>
  );
}

/* ══════════════════════════════════
   EXPORT
══════════════════════════════════ */
export default function Modals({ active, onClose }) {
  useEffect(() => {
    if (active) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  if (!active) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        {active === 'whatsapp' && <WhatsAppModal onClose={onClose} />}
        {active === 'dni'      && <DniModal onClose={onClose} />}
        {active === 'email'    && <EmailModal onClose={onClose} />}
      </div>
    </div>
  );
}