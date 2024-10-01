'use client';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  start: number;
  end: number;
  duration: number;
  className?: string; // Tailwind CSS 또는 추가 스타일링을 위한 클래스
}

export default function CountUp({ start, end, duration, className }: CountUpProps) {
  const countRef = useRef<HTMLDivElement>(null);

  const animateValue = (start: number, end: number, duration: number) => {
    const element = countRef.current;
    if (!element) return;

    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start).toString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    animateValue(start, end, duration);
  }, [start, end, duration]);

  return <div ref={countRef} className={className}>{start}</div>;
}
