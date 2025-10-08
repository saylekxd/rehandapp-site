"use client";

import { motion } from '@/components/motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

// Partner logos - replace these with actual partner logos
const partners = [
  {
    name: "Rehand",
    logo: "/images/partner-logotypes/Rehand-logo.png",
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=Rehand"
  },
  {
    name: "Politechnika Śląska",
    logo: "/images/partner-logotypes/polsl-logotype.webp",
    // Fallback if the image doesn't exist
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=POLSL"
  },
  {
    name: "Pocztowa",
    logo: "/images/partner-logotypes/pocztowa-logotype.webp",
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=Partner+2"
  },
  /*{
    name: "Politechnika Slaska",
    logo: "/images/partner-logotypes/polsl-logotype.webp",
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=Partner+3"
  },*/
  {
    name: "Przekludzki",
    logo: "/images/partner-logotypes/przekludzki-logotype.webp",
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=Partner+4"
  },
  {
    name: "Rybenalia",
    logo: "/images/partner-logotypes/rybenalia-logotype.webp",
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=Partner+5"
  },
  {
    name: "Stowarzyszenie SWT",
    logo: "/images/partner-logotypes/slowemwtwarz-logotype.png",
    fallbackLogo: "https://placehold.co/200x80/4f46e5/ffffff?text=Partner+6"
  },
];

export default function PartnersSection() {
  const { t } = useTranslation();
  const [imageLoadError, setImageLoadError] = useState(Array(partners.length).fill(false));
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate the height for the combined HeroSection + PartnersSection to be 100vh
  // PartnersSection will be positioned absolutely at the bottom of the hero area
  
  // Handle image errors
  const handleImageError = (index: number) => {
    const newErrors = [...imageLoadError];
    newErrors[index] = true;
    setImageLoadError(newErrors);
  };

  // Auto-scroll effect for the slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (!slider) return;
      
      position += speed;
      
      // Reset position when we've scrolled the equivalent of one logo
      if (position >= slider.scrollWidth / 2) {
        position = 0;
      }
      
      slider.scrollLeft = position;
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start animation when component is in view
    if (isVisible) {
      animationId = requestAnimationFrame(scroll);
    }
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  // Intersection observer to start animation when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }
    
    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <section id="partners" className="pt-8 md:pt-6 pb-10 md:pb-6 lg:pb-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-8 lg:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-lg lg:text-2xl font-bold text-foreground"
          >
            {t('partners.title')}
          </motion.h2>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Partner logos slider */}
          <div 
            ref={sliderRef}
            className="flex items-center gap-8 md:gap-6 lg:gap-8 pb-2 overflow-x-hidden whitespace-nowrap"
          >
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 h-14 md:h-10 lg:h-14 relative"
              >
                <Image
                  src={imageLoadError[index] ? partner.fallbackLogo : partner.logo}
                  alt={partner.name}
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  onError={() => handleImageError(index)}
                />
              </motion.div>
            ))}
            
            {/* Duplicate logos for infinite scroll effect */}
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-duplicate-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 h-14 md:h-10 lg:h-14 relative"
              >
                <Image
                  src={imageLoadError[index] ? partner.fallbackLogo : partner.logo}
                  alt={partner.name}
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  onError={() => handleImageError(index)}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 h-full w-12 lg:w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-12 lg:w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
} 