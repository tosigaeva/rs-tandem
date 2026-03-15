import { getFlipQuestions } from '@/api/trainer.api';
import { SliderQuestionRunner } from '@/components/library/widget/runners/slider/SliderQuestionRunner';

export default async function Page() {
  const questions = await getFlipQuestions('1');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SliderQuestionRunner questions={questions} />
    </div>
  );
}
