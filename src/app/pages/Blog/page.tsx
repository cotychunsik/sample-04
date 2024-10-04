'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ref, get, child } from 'firebase/database';
import { database } from '../../../../firebaseConfig'; // Firebase 설정 파일에서 database 가져오기

// 게시글의 타입 정의
interface Post {
  id: string;  // 게시글 ID 추가
  title: string;
  content: string;
}

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const dbRef = ref(database); // Firebase 데이터베이스 참조
    get(child(dbRef, 'blog')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const postsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] })); // ID를 포함한 객체로 변환
        setPosts(postsArray); // Firebase에서 가져온 데이터를 상태로 설정
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleWritePost = () => {
    router.push('/pages/BlogEditor');
  };

  const handleViewPost = (id: string) => {
    router.push(`/pages/Blog/${id}`); // 게시글 ID로 경로 이동
  };

  return (
    <div className='text-slate-200 w-screen mx-auto'>
      <div className='px-10'>
        <div className='py-4 border-b-2 border-sky-800'>
          <h1 className='text-3xl font-semibold text-gray-400'>Blog Articles</h1>
        </div>
        <ul className='pt-4'>
          {posts.map((post) => (
            <li key={post.id} onClick={() => handleViewPost(post.id)} className='mb-4'>
              <span className='text-slate-400 font-light'>Title | </span>
              <span className='cursor-pointer hover:text-sky-500'>{post.title}</span>
            </li>
          ))}
        </ul>
        <div className='flex justify-end'>
          <button onClick={handleWritePost} className='border-slate-200 border-2 py-2 px-4 rounded-md hover:border-sky-500'>
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
