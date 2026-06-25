import { useState, useRef, useEffect } from 'react';
import { useViax } from './useViax';
import './Viax.css';

/* ─────────────────────────────────────────
   SVG: Hexágono tech con cara expresiva
   ───────────────────────────────────────── */
function ViaxHex({ expression }) {

  // Puntos del hexágono (flat-top / panal, cx=41 cy=41 r=34)
  const hex = '41,7 74,24.5 74,57.5 41,75 8,57.5 8,24.5';

  /* ── Ojos ── */
  const eyes = {
    happy: (
      <>
        <path d="M27 38 Q30 34 33 38" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M49 38 Q52 34 55 38" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </>
    ),
    surprised: (
      <>
        <circle cx="30" cy="38" r="4" fill="none" stroke="#7ec8b8" strokeWidth="1.8"/>
        <circle cx="52" cy="38" r="4" fill="none" stroke="#7ec8b8" strokeWidth="1.8"/>
        <circle cx="30" cy="38" r="1.5" fill="#7ec8b8"/>
        <circle cx="52" cy="38" r="1.5" fill="#7ec8b8"/>
      </>
    ),
    scared: (
      <>
        <circle cx="30" cy="38" r="4" fill="none" stroke="#7ec8b8" strokeWidth="1.8"/>
        <circle cx="52" cy="38" r="4" fill="none" stroke="#7ec8b8" strokeWidth="1.8"/>
        <circle cx="29" cy="39" r="1.5" fill="#7ec8b8"/>
        <circle cx="51" cy="39" r="1.5" fill="#7ec8b8"/>
        <path d="M25 31 Q30 28 35 31" stroke="#7ec8b8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M47 31 Q52 28 57 31" stroke="#7ec8b8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </>
    ),
    angry: (
      <>
        <path d="M25 35 Q30 38 35 35" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M47 35 Q52 38 57 35" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M25 32 Q30 30 35 32" stroke="#7ec8b8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M47 32 Q52 30 57 32" stroke="#7ec8b8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </>
    ),
  };

  /* ── Bocas ── */
  const mouths = {
    happy:     <path d="M33 48 Q41 54 49 48" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>,
    surprised: <ellipse cx="41" cy="50" rx="3.5" ry="4.5" fill="none" stroke="#7ec8b8" strokeWidth="1.8"/>,
    scared:    <path d="M33 52 Q41 48 49 52" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>,
    angry:     <path d="M33 52 Q41 48 49 52" stroke="#7ec8b8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>,
  };

  return (
    <svg viewBox="0 0 82 82" width="82" height="82" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* gradiente sutil interior */}
        <radialGradient id="vx-hex-fill" cx="50%" cy="45%" r="55%">
          <stop offset="0%"   stopColor="#1a2e2b" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0.95"/>
        </radialGradient>

        {/* glow filter */}
        <filter id="vx-glow-f" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* clip para interior */}
        <clipPath id="vx-hex-clip">
          <polygon points={hex}/>
        </clipPath>
      </defs>

      {/* ── Anillo exterior giratorio (órbita) ── */}
      <g style={{ transformOrigin:'41px 41px', animation:'vx-spin-slow 12s linear infinite' }}>
        <circle cx="41" cy="41" r="38" fill="none" stroke="rgba(90,158,146,0.12)" strokeWidth="1" strokeDasharray="4 6"/>
        {/* nodos en la órbita */}
        {[0,60,120,180,240,300].map((deg, i) => {
          const r = 38;
          const x = 41 + r * Math.cos((deg * Math.PI) / 180);
          const y = 41 + r * Math.sin((deg * Math.PI) / 180);
          return (
            <circle key={i} cx={x} cy={y} r="2"
              fill="#5a9e92" opacity="0.6"
              style={{ animation: `vx-node-pulse 2s ease-in-out infinite ${i * 0.33}s` }}
            />
          );
        })}
      </g>

      {/* ── Anillo interior contra-giratorio ── */}
      <g style={{ transformOrigin:'41px 41px', animation:'vx-spin-rev 8s linear infinite' }}>
        <circle cx="41" cy="41" r="30" fill="none" stroke="rgba(126,200,184,0.1)" strokeWidth="0.8" strokeDasharray="2 8"/>
      </g>

      {/* ── Fondo del hexágono ── */}
      <polygon points={hex} fill="url(#vx-hex-fill)"/>

      {/* ── Borde principal ── */}
      <polygon points={hex} fill="none" stroke="#5a9e92" strokeWidth="1.4" filter="url(#vx-glow-f)"/>

      {/* ── Líneas de circuito internas ── */}
      <g clipPath="url(#vx-hex-clip)" opacity="0.25">
        <line x1="8"  y1="41" x2="74" y2="41" stroke="#7ec8b8" strokeWidth="0.6"/>
        <line x1="41" y1="7"  x2="41" y2="75" stroke="#7ec8b8" strokeWidth="0.6"/>
        <line x1="8"  y1="24.5" x2="74" y2="57.5" stroke="#7ec8b8" strokeWidth="0.6"/>
        <line x1="74" y1="24.5" x2="8"  y2="57.5" stroke="#7ec8b8" strokeWidth="0.6"/>
      </g>

      {/* ── Vértices iluminados ── */}
      {[
        [41,7],[74,24.5],[74,57.5],[41,75],[8,57.5],[8,24.5]
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="#7ec8b8" opacity="0.7"
          style={{ animation:`vx-node-pulse 3s ease-in-out infinite ${i*0.5}s` }}
        />
      ))}

      {/* ── Cara ── */}
      <g filter="url(#vx-glow-f)">
        {eyes[expression]}
        {mouths[expression]}
      </g>

      {/* ── Bracito izquierdo ── */}
      <line x1="8" y1="41" x2="0" y2="36" stroke="#5a9e92" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="0" cy="35" r="2" fill="#7ec8b8" opacity="0.8"/>

      {/* ── Bracito derecho ── */}
      <line x1="74" y1="41" x2="82" y2="36" stroke="#5a9e92" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="82" cy="35" r="2" fill="#7ec8b8" opacity="0.8"/>

      {/* ── Piernita izquierda ── */}
      <line x1="28" y1="74" x2="22" y2="82" stroke="#5a9e92" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── Piernita derecha ── */}
      <line x1="54" y1="74" x2="60" y2="82" stroke="#5a9e92" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Icono enviar ── */
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 21L23 12 2 3v7l15 2-15 2v7z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Componente principal
   ───────────────────────────────────────── */
