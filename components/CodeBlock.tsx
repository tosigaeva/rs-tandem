'use client';

import { ElementType } from 'domelementtype';
import { DOMNode } from 'html-dom-parser';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Properties = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

export default function CodeBlock({ code, language = 'javascript', showLineNumbers = true }: Properties) {
  const [copied, setCopied] = useState(false);

  const copyCode = async (copiedCode: string) => {
    await navigator.clipboard.writeText(copiedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const options = {
    replace(domNode: DOMNode) {
      if (domNode.type === ElementType.Tag && domNode.name === 'code') {
        const childElement = domNode.children?.[0];
        if (childElement.type !== ElementType.Text) return;

        const textToReplace = childElement.data || '';

        return (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => copyCode(textToReplace)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontSize: 12,
                padding: '4px 8px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
            <SyntaxHighlighter
              language={language}
              style={oneLight}
              showLineNumbers={showLineNumbers}
              wrapLines
              customStyle={{
                borderRadius: '10px',
                padding: '20px',
                fontSize: '14px',
                overflowX: 'auto',
                marginTop: '16px',
              }}
            >
              {textToReplace}
            </SyntaxHighlighter>
          </div>
        );
      }
    },
  };

  return <div>{parse(code, options)}</div>;
}
