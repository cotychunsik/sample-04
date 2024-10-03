'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostPage({ params }) { 
  const router = useRouter();
  const [post, setPost] = useState(null);
  const { id } = params; 

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = storedPosts[parseInt(id)];
    if (post) {
      setPost(post); // 게시글 데이터를 로드
    }
  }, [id]);

  const handleEditPost = () => {
    // BlogEditor로 postIndex 전달하여 수정 모드로 이동
    router.push(`/pages/BlogEditor?postIndex=${id}`);
  };

  const handleDeletePost = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    storedPosts.splice(parseInt(id), 1); // 게시글 삭제
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    router.push('/pages/Blog'); // 삭제 후 목록 페이지로 리다이렉트
  };

  if (!post) return <div>Loading...</div>; // 로딩 중 표시

  return (
    <div className='text-slate-100 w-screen'>
      <div className='mx-20'>
        <div className='py-2'>

      <h1 className='text-2xl'>{post.title}</h1>
      </div>
      <div className='border-t-2 border-slate-700 pt-4 font-light'>      
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>

      <div className="button-group mt-10 flex gap-4">
        <button onClick={handleEditPost} 
        className="btn-edit btn-normal ">수정하기</button>
        <button onClick={handleDeletePost} className="btn-delete btn-red">삭제하기</button>
      </div>
      
      </div>
    </div>
  );
}
