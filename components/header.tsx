"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header operates without authentication elements.

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Find the section element
    const section = document.getElementById(sectionId);
    if (section) {
      // Add offset for fixed header
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 80;
      
      // Scroll smoothly to the section
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
      isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logotype-long.png"
              alt="Rehand"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" onClick={scrollToSection('features')} className="text-foreground/80 hover:text-primary hover-transition">{t('nav.features')}</a>
          <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="text-foreground/80 hover:text-primary hover-transition">{t('nav.howItWorks')}</a>
          <a href="#exercises" onClick={scrollToSection('exercises')} className="text-foreground/80 hover:text-primary hover-transition">{t('nav.exercises')}</a>
          <a href="#pricing" onClick={scrollToSection('pricing')} className="text-foreground/80 hover:text-primary hover-transition">{t('nav.pricing')}</a>
          <a href="#testimonials" onClick={scrollToSection('testimonials')} className="text-foreground/80 hover:text-primary hover-transition">{t('nav.testimonials')}</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          {/* Language toggle */}
          <Button
            variant="ghost"
            onClick={() => {
              const next = i18n.language === 'en' ? 'pl' : 'en';
              i18n.changeLanguage(next);
            }}
          >
            {i18n.language.toUpperCase()}
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <a href="#features" onClick={scrollToSection('features')} className="text-foreground/80 hover:text-primary hover-transition py-2">{t('nav.features')}</a>
            <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="text-foreground/80 hover:text-primary hover-transition py-2">{t('nav.howItWorks')}</a>
            <a href="#exercises" onClick={scrollToSection('exercises')} className="text-foreground/80 hover:text-primary hover-transition py-2">{t('nav.exercises')}</a>
            <a href="#pricing" onClick={scrollToSection('pricing')} className="text-foreground/80 hover:text-primary hover-transition py-2">{t('nav.pricing')}</a>
            <a href="#testimonials" onClick={scrollToSection('testimonials')} className="text-foreground/80 hover:text-primary hover-transition py-2">{t('nav.testimonials')}</a>
            <div className="pt-2 flex flex-col space-y-2">
              {/* Mobile language toggle */}
              <Button
                variant="ghost"
                onClick={() => {
                  const next = i18n.language === 'en' ? 'pl' : 'en';
                  i18n.changeLanguage(next);
                }}
              >
                {i18n.language.toUpperCase()}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}