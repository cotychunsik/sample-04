'use client'; // 이 페이지가 클라이언트 컴포넌트임을 명시

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ref, get, child, set } from 'firebase/database';
import { database } from '../../../../firebaseConfig';

export default function BlogEditor() {
  const searchParams = useSearchParams(); // 클라이언트 사이드에서만 사용
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
    const postId = postIndex || Date.now().toString(); // 새 글이면 ID 생성

    set(ref(database, 'blog/' + postId), newPost)
      .then(() => {
        console.log('Post saved successfully');
      })
      .catch((error) => {
        console.error("Error saving post: ", error);
      });
  };

  return (
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
  );
}
