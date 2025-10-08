"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from '@/components/ui/card';

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  // Create duplicated testimonials for seamless loop
  const duplicatedTestimonials = [...props.testimonials, ...props.testimonials];

  return (
    <div className={props.className}>
      <motion.div
        initial={{ translateY: 0 }}
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-3 pb-6 bg-background"
      >
        {duplicatedTestimonials.map(({ text, image, name, role }, i) => (
          <Card className="relative overflow-hidden max-w-xs w-full" key={i}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-foreground">{text}</div>
                <div className="flex items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-foreground">{name}</div>
                    <div className="leading-5 text-muted-foreground tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

;