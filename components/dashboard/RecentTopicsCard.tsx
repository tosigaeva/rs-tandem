'use client';

import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Progress } from '@/components/ui';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InProgressTopic } from '@/data/dashboard.api';
import { useTranslation } from '@/hooks/use-translation';
import { roundPercent } from '@/lib/format';
import { getDateFnsLocale } from '@/services/locale/locale-format';

export type RecentTopics = Omit<InProgressTopic, 'title'> & {
  title: string;
};

type RecentTopicsCardProperties = {
  topics: RecentTopics[];
};

export default function RecentTopicsCard({ topics }: RecentTopicsCardProperties) {
  const { t, languageCode } = useTranslation();

  if (topics.length === 0) return;

  return (
    <DashboardCard>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t('dashboard.recent.title')}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {topics.map((topic) => {
          const percent = roundPercent((topic.completed / topic.total) * 100);

          return (
            <Link
              key={topic.id}
              href={topic.href}
              className="group bg-muted/50 hover:border-border/60 hover:bg-muted flex items-center gap-4 rounded-2xl border border-transparent p-3 transition"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">{topic.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {topic.completed}/{topic.total}
                  </p>
                </div>

                <Progress value={percent} className="h-2" />

                <p className="text-muted-foreground text-xs">
                  {formatDistanceToNow(topic.lastPracticedAt, {
                    addSuffix: true,
                    locale: getDateFnsLocale(languageCode),
                  })}
                </p>
              </div>

              <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          );
        })}
      </CardContent>
    </DashboardCard>
  );
}
