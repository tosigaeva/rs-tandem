'use client';

import Link from 'next/link';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { HeroProperties } from '@/components/dashboard/hero/hero.types';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';

export default function Hero({ label, title, subtitle, cta, href }: HeroProperties) {
  return (
    <DashboardCard className="overflow-hidden py-4">
      <CardContent className="flex flex-col gap-6 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs tracking-[0.24em] uppercase">{label}</p>
          <CardTitle className="text-2xl sm:text-4xl">{title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">{subtitle}</CardDescription>
        </div>

        <PrimaryButton asChild size="lg" variant="secondary" className="px-7 text-[16px] font-semibold shadow-md">
          <Link href={href}>{cta}</Link>
        </PrimaryButton>
      </CardContent>
    </DashboardCard>
  );
}
