import { CircleCheck, CircleCheckBig, CircleX, GripVertical } from 'lucide-react';

type BlockItemProperties = {
  code: string;
  label: string;
  isCorrect?: boolean | null;
};

export function BlockItem({ code, label, isCorrect }: BlockItemProperties) {
  return (
    <div
      className={`bg-card border-border flex cursor-grab items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm transition hover:shadow-md ${
        isCorrect === true
          ? 'border-correct-answer bg-correct-answer-muted/25'
          : isCorrect === false
            ? 'border-wrong-answer bg-wrong-answer-muted/15'
            : 'bg-card'
      }`}
    >
      {isCorrect === true && <CircleCheckBig className="text-correct-answer h-4 w-4" />}
      {isCorrect === false && <CircleX className="text-wrong-answer h-4 w-4" />}
      {isCorrect == undefined && <GripVertical className="h-4 w-4 opacity-50" />}
      <span>{code}</span>
      <span className="text-muted-foreground ml-auto">{`#${label}`}</span>
    </div>
  );
}
