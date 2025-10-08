"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from '@/components/motion';
import { CheckSquareIcon, UsersIcon, CameraIcon, BarChartIcon, BuildingIcon, ClockIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';

const features = [
  {
    icon: <CheckSquareIcon className="size-6" strokeWidth={1} />,
    key: "taskManagement"
  },
  {
    icon: <UsersIcon className="size-6" strokeWidth={1} />,
    key: "roleBasedAccess"
  },
  {
    icon: <CameraIcon className="size-6" strokeWidth={1} />,
    key: "photoVerification"
  },
  {
    icon: <BarChartIcon className="size-6" strokeWidth={1} />,
    key: "analytics"
  },
  {
    icon: <BuildingIcon className="size-6" strokeWidth={1} />,
    key: "administration"
  },
  {
    icon: <ClockIcon className="size-6" strokeWidth={1} />,
    key: "timeTracking"
  }
];

export default function FeaturesSection() {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">{t('features.badge')}</div>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground mt-5"
          >
            {t('features.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-full sm:col-span-3 lg:col-span-2"
            >
              <Card className="relative overflow-hidden h-full">
                <CardContent className="pt-6 flex flex-col items-center h-full">
                  <div className="relative mx-auto flex aspect-square size-16 w-16 h-16 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                    <div className="m-auto">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center flex-1 flex flex-col">
                    <h2 className="text-lg font-medium transition">{t(`features.${feature.key}.title`)}</h2>
                    <p className="text-foreground">{t(`features.${feature.key}.description`)}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}