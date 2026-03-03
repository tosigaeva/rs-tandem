import { WidgetComponent } from '@/components/library/widget/widget-engine';
import { QuestionPayload } from '@/types/question';

type QuestionProperties = {
  questionPayload: QuestionPayload;
  Component: WidgetComponent;
};

export default function Question({ questionPayload, Component }: QuestionProperties) {
  return <Component questionPayload={questionPayload} />;
}
