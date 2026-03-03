import { QuizWidget } from '@/components/library/widget/quiz-widget/type';
import { WidgetComponent } from '@/components/library/widget/widget-engine';
import { Question as QuestionType } from '@/types/question';

type QuestionProperties = {
  question: QuestionType;
  Component: WidgetComponent;
};

export default function Question({ question, Component }: QuestionProperties) {
  const widget: QuizWidget = {
    type: question.type,
    payload: question.payload,
  };

  return <Component widget={widget} />;
}
