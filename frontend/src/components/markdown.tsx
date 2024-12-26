   // components/MarkdownRenderer.tsx
   import React from 'react';
   import ReactMarkdown from 'react-markdown';
   import remarkGfm from 'remark-gfm';

   interface MarkdownRendererProps {
     content: string;
   }

   const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
     return (
       <div className="prose max-w-none">
         <ReactMarkdown remarkPlugins={[remarkGfm]}>
           {content}
         </ReactMarkdown>
       </div>
     );
   };

   export default MarkdownRenderer;