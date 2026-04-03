import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { AllWidget, Widget } from '@/types/schemas/widget-schema';

type WidgetCardProperties = {
  widget: Widget | AllWidget;
};

export default function WidgetCard({ widget }: WidgetCardProperties) {
  const { translate } = useTranslation();

  return (
    <Card className="group flex cursor-pointer flex-row items-center gap-4 px-4 transition-all duration-300 ease-out">
      <span className="bg-secondary flex h-17 w-24 items-center justify-center rounded-xl text-3xl font-light">
        {widget.icon}
      </span>
      <CardHeader className="w-full px-0 py-2">
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {translate(widget.name)}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm">{translate(widget.description)}</CardDescription>
      </CardHeader>
    </Card>
  );
}
