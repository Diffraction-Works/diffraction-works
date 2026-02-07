"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ScrollAnimationReturn<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>;
  isInView: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
): ScrollAnimationReturn<T> {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsInView(true);
        setHasAnimated(true);
        
        if (triggerOnce && ref.current) {
          observerRef.current?.unobserve(ref.current);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isInView, hasAnimated };
}

// Hook for staggered animations
export function useStaggerAnimation(
  itemCount: number,
  baseDelay: number = 100
) {
  return Array.from({ length: itemCount }, (_, i) => ({
    delay: i * baseDelay,
  }));
}
