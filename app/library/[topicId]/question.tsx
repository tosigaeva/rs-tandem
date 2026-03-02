import WidgetCard from '@/components/library/widget-card';
import {Widget, WidgetType} from '@/types/widget';
import {Routes} from "@/lib/routes";
import Link from "next/link";
import {getQuestion} from "@/app/library/[topicId]/widget/[widgetId]/page";
import {renderWidget, widgetLoaders} from "@/components/library/widget/widget-engine";
import {mapToLocale, parseEnum} from "@/app/library/[topicId]/question/[questionId]/page";
import {useEffect, useState} from "react";

type WidgetListProperties = {
  widget: any;
};

export default function Question({ widget }: WidgetListProperties) {
  // return renderWidget(widget, () => {});
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    const loader = widgetLoaders.get(widget.type);

    if (!loader) {
      throw new Error(`Unknown widget type: ${widget.type}`);
    }

    loader().then((module) => {
      setComponent(() => module.default);
    });

  }, [widget]);

  if (!Component) {
    return <div>Loading widget...</div>;
  }

  return <Component widget={widget}></Component>;
}

