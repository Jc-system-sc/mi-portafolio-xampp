import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Modals from './components/Modals';
import Viax from './components/Viax/Viax';
import ColaboradoresModal from './components/ColaboradoresModal';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV-Josec.pdf';
    link.download = 'CV-Josec.pdf';
    link.click();
  };

  return (
    <>
      <Navbar onOpenModal={setActiveModal} />

      <main>
        <Hero onDownloadCV={handleDownloadCV} />
        <About />
        <Skills />
        <Projects />
      </main>

      <Footer onOpenModal={setActiveModal} />

      {/* Modales existentes (whatsapp, email) */}
      {activeModal !== 'colaboradores' && (
        <Modals active={activeModal} onClose={() => setActiveModal(null)} />
      )}

      {/* Modal de Colaboradores */}
      {activeModal === 'colaboradores' && (
        <ColaboradoresModal onClose={() => setActiveModal(null)} />
      )}

      <Viax />
    </>
  );
}
