"use client";

import { TestimonialsColumn } from "@/components/ui/testimonial-columns-1";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      text: t('testimonials.testimonial1.quote'),
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
    },
    {
      text: t('testimonials.testimonial2.quote'),
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
    },
    {
      text: t('testimonials.testimonial3.quote'),
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      name: t('testimonials.testimonial3.name'),
      role: t('testimonials.testimonial3.role'),
    },
    {
      text: t('testimonials.testimonial4.quote'),
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      name: t('testimonials.testimonial4.name'),
      role: t('testimonials.testimonial4.role'),
    },
    {
      text: t('testimonials.testimonial5.quote'),
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      name: t('testimonials.testimonial5.name'),
      role: t('testimonials.testimonial5.role'),
    },
    {
      text: t('testimonials.testimonial6.quote'),
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: t('testimonials.testimonial6.name'),
      role: t('testimonials.testimonial6.role'),
    },
    {
      text: t('testimonials.testimonial7.quote'),
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: t('testimonials.testimonial7.name'),
      role: t('testimonials.testimonial7.role'),
    },
    {
      text: t('testimonials.testimonial8.quote'),
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: t('testimonials.testimonial8.name'),
      role: t('testimonials.testimonial8.role'),
    },
    {
      text: t('testimonials.testimonial9.quote'),
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: t('testimonials.testimonial9.name'),
      role: t('testimonials.testimonial9.role'),
    },
    {
      text: t('testimonials.testimonial10.quote'),
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      name: t('testimonials.testimonial10.name'),
      role: t('testimonials.testimonial10.role'),
    },
    {
      text: t('testimonials.testimonial11.quote'),
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      name: t('testimonials.testimonial11.name'),
      role: t('testimonials.testimonial11.role'),
    },
    {
      text: t('testimonials.testimonial12.quote'),
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      name: t('testimonials.testimonial12.name'),
      role: t('testimonials.testimonial12.role'),
    },
  ];

  const thirdLen = Math.ceil(testimonials.length / 3);
  const firstColumn = testimonials.slice(0, thirdLen);
  const secondColumn = testimonials.slice(thirdLen, thirdLen * 2);
  const thirdColumn = testimonials.slice(thirdLen * 2);

  return (
    <section id="testimonials" className="bg-background py-12 md:py-20 relative">
      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg text-sm">{t('testimonials.badge')}</div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-5 px-4">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-muted-foreground px-4">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-8 md:mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] sm:max-h-[700px] md:max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};