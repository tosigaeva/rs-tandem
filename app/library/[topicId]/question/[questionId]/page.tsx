import { getQuestion } from '@/api/questions.api';
import Question from '@/components/library/widget/question';
import { getWidgetComponent } from '@/components/library/widget/widget-engine';

type PageProperties = {
  params: Promise<{ topicId: string; questionId: string }>;
};

export default async function Page({ params }: PageProperties) {
  const { topicId, questionId } = await params;

  const question = await getQuestion(topicId, questionId);
  if (!question) {
    return 'Question not found';
  }

  return <Question question={question} Component={getWidgetComponent(question.type)} />;
}
