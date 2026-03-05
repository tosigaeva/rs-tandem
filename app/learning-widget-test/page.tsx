import { getMockQuestions } from '@/api/learning-questions.mock';
import { LearningWidget } from '@/components/widgets/learning-widget/widget';

export default function Page() {
  const questions = getMockQuestions();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LearningWidget questions={questions} />
    </div>
  );
}
