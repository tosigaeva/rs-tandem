import { ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import Link from 'next/link';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Routes } from '@/lib/routes';

type ConfirmStartOverProperties = {
  setStartOverCheck: (boolean: boolean) => void;
  totalLength: number;
};

export default function Results({ setStartOverCheck, totalLength }: ConfirmStartOverProperties) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-xl p-4">
      <Card className="text-center">
        <CardHeader>
          <Trophy className="text-primary mx-auto mb-4 h-12 w-12" />
          <CardTitle className="text-2xl">{t('results.start-over.title')}</CardTitle>
          <CardDescription className="mt-2">{t('results.start-over.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg">
            {t('results.start-over.total-questions')}: <strong>{totalLength}</strong>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <PrimaryButton asChild variant="outline" className="mt-4 flex-1 py-6">
          <Link href={Routes.Library}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('results.backToLibrary')}
          </Link>
        </PrimaryButton>
        <PrimaryButton variant="secondary" className="mt-4 flex-1 py-6" onClick={() => setStartOverCheck(true)}>
          <RefreshCw className="mr-2 h-4 w-4" /> {t('results.startOver')}
        </PrimaryButton>
      </div>
    </section>
  );
}
