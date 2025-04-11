
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown className="prose max-w-none">
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
