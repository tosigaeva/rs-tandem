import { CheckIcon } from 'lucide-react';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { getWidgetIcon } from '@/lib/widget-icon';
import { AllWidget, WidgetOverview } from '@/types/schemas/widget-schema';

type WidgetCardProperties = {
  widget: WidgetOverview | AllWidget;
};

export default function WidgetCard({ widget }: WidgetCardProperties) {
  const { t, translate } = useTranslation();
  const icon = getWidgetIcon(widget.type);

  const isComplete = widget.totalQuestions > 0 && widget.correctAnswers === widget.totalQuestions;

  return (
    <Card
      className={cn(
        'group relative flex cursor-pointer flex-row items-start gap-4 px-4 transition-all duration-300 ease-out hover:shadow-lg hover:ring-2 hover:ring-offset-2',
        isComplete
          ? 'border-correct-answer/80 hover:ring-correct-answer'
          : 'hover:ring-primary/40 hover:ring-offset-background'
      )}
    >
      {isComplete && (
        <div className="border-background absolute -top-2 -right-2 rounded-full border-2 bg-amber-500 p-1 text-white shadow-sm">
          <CheckIcon className="size-3 stroke-3" />
        </div>
      )}
      <span className="bg-secondary flex h-17 w-24 items-center justify-center rounded-xl text-3xl font-light">
        {icon}
      </span>
      <CardHeader className="w-full px-0 py-2">
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {translate(widget.name)}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm" title={translate(widget.description)}>
          {translate(widget.description)}
        </CardDescription>
        <CardFooter className="p-0 pr-2">
          <div className="flex w-full items-center justify-end gap-2 text-xs">
            <span className="text-muted-foreground">
              {t('library.card.questions')}: {widget.correctAnswers}/{widget.totalQuestions}
            </span>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
