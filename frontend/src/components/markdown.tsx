   // components/MarkdownRenderer.tsx
   import React from 'react';
   import MarkdownIt from 'markdown-it';

   const md = new MarkdownIt();

   interface MarkdownRendererProps {
     content: string;
   }

   const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
     const htmlContent = md.render(content);
     console.log(htmlContent);
     return (
       <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
     );
   };

   export default MarkdownRenderer;