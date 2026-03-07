import { WidgetComponent } from '@/components/library/widget/widget-engine';
import { QuestionPayload } from '@/types/question';

type QuestionProperties = {
  questionPayload: QuestionPayload;
  Component: WidgetComponent;
  onCheck: () => void;
};

export default function QuestionWrapper({ questionPayload, Component, onCheck }: QuestionProperties) {
  return <Component questionPayload={questionPayload} onCheck={onCheck} />;
}
