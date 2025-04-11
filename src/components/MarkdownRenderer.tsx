
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown 
      className="prose prose-headings:text-primary prose-h1:text-2xl prose-h2:text-xl prose-h3:font-semibold prose-h2:font-bold prose-p:text-base prose-p:leading-relaxed prose-li:text-base prose-li:leading-relaxed prose-strong:font-semibold prose-strong:text-foreground max-w-none"
      components={{
        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-primary mt-2" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 text-primary mt-5" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-4" {...props} />,
        p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-foreground/90" {...props} />,
        ul: ({node, ...props}) => <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />,
        ol: ({node, ...props}) => <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />,
        li: ({node, ...props}) => <li className="mb-1" {...props} />,
        blockquote: ({node, ...props}) => (
          <blockquote 
            className="pl-4 italic border-l-4 border-primary/30 my-4 text-muted-foreground"
            {...props} 
          />
        ),
        strong: ({node, ...props}) => (
          <strong className="font-semibold text-foreground" {...props} />
        ),
        em: ({node, ...props}) => (
          <em className="italic text-foreground/90" {...props} />
        ),
        code: ({node, inline, ...props}) => (
          inline ? 
            <code className="px-1 py-0.5 bg-muted rounded text-foreground/90 text-sm" {...props} /> : 
            <code className="p-3 bg-muted block rounded-md text-foreground/90 text-sm my-4 overflow-x-auto" {...props} />
        ),
        a: ({node, ...props}) => (
          <a 
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors" 
            target="_blank"
            rel="noopener noreferrer"
            {...props} 
          />
        ),
        hr: ({node, ...props}) => <hr className="my-8 border-muted" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
