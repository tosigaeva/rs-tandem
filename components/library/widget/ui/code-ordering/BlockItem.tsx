import { GripVertical } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type BlockItemProperties = {
  code: string;
  order: number;
};

export default function BlockItem({ code, order }: BlockItemProperties) {
  return (
    <div className="bg-card border-border flex cursor-grab items-center gap-2 rounded-md border px-3 py-3 text-sm shadow-sm">
      <GripVertical className="h-4 w-4 opacity-50" />
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