export default function Viax() {
  const [isOpen, setIsOpen]     = useState(false);
  const [inputText, setInput]   = useState('');
  const messagesEndRef          = useRef(null);
  const inputRef                = useRef(null);

  const { messages, isLoading, expression, sendMessage } = useViax();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText.trim());
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="viax-wrapper">

      {/* ── Chat ── */}
      {isOpen && (
        <div className="viax-chat">
          <div className="viax-chat-header">
            <div className="viax-chat-header-left">
              <div className="viax-chat-status"/>
              <div>
                <div className="viax-chat-title">VIAX</div>
                <div className="viax-chat-subtitle">asistente · portafolio</div>
              </div>
            </div>
            <button className="viax-chat-close" onClick={() => setIsOpen(false)} aria-label="Cerrar">✕</button>
          </div>

          <div className="viax-messages">
            {messages.map((m, i) => (
              <div key={i} className={`viax-msg ${m.role}`}>{m.content}</div>
            ))}
            {isLoading && <div className="viax-msg typing">Procesando...</div>}
            <div ref={messagesEndRef}/>
          </div>

          <div className="viax-input-area">
            <input
              ref={inputRef}
              className="viax-input"
              type="text"
              placeholder="Escríbeme algo..."
              value={inputText}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isLoading}
              maxLength={300}
            />
            <button
              className="viax-send"
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              aria-label="Enviar"
            >
              <SendIcon/>
            </button>
          </div>
        </div>
      )}

      {/* ── Hexágono ── */}
      <div style={{ position:'relative' }}>
        <div
          className="viax-hex"
          onClick={() => setIsOpen(p => !p)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(p => !p)}
          aria-label="Abrir asistente VIAX"
          title="Habla con VIAX"
        >
          <ViaxHex expression={expression}/>
        </div>
        <span className="viax-label">VIAX</span>
      </div>

    </div>
  );
}