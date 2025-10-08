"use client";

import { motion } from '@/components/motion';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function CTASection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
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

  return (
    <section id="pricing" className="w-full py-20 bg-background text-foreground overflow-hidden relative">
      {/* Background elements with primary color */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 -top-64 w-96 h-96 rounded-full bg-primary/5"></div>
        <div className="absolute -left-64 -bottom-64 w-96 h-96 rounded-full bg-primary/5"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
        <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">{t('cta.badge')}</div>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground mt-5"
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl max-w-3xl mx-auto text-muted-foreground"
          >
            {t('cta.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="#pricing">
              <Button 
                size="lg" 
                className={cn(
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover-transition hover-scale group border-none",
                )}
              >
                {t('cta.getStarted')}
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 text-primary hover:border-primary hover:bg-primary/10 hover-transition"
              data-cal-namespace="zwieksz-zyski-firmy-dzieki-ai-menago"
              data-cal-link="swtlabs/zwieksz-zyski-firmy-dzieki-ai-menago"
              data-cal-config='{"layout":"week_view","theme":"light"}'
            >
              {t('cta.bookDemo')}
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <p className="text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
              <span className="flex items-center hover-transition hover:text-primary cursor-default">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('cta.benefits.noCreditCard')}
              </span>
              <span className="flex items-center hover-transition hover:text-primary cursor-default">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('cta.benefits.easySetup')}
              </span>
              <span className="flex items-center hover-transition hover:text-primary cursor-default">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('cta.benefits.cancelAnytime')}
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}