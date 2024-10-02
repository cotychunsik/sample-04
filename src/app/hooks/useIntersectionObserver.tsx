'use client';
import { useEffect, useRef, useState, MutableRefObject } from "react";

const useIntersectionObserver = (
  options: IntersectionObserverInit
): [MutableRefObject<null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // 한 번만 관찰
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [ref, isVisible];
};

export default useIntersectionObserver;
