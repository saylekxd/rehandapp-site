"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Exercise = {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  image_url: string | null;
  steps_json: any | null;
  instructions: string[] | null;
};

export default function ExercisesSection() {
  const { t } = useTranslation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Exercise | null>(null);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('exercises')
        .select('id, title, description, duration_minutes, difficulty, category, image_url, steps_json, instructions')
        .eq('is_active', true)
        .limit(12);
      if (!mounted) return;
      if (error) {
        setError(error.message);
      } else {
        setExercises((data || []) as Exercise[]);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const renderDifficulty = (d: Exercise['difficulty']) => {
    const map = {
      easy: 'default',
      medium: 'secondary',
      hard: 'destructive'
    } as const;
    return <Badge variant={map[d] as any}>{t(`exercises.difficulty.${d}`)}</Badge>;
  };

  // Create a tripled list for seamless looping
  const loopedExercises = useMemo(() => {
    if (!exercises || exercises.length === 0) return [] as Array<Exercise & { _loopIndex: number }>;
    const tripled = Array.from({ length: 3 }).flatMap((_, loopIndex) =>
      exercises.map(e => ({ ...e, _loopIndex: loopIndex }))
    );
    return tripled;
  }, [exercises]);

  // Set initial scroll to the middle segment and keep it looping
  useEffect(() => {
    if (loading) return;
    const root = scrollRootRef.current;
    if (!root) return;
    const viewport = root.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement | null;
    if (!viewport) return;

    const centerToMiddle = () => {
      const segmentWidth = viewport.scrollWidth / 3;
      // Place user in the middle segment at the same relative offset
      viewport.scrollLeft = segmentWidth + (viewport.scrollLeft % segmentWidth);
    };

    // On first render center to the middle segment
    requestAnimationFrame(() => {
      const segmentWidth = viewport.scrollWidth / 3;
      if (segmentWidth > 0) {
        viewport.scrollLeft = segmentWidth;
      }
    });

    const onScroll = () => {
      const segmentWidth = viewport.scrollWidth / 3;
      if (segmentWidth <= 0) return;
      if (viewport.scrollLeft < segmentWidth * 0.1) {
        viewport.scrollLeft += segmentWidth;
      } else if (viewport.scrollLeft > segmentWidth * 1.9) {
        viewport.scrollLeft -= segmentWidth;
      }
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', onScroll);
  }, [loading, loopedExercises.length]);

  return (
    <section id="exercises" className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">{t('exercises.badge')}</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">{t('exercises.title')}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t('exercises.subtitle')}</p>
        </div>

        {error && (
          <div className="text-center text-destructive mb-6">{t('exercises.error')}: {error}</div>
        )}
      </div>

      {/* Full-bleed scroller (edge-to-edge) */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8" ref={scrollRootRef}>
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-3 snap-x snap-mandatory touch-pan-x">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <Card
                  key={idx}
                  className="min-w-[85vw] w-[85vw] sm:min-w-[320px] sm:w-[320px] md:min-w-[360px] md:w-[360px] h-[360px] sm:h-[380px] rounded-xl animate-pulse"
                />
              ))
            ) : (
              loopedExercises.map(ex => (
                <Card
                  key={`${ex.id}-${ex._loopIndex}`}
                  className="min-w-[85vw] w-[85vw] sm:min-w-[320px] sm:w-[320px] md:min-w-[360px] md:w-[360px] overflow-hidden rounded-xl border hover:shadow-lg transition-shadow snap-start"
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 sm:h-52 w-full bg-muted">
                      {ex.image_url ? (
                        <Image src={ex.image_url} alt={ex.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">{t('exercises.noImage')}</div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base leading-snug line-clamp-1">{ex.title}</h3>
                        {renderDifficulty(ex.difficulty)}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{ex.description}</p>
                      <div className="text-xs text-muted-foreground">{ex.duration_minutes} {t('exercises.minutes')} · {ex.category}</div>
                      <Button className="w-full mt-2" onClick={() => setSelected(ex)}>{t('exercises.view')}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="relative h-40 w-full rounded-md overflow-hidden bg-muted">
                  {selected.image_url && (
                    <Image src={selected.image_url} alt={selected.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {renderDifficulty(selected.difficulty)}
                  <span>•</span>
                  <span>{selected.duration_minutes} {t('exercises.minutes')}</span>
                  <span>•</span>
                  <span>{selected.category}</span>
                </div>
                {(selected.instructions && selected.instructions.length > 0) ? (
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    {selected.instructions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                ) : selected.steps_json ? (
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    {Array.isArray(selected.steps_json) ? selected.steps_json.map((s: any, idx: number) => (
                      <li key={idx}>{typeof s === 'string' ? s : (s?.text || JSON.stringify(s))}</li>
                    )) : null}
                  </ol>
                ) : (
                  <div className="text-sm text-muted-foreground">{t('exercises.noInstructions')}</div>
                )}
                <div className="pt-2">
                  <Button className="w-full">{t('exercises.start')}</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}


