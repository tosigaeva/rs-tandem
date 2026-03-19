import { getQuestions } from '@/api/trainer.api';
import { getWidgetsByTopic } from '@/api/widget.api';
import DefaultRunner from '@/components/library/widget/runners/default/DefaultRunner';
import { SliderRunner } from '@/components/library/widget/runners/slider/SliderRunner';
import WidgetList from '@/components/WidgetList';
import { toWidgetFilter, WidgetType } from '@/types/widget';

type TopicContentProperties = {
  topicId: string;
  widgetType: string | undefined;
};

export default async function TopicContent({ topicId, widgetType }: TopicContentProperties) {
  const selectedFilter = toWidgetFilter(widgetType);

  if (selectedFilter === undefined) {
    const widgets = await getWidgetsByTopic(topicId);
    return <WidgetList widgets={widgets} topicId={topicId} />;
  }

  const questions = await getQuestions(topicId, selectedFilter);

  if (widgetType === WidgetType.FlipCard) {
    return <SliderRunner questions={questions} />;
  }

  return <DefaultRunner questions={questions} />;
}
