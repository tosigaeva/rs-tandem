import { getFlipQuestions } from '@/api/trainer.api';
import { SliderQuestionRunner } from '@/components/library/widget/runners/slider/SliderQuestionRunner';

export default function Page() {
  const questions = getFlipQuestions();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SliderQuestionRunner questions={questions} />
    </div>
  );
}
