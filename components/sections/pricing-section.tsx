"use client";

import { useState, useEffect } from 'react';
import { motion } from '@/components/motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';
// Link not needed; using buttons only
import { getCalApi } from "@calcom/embed-react";
import { useTheme } from 'next-themes';

// Removed billing period toggle; explicit weekly/monthly/annual plans

export default function PricingSection() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Cal.com initialization
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"chcesz-omowic-plan-enterprise-umow-sie-na-bezpłatne-spotkanie"});
      cal("ui", {
        "theme": isDark ? "dark" : "light",
        "cssVarsPerTheme": {
          "light": {"cal-brand": "#fffefe"},
          "dark": {"cal-brand": "#3b82f6"}
        },
        "hideEventTypeDetails": false,
        "layout": "column_view"
      });
    })();
  }, [isDark]);

  const locale = i18n.language === 'pl' ? 'pl-PL' : 'en-US';
  const currency = i18n.language === 'pl' ? 'PLN' : 'USD';
  const formatPrice = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);

  const plans = [
    {
      name: t('pricing.plans.core.name'),
      description: t('pricing.plans.core.description'),
      priceValue: i18n.language === 'pl' ? 59.99 : 14.99,
      periodKey: 'week',
      features: [
        { included: true, text: t('pricing.plans.core.features.teamMembers') },
        { included: true, text: t('pricing.plans.core.features.taskManagement') },
        { included: true, text: t('pricing.plans.core.features.timeTracking') },
        { included: false, text: t('pricing.plans.core.features.photoVerification') },
        { included: false, text: t('pricing.plans.core.features.roleAccess') },
        { included: false, text: t('pricing.plans.core.features.basicAnalytics') },
        
        { included: true, text: t('pricing.plans.core.features.support') },
      ],
      cta: t('pricing.plans.core.cta'),
      popular: false,
    },
    {
      name: t('pricing.plans.growthAI.name'),
      description: t('pricing.plans.growthAI.description'),
      priceValue: i18n.language === 'pl' ? 129.99 : 29.99,
      periodKey: 'month',
      features: [
        { included: true, text: t('pricing.plans.growthAI.features.teamMembers') },
        { included: true, text: t('pricing.plans.growthAI.features.taskManagement') },
        { included: true, text: t('pricing.plans.growthAI.features.photoVerification') },
        { included: false, text: t('pricing.plans.growthAI.features.roleAccess') },
        { included: true, text: t('pricing.plans.growthAI.features.aiReports') },
        { included: false, text: t('pricing.plans.growthAI.features.payroll') },
        { included: false, text: t('pricing.plans.growthAI.features.scheduling') },
        { included: false, text: t('pricing.plans.growthAI.features.onboardingBot') },
        { included: false, text: t('pricing.plans.growthAI.features.internalChat') },
        { included: true, text: t('pricing.plans.growthAI.features.prioritySupport') },
      ],
      cta: t('pricing.plans.growthAI.cta'),
      popular: true,
      comingSoon: false,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      description: t('pricing.plans.enterprise.description'),
      priceValue: i18n.language === 'pl' ? 990 : 269,
      periodKey: 'year',
      features: [
        { included: true, text: t('pricing.plans.enterprise.features.unlimitedMembers') },
        { included: true, text: t('pricing.plans.enterprise.features.completeSuite') },
        { included: true, text: t('pricing.plans.enterprise.features.advancedRoleAccess') },
        { included: true, text: t('pricing.plans.enterprise.features.advancedAnalytics') },
        { included: false, text: t('pricing.plans.enterprise.features.customIntegrations') },
        { included: false, text: t('pricing.plans.enterprise.features.internalChatPro') },
        { included: false, text: t('pricing.plans.enterprise.features.dedicatedCSM') },
        { included: false, text: t('pricing.plans.enterprise.features.sla') },
      ],
      cta: t('pricing.plans.enterprise.cta'),
      popular: false,
      contactOnly: false,
    }
  ];
  
  return (
    <section id="pricing" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-primary/5 to-transparent dark:from-primary/10 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
        <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">{t('pricing.badge')}</div>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground mt-5"
          >
            {t('pricing.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t('pricing.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full flex"
            >
              <Card className={`w-full border-2 ${plan.popular ? 'border-primary' : 'border-border'} relative flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card ${plan.comingSoon ? 'opacity-75' : ''}`}>
                {plan.name === t('pricing.plans.enterprise.name') && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {t('pricing.plans.enterprise.badge')}
                  </div>
                )}
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {t('pricing.popular')}
                  </div>
                )}
                {plan.comingSoon && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-violet-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {t('pricing.comingSoon')}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                  <div className="mt-4">
                    {plan.contactOnly ? (
                      <span className="text-2xl font-bold text-muted-foreground">
                        {t('pricing.contactSales')}
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">
                          {formatPrice(plan.priceValue)}
                        </span>
                        <span className="text-muted-foreground ml-1">/{t(`pricing.${plan.periodKey}`)}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.filter(f => f.text).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <CheckIcon className="h-3 w-3 text-primary" />
                          </span>
                        ) : (
                          <span className="flex-shrink-0 w-5 h-5 bg-muted rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <XIcon className="h-3 w-3 text-muted-foreground" />
                          </span>
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.comingSoon}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            {t('pricing.customPlan')} <a 
              href="mailto:adamrojek@icloud.com?subject=Custom%20plan%20inquiry" 
              className="text-primary font-medium hover:underline"
            >
              {t('pricing.contactSales')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}