'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 게시글의 타입 정의
interface Post {
  title: string;
  content: string;
}

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]); // posts의 타입을 Post 배열로 설정

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  const handleWritePost = () => {
    router.push('/pages/BlogEditor');
  };

  const handleViewPost = (index: number) => {
    router.push(`/pages/Blog/${index}`);
  };

  return (
    <div className='text-slate-200 w-screen mx-auto'>
        <div className='px-10'>
        <div className='py-4 border-b-2 border-sky-800'>
      <h1 className='text-3xl font-semibold text-gray-400'>Blog Articles</h1>
      </div>
      <ul className='pt-4'>
        {posts.map((post, index) => (
          <li key={index} onClick={() => handleViewPost(index)} className='mb-4'>
            <span className='text-slate-400 font-light'>Title | </span>
            <span className='cursor-pointer hover:text-sky-500'>{post.title}</span>
          </li>
        ))}
      </ul>
      <div className='flex justify-end'>
      <button onClick={handleWritePost} className='border-slate-200 border-2 py-2 px-4 rounded-md hover:border-sky-500'>글쓰기</button>
      </div>
      </div>
    </div>
  );
}
