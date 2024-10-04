'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // 라우터 이동에 필요
import { ref, get, child, remove } from 'firebase/database'; // Firebase 관련 함수들 가져오기
import { database } from '../../../../../firebaseConfig'; // Firebase 설정 파일에서 database 가져오기

interface Post {
  id: string;  // 게시글 ID를 상태로 관리
  title: string;
  content: string;
}

export default function PostPage() {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null); // 게시글 상태
  const [postId, setPostId] = useState<string | null>(null); // 게시글 ID 상태

  useEffect(() => {
    // 예시: 데이터베이스에서 ID를 가져오는 로직
    const dbRef = ref(database);
    
    // 모든 게시글을 가져와서 첫 번째 게시글을 가져온다고 가정 (예시)
    get(child(dbRef, 'blog')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const firstPostId = Object.keys(data)[0]; // 첫 번째 게시글의 ID 가져오기 (예시)
        const firstPost = data[firstPostId];
        
        setPostId(firstPostId); // 첫 번째 게시글의 ID를 상태로 설정
        setPost({ id: firstPostId, ...firstPost }); // 게시글 정보 설정
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleEditPost = () => {
    if (postId) {
      router.push(`/pages/BlogEditor?postIndex=${postId}`); // 수정 페이지로 이동
    }
  };

  const handleDeletePost = () => {
    if (postId) {
      const postRef = ref(database, `blog/${postId}`);
      remove(postRef) // 게시글 삭제
        .then(() => {
          console.log("Post deleted successfully");
          router.push('/pages/Blog'); // 삭제 후 목록으로 이동
        })
        .catch((error) => {
          console.error("Error deleting post: ", error);
        });
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className='text-slate-100 w-screen'>
      <div className='px-10 sm:px-20 md:px-40 lg:px-80' >
        <div className='py-5 border-b-2 border-slate-600 font-semibold text-xl'>
          <h1>{post.title}</h1>
        </div>
        <div className='py-3 font-light border-b-2 border-slate-600'>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
      <div className="button-group pt-4 flex gap-5 justify-end">
        <button onClick={handleEditPost} className="btn-edit btn-normal">수정하기</button>
        <button onClick={handleDeletePost} className="btn-delete btn-red">삭제하기</button>
      </div>
      </div>
      
    </div>
  );
}
