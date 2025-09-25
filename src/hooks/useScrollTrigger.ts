import { useEffect, useRef, useState } from 'react';

export type ScrollTriggerOptions = {
  /** e.g. '0px 0px -100px 0px' */
  rootMargin?: string;
  /** single number or an array for fine-grained control */
  threshold?: number | number[];
  /** stop observing after it becomes visible once */
  once?: boolean;
};

export const useScrollTrigger = <T extends HTMLElement = HTMLElement>(
  options?: ScrollTriggerOptions
) => {
  const {
    rootMargin = '0px 0px -100px 0px',
    threshold = 0,
    once = true,
  } = options ?? {};

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0, // 50%見えたらtrue
        rootMargin: '0px 0px -10% 0px', // 画面下から20%分入ったら発火
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [rootMargin, threshold, once]);

  return { ref, isVisible };
};
