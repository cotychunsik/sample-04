import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClientBlogEditor = dynamic(() => import('./ClientBlogEditor'), { ssr: false });

export default function BlogEditor() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <ClientBlogEditor />
    </Suspense>
  );
}
