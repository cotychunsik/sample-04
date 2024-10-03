'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import Delta from 'quill'; // Quill의 Delta 기본 내보내기

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

// UnprivilegedEditor 타입 정의
interface UnprivilegedEditor {
  getContents: () => Delta;
}

export default function BlogEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postIndex = searchParams.get('postIndex');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  // Quill 에디터 변경 시 호출되는 함수의 타입을 명시적으로 설정
  const handleQuillChange = (
    value: string, // 에디터의 HTML 콘텐츠
    delta: Delta,  // 변경 사항
    source: string, // 변경의 출처 (user, api 등)
    editor: UnprivilegedEditor // Quill 에디터 인스턴스
  ) => {
    setContent(value);
    console.log(editor.getContents()); // Quill의 API를 사용할 수 있음
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
        {/* ref 대신 ReactQuill의 onChange 핸들러를 사용 */}
        <ReactQuill
          value={content}
          onChange={handleQuillChange} // Quill 에디터 내용 변경 시 핸들러
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
