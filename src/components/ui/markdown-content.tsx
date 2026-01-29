"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
    return (
        <div className={`prose prose-invert max-w-none prose-orange ${className}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
