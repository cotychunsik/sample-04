'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';

// Quill Editor 로드
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// 툴바 옵션 설정
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']
];

export default function BlogEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postIndex = searchParams.get('postIndex');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    if (postIndex !== null) {
      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const post = storedPosts[parseInt(postIndex)];
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [postIndex]);

  const handleSavePost = () => {
    const newPost = { title, content };
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');

    if (postIndex !== null) {
      storedPosts[parseInt(postIndex)] = newPost;
    } else {
      storedPosts.push(newPost);
    }

    localStorage.setItem('posts', JSON.stringify(storedPosts));
    router.push('/pages/Blog');
  };

  return (
    <div className=''>
      <h1>{postIndex !== null ? '게시글 수정' : '새 게시글 작성'}</h1>
      <input 
        type="text" 
        placeholder="제목" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className='w-full'
      />
      <div className='bg-slate-100'>
        <ReactQuill 
          ref={editorRef} // 에디터 참조 추가
          value={content} 
          onChange={setContent} 
          modules={{ toolbar: toolbarOptions }} 
        />
      </div>
      <div className='mt-6'>
        <button onClick={handleSavePost} className='text-slate-200 btn-normal'>
          {postIndex !== null ? '수정하기' : '게시하기'}
        </button>
      </div>
    </div>
  );
}
