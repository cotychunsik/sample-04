'use client';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  start: number;
  end: number;
  duration: number;
  className?: string; // Tailwind CSS 또는 추가 스타일링을 위한 클래스
}

export default function CountUp({ start, end, duration, className }: CountUpProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false); // 컴포넌트가 뷰포트에 들어왔는지 여부를 확인하는 상태

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true); // 뷰포트에 들어오면 애니메이션 시작
        observer.disconnect(); // 애니메이션 시작 후 관찰 해제
      }
    });

    if (countRef.current) {
      observer.observe(countRef.current); // ref가 연결된 요소 감시 시작
    }

    return () => {
      if (observer && countRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const animateValue = (start: number, end: number, duration: number) => {
    const element = countRef.current;
    if (!element) return;

    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Check if element is still not null
      if (element) {
        element.textContent = Math.floor(progress * (end - start) + start).toString();
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  };

  // isVisible이 true가 되면 애니메이션 시작
  useEffect(() => {
    if (isVisible) {
      animateValue(start, end, duration);
    }
  }, [isVisible, start, end, duration]);

  return <div ref={countRef} className={className}>{start}</div>;
}
