"use client";

import { Button } from '@/components/ui/button';
import { motion } from '@/components/motion';
import Image from 'next/image';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getCalApi } from "@calcom/embed-react";
import Link from 'next/link';

export default function HeroSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  
  // Cal.com initialization
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"zwieksz-zyski-firmy-dzieki-ai-menago"});
      cal("ui", {
        "theme": isDark ? "dark" : "light",
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#fffefe"},
          "dark": {"cal-brand": "#3b82f6"}
        },
        "hideEventTypeDetails": false,
        "layout": "week_view"
      });
    })();
  }, [isDark]);
  
  // Images for the carousel - using more reliable image URLs
  const phoneImages = [
    "/images/hero-images/app-screen-1.png",
    "/images/hero-images/app-screen-3.png",
    "/images/hero-images/app-screen-2.png",
    "/images/hero-images/app-screen-4.png",
  ];
  
  // Fallback images if the public folder doesn't contain these images
  const fallbackImages = [
    "https://placehold.co/640x1280/3b82f6/ffffff?text=AI-Menago+Screen+1",
    "https://placehold.co/640x1280/6366f1/ffffff?text=AI-Menago+Screen+2",
    "https://placehold.co/640x1280/8b5cf6/ffffff?text=AI-Menago+Screen+3",
    "https://placehold.co/640x1280/ec4899/ffffff?text=AI-Menago+Screen+4",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(Array(phoneImages.length).fill(false));
  
  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev + 1) % phoneImages.length);
    setTimeout(() => setIsAnimating(false), 500); // Match animation duration
  }, [isAnimating, phoneImages.length]);
  
  const prevImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev - 1 + phoneImages.length) % phoneImages.length);
    setTimeout(() => setIsAnimating(false), 500); // Match animation duration
  }, [isAnimating, phoneImages.length]);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 4000);
    
    return () => clearInterval(timer);
  }, [nextImage]);

  // Handle image errors
  const handleImageError = (index: number) => {
    const newErrors = [...imageLoadError];
    newErrors[index] = true;
    setImageLoadError(newErrors);
  };

  return (
    <section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-background -z-10" />
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 lg:pl-24 xl:pl-32 lg:pr-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-12 items-center justify-items-start h-full">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left space-y-6 lg:space-y-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight text-center lg:text-left">
              {t('hero.titlePrefix')} <span className="text-primary">{t('hero.brand')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {(() => {
                const subtitle = t('hero.subtitle');
                const agentAIPattern = /agent AI/i;
                const match = subtitle.match(agentAIPattern);
                
                if (match) {
                  const parts = subtitle.split(agentAIPattern);
                  const beforeAgent = parts[0];
                  const afterAgent = parts[1];
                  
                  // Find the sentence break before "agent AI"
                  const sentences = beforeAgent.split(/[.!?]/);
                  const lastSentence = sentences[sentences.length - 1];
                  const beforeLastSentence = sentences.slice(0, -1).join('. ') + (sentences.length > 1 ? '. ' : '');
                  
                  return (
                    <>
                      {beforeLastSentence}
                      {beforeLastSentence && <br />}
                      {lastSentence.trim() + ' '}
                      <strong>agent AI</strong>
                      {afterAgent}
                    </>
                  );
                }
                
                return subtitle;
              })()}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Link href="https://apps.apple.com/pl/app/rehand/id6751533740?l" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  {t('hero.getStarted')}
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto"
                data-cal-namespace="zwieksz-zyski-firmy-dzieki-ai-menago"
                data-cal-link="swtlabs/zwieksz-zyski-firmy-dzieki-ai-menago"
                data-cal-config='{"layout":"week_view","theme":"light"}'
              >
                {t('hero.bookDemo')}
              </Button>
            </div>
            
            {/* App Store buttons hidden */}
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-start sm:space-x-6 space-y-2 sm:space-y-0">
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center lg:justify-start">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                {t('hero.noCreditCard')}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center lg:justify-start">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                {t('hero.freeTrial')}
              </p>
            </div>
          </motion.div>
          
          {/* iPhone-style Hero Image with Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto lg:justify-self-end w-full max-w-[250px] md:max-w-[280px] lg:max-w-[240px] xl:max-w-[280px]"
          >
            {/* iPhone Frame */} 
            <div className="relative w-full aspect-[9/19] mx-auto">
              {/* Phone outer frame */}
              <div className="absolute inset-0 bg-gray-800 dark:bg-gray-900 rounded-[3rem] shadow-xl overflow-hidden">
                {/* Phone inner frame */}
                <div className="absolute inset-[3px] bg-black rounded-[2.9rem] overflow-hidden border border-gray-700">
               
                  
                  {/* Screen - adding explicit dimensions to ensure content visibility */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                    {/* Image Carousel */}
                    <div className="relative h-full w-full bg-gray-100">
                      {/* Show loading state */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white z-10 transition-opacity duration-300" 
                           style={{ opacity: isAnimating ? 0.5 : 0 }}>
                        <div className="animate-pulse">{t('hero.loading')}</div>
                      </div>
                      
                      {phoneImages.map((img, index) => (
                        <motion.div 
                          key={index}
                          className="absolute inset-0 bg-gray-900"
                          initial={{ opacity: 0, x: index > currentImageIndex ? '100%' : '-100%' }}
                          animate={{ 
                            opacity: index === currentImageIndex ? 1 : 0,
                            x: index === currentImageIndex ? '0%' : index > currentImageIndex ? '100%' : '-100%'
                          }}
                          transition={{ duration: 0.5 }}
                          style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
                        >
                          <Image 
                            src={imageLoadError[index] ? fallbackImages[index] : img}
                            alt={`AI-Menago App Screenshot ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 280px"
                            className="object-cover"
                            priority={index === 0}
                            onError={() => handleImageError(index)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={prevImage}
                className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full shadow-lg z-30 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                disabled={isAnimating}
                aria-label={t('hero.previousImage')}
              >
                <ChevronLeftIcon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full shadow-lg z-30 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                disabled={isAnimating}
                aria-label={t('hero.nextImage')}
              >
                <ChevronRightIcon className="h-4 w-4 text-gray-800 dark:text-gray-200" />
              </button>
              
              {/* Indicator dots */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {phoneImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentImageIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    } transition-colors`}
                    aria-label={`${t('hero.goToImage')} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating UI elements removed per request */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}