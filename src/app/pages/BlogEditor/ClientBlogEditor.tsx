'use client'; // 클라이언트 전용 컴포넌트로 명시

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { ref, get, child, set } from 'firebase/database';
import { database } from '../../../../firebaseConfig';
import 'react-quill/dist/quill.snow.css';


// Quill 에디터를 동적으로 로드 (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Quill CSS 로드

export default function ClientBlogEditor() {
  const searchParams = useSearchParams();
  const postIndex = searchParams.get('postIndex');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  // 툴바 옵션 설정
  const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ];

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
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [postIndex]);

  // Handle editor changes (captures HTML content)
  const handleEditorChange = (content: string) => {
    setContent(content); // content includes HTML format
  };

  const handleSavePost = () => {
    const newPost = { title, content };
    const postId = postIndex || Date.now().toString();

    set(ref(database, 'blog/' + postId), newPost)
      .then(() => {
        console.log('Post saved successfully');
        router.push('/pages/Blog');
      })
      .catch((error) => {
        console.error('Error saving post: ', error);
      });
  };

  return (
    <div className='w-screen'>
        <div className='px-10 sm:px-20 md:px-40 lg:px-96'>
            <div>
      <h1>{postIndex !== null ? '게시글 수정' : '새 게시글 작성'}</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full'
      />
      </div>
      <div className='bg-slate-200 mb-10'>
        <ReactQuill
            value={content}
            onChange={handleEditorChange}  // Updated to use handleEditorChange
            theme="snow"
            modules={{ toolbar: toolbarOptions }} // 툴바 옵션 설정
        />
      </div>
      <div className='flex justify-end'>
      <button onClick={handleSavePost} className='btn-normal text-slate-200'>
        {postIndex !== null ? '수정하기' : '게시하기'}
      </button>
      </div>
      </div>
    </div>
  );
}
