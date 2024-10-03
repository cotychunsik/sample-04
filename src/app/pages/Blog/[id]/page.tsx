'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  title: string;
  content: string;
}

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null); // Post 타입 또는 null

  const { id } = params;

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const post = storedPosts[parseInt(id)];
    setPost(post);
  }, [id]);

  const handleEditPost = () => {
    router.push(`/pages/BlogEditor?postIndex=${id}`);
  };

  const handleDeletePost = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    storedPosts.splice(parseInt(id), 1);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    router.push('/pages/Blog');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className='text-slate-100'>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <div className="button-group">
        <button onClick={handleEditPost} className="btn-edit">수정하기</button>
        <button onClick={handleDeletePost} className="btn-delete">삭제하기</button>
      </div>
    </div>
  );
}
