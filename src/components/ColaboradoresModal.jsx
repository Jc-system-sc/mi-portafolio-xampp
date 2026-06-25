import React, { useState } from 'react';

const INITIAL = { nombre: '', email: '', motivo: '' };

export default function ColaboradoresModal({ onClose }) {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState(null); // 'ok' | 'error' | 'loading'
  const [msg, setMsg]       = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.nombre.trim() || !form.email.trim() || !form.motivo.trim()) {
      setStatus('error');
      setMsg('Por favor completa todos los campos.');
      return;
    }
    if (!form.email.includes('@')) {
      setStatus('error');
      setMsg('El correo electrónico no es válido.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/colaboradores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('ok');
        setMsg('¡Gracias! Tu registro fue enviado correctamente.');
        setForm(INITIAL);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setMsg(data.mensaje || 'Ocurrió un error. Intenta nuevamente.');
      }
    } catch {
      setStatus('error');
      setMsg('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal colab-modal">

        {/* Cerrar */}
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        <h2 className="modal-title">Colaboradores</h2>
        <p className="modal-subtitle">
          ¿Tienes un proyecto o propuesta? Déjame tus datos y me pongo en contacto.
        </p>

        {/* Mensaje de éxito/error */}
        {status === 'ok' && (
          <div className="colab-alert colab-alert--ok">✓ {msg}</div>
        )}
        {status === 'error' && (
          <div className="colab-alert colab-alert--error">✕ {msg}</div>
        )}

        {status !== 'ok' && (
          <form className="colab-form" onSubmit={handleSubmit} noValidate>

            <div className="colab-field">
              <label className="colab-label" htmlFor="colab-nombre">Nombre completo</label>
              <input
                id="colab-nombre"
                className="colab-input"
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className="colab-field">
              <label className="colab-label" htmlFor="colab-email">Correo electrónico</label>
              <input
                id="colab-email"
                className="colab-input"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className="colab-field">
              <label className="colab-label" htmlFor="colab-motivo">Motivo</label>
              <textarea
                id="colab-motivo"
                className="colab-input colab-textarea"
                name="motivo"
                placeholder="Cuéntame sobre tu proyecto o propuesta..."
                rows={4}
                value={form.motivo}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <button
              className="colab-btn"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar registro'}
            </button>

          </form>
        )}

        {status === 'ok' && (
          <button className="colab-btn" style={{ marginTop: '1.2rem' }} onClick={onClose}>
            Cerrar
          </button>
        )}

      </div>
    </div>
  );
}
