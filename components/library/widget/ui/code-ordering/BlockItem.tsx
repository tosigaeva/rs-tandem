import { CircleCheckBig, CircleX, GripVertical } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type BlockItemProperties = {
  code: string;
  order: number;
  isCorrect?: boolean | undefined;
};

export default function BlockItem({ code, order, isCorrect }: BlockItemProperties) {
  return (
    <div
      className={`bg-card border-border flex items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm ${
        isCorrect === true
          ? 'border-correct-answer bg-correct-answer-muted/25'
          : isCorrect === false
            ? 'border-wrong-answer bg-wrong-answer-muted/15'
            : 'bg-card cursor-grab'
      }`}
    >
      {isCorrect === true && <CircleCheckBig className="text-correct-answer h-4 w-4" />}
      {isCorrect === false && <CircleX className="text-wrong-answer h-4 w-4" />}
      {isCorrect == undefined && <GripVertical className="h-4 w-4 opacity-50" />}
      <SyntaxHighlighter
        language="javascript"
        style={oneLight}
        customStyle={{ padding: '0', fontSize: '14px', background: 'transparent' }}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
      <span className="text-muted-foreground ml-auto text-sm">{`#${order + 1}`}</span>
    </div>
  );
}
