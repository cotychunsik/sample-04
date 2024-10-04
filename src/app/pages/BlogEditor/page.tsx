'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ref, get, child, set } from 'firebase/database';
import { database } from '../../../../firebaseConfig';

export default function BlogEditor() {
  // useSearchParams를 컴포넌트 최상단에서 호출
  const searchParams = useSearchParams();
  const postIndex = searchParams.get('postIndex'); // 클라이언트에서 검색 매개변수를 가져옴

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
  }, [postIndex]); // postIndex가 변경될 때만 실행

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
