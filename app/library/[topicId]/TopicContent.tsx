import { getQuestions } from '@/api/trainer.api';
import { getWidgetsByTopic } from '@/api/widget.api';
import QuestionsRunner from '@/components/library/widget/runners/default/QuestionRunner';
import WidgetList from '@/components/WidgetList';
import { toWidgetFilter } from '@/types/widget';

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
  return <QuestionsRunner questions={questions} />;
}
