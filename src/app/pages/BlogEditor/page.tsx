'use client'; // Ensure the entire component is client-side

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ref, get, child, set } from 'firebase/database';
import { database } from '../../../../firebaseConfig';

export const dynamic = 'force-dynamic'; // Force client-side rendering

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
    const postId = postIndex || Date.now().toString(); // If editing, keep same ID, otherwise create new ID

    set(ref(database, 'blog/' + postId), newPost)
      .then(() => {
        console.log('Post saved successfully');
      })
      .catch((error) => {
        console.error("Error saving post: ", error);
      });
  };

  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <div>
        <h1>{postIndex !== null ? '게시글 수정' : '새 게시글 작성'}</h1>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSavePost}>
          {postIndex !== null ? '수정하기' : '게시하기'}
        </button>
      </div>
    </Suspense>
  );
}
