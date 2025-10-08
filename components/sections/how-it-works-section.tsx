"use client";

import { motion } from '@/components/motion';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from 'react-i18next';

export default function HowItWorksSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language?.startsWith('pl') ? 'pl' : 'en';
  const embedSrc = `https://www.youtube.com/embed/KPBlzIgg-3o?rel=0&modestbranding=1&hl=${lang}&cc_load_policy=1&cc_lang_pref=${lang}`;

  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-background relative">
      <div className="absolute inset-y-0 right-0 w-1/3 sm:w-1/2 bg-muted/10 -z-10 rounded-l-2xl sm:rounded-l-3xl" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center">
            <div className="border py-1 px-3 sm:px-4 rounded-lg text-sm">{t('howItWorks.badge')}</div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-4 sm:mt-5 px-4"
          >
            {t('howItWorks.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4"
          >
            {t('howItWorks.subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <AspectRatio ratio={1}>
            <iframe
              src={embedSrc}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </AspectRatio>
        </motion.div>
      </div>
    </section>
  );
}