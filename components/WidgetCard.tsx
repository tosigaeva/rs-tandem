import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getWidgetIcon } from '@/lib/widget-icon';
import { AllWidget, Widget } from '@/types/widget';

type WidgetCardProperties = {
  widget: Widget | AllWidget;
};

export default function WidgetCard({ widget }: WidgetCardProperties) {
  const icon = getWidgetIcon(widget.type);

  return (
    <Card className="group hover:ring-primary/40 hover:ring-offset-background flex cursor-pointer flex-row items-center gap-4 px-4 transition-all duration-300 ease-out hover:shadow-lg hover:ring-2 hover:ring-offset-2">
      <span className="bg-secondary flex h-17 w-24 items-center justify-center rounded-xl text-3xl font-light">
        {icon}
      </span>
      <CardHeader className="w-full px-0 py-2">
        <CardTitle className="group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
          {widget.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-sm" title={widget.description}>
          {widget.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
