'use client';

import React, { useState, useEffect } from 'react';
import MobileNavbar from '../components/Mobile/MobileNavbar';
import MobileHero from '../components/Mobile/MobileHero';
import MobileProjectPipeline from '../components/Mobile/MobileProjectPipeline';
import MobileShowcase from '../components/Mobile/MobileShowcase';
import MobileSkills from '../components/Mobile/MobileSkills';

import About from '../components/Sections/About';


import MiniProjects from '../components/Sections/MiniProjects';
import GithubActivity from '../components/Sections/GithubActivity';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Footer';

import GlobalModal from '../components/ui/GlobalModal';
import Snackbar from '../components/ui/Snackbar';
import ResumeModal from '../components/ui/ResumeModal';

function AppMobile() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    data: any;
    type: string | null;
  }>({
    isOpen: false,
    data: null,
    type: null,
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openModal = (data: any, type: string) => {
    setModalConfig({
      isOpen: true,
      data,
      type,
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const [snackbarConfig, setSnackbarConfig] = useState({
    isOpen: false,
    message: '',
  });

  const showSnackbar = (message: string) => {
    setSnackbarConfig({
      isOpen: true,
      message,
    });
  };

  const closeSnackbar = () => {
    setSnackbarConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-background text-foreground selection:bg-accent/30 selection:text-accent overflow-x-hidden w-full max-w-[100vw]">
      <MobileNavbar theme={theme} toggleTheme={toggleTheme} onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      <main className="overflow-x-hidden w-full">
        <MobileHero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <About />

        <MobileShowcase onOpenModal={openModal} />
        <MobileProjectPipeline onOpenModal={openModal} />
        <MobileSkills onOpenModal={openModal} />
        <GithubActivity />

        <MiniProjects onOpenModal={openModal} />
        <Contact />
      </main>

      <Footer />

      <GlobalModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        data={modalConfig.data}
        type={modalConfig.type}
        onOpenModal={openModal}
        onShowSnackbar={showSnackbar}
      />

      <Snackbar
        isOpen={snackbarConfig.isOpen}
        message={snackbarConfig.message}
        onClose={closeSnackbar}
      />

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  );
}

export default AppMobile;
