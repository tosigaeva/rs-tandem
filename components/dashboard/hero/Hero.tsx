'use client';

import Link from 'next/link';

import { HeroProperties } from '@/components/dashboard/hero/hero.types';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

export default function Hero({ label, title, subtitle, cta, href }: HeroProperties) {
  return (
    <Card className="border-border/60 from-background via-muted/40 to-muted/20 flex h-full justify-start overflow-hidden rounded-3xl border bg-linear-to-br py-4 shadow-sm">
      <CardContent className="flex flex-col gap-6 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs tracking-[0.24em] uppercase">{label}</p>
          <CardTitle className="text-2xl sm:text-4xl">{title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">{subtitle}</CardDescription>
        </div>

        <PrimaryButton asChild size="lg" variant="default" className="px-7 text-[16px] font-semibold shadow-md">
          <Link href={href}>{cta}</Link>
        </PrimaryButton>
      </CardContent>
    </Card>
  );
}
