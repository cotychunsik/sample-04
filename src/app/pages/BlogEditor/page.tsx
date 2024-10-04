'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic'; // Next.js의 dynamic 함수
import { useSearchParams } from 'next/navigation';
import { ref, get, child, set } from 'firebase/database';
import { database } from '../../../../firebaseConfig';

// Quill 에디터를 동적으로 로드 (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); 

// export const dynamic = 'force-dynamic';  // 필요하다면 유지, 아니라면 제거 가능

export default function BlogEditor() {
  const searchParams = useSearchParams();
  const postIndex = searchParams.get('postIndex');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (postIndex !== null) {
      const dbRef = ref(database);
      get(child(dbRef, `blog/${postIndex}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const postData = snapshot.val();
            setTitle(postData.title);
            setContent(postData.content);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [postIndex]);

  const handleSavePost = () => {
    const newPost = { title, content };
    const postId = postIndex || Date.now().toString();

    set(ref(database, 'blog/' + postId), newPost)
      .then(() => {
        console.log('Post saved successfully');
      })
      .catch((error) => {
        console.error("Error saving post: ", error);
      });
  };

  return (
        <Suspense fallback={<div>Loading...</div>}>

    <div>
      <h1>{postIndex !== null ? '게시글 수정' : '새 게시글 작성'}</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
      />
      <button onClick={handleSavePost}>
        {postIndex !== null ? '수정하기' : '게시하기'}
      </button>
    </div>
    </Suspense>
  );
}
