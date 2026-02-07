"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefault?: boolean;
}

interface SwipeReturn<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>;
  swipeDirection: "left" | "right" | "up" | "down" | null;
  isSwiping: boolean;
}

export function useSwipe<T extends HTMLElement = HTMLDivElement>(
  options: SwipeOptions = {}
): SwipeReturn<T> {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventDefault = true,
  } = options;

  const ref = useRef<T>(null);
  const [swipeDirection, setSwipeDirection] = useState<
    "left" | "right" | "up" | "down" | null
  >(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
    setIsSwiping(true);
    setSwipeDirection(null);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      touchEndY.current = e.changedTouches[0].screenY;
      setIsSwiping(false);

      const deltaX = touchEndX.current - touchStartX.current;
      const deltaY = touchEndY.current - touchStartY.current;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine if horizontal or vertical swipe
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (absDeltaX > threshold) {
          if (deltaX > 0) {
            setSwipeDirection("right");
            onSwipeRight?.();
          } else {
            setSwipeDirection("left");
            onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (absDeltaY > threshold) {
          if (deltaY > 0) {
            setSwipeDirection("down");
            onSwipeDown?.();
          } else {
            setSwipeDirection("up");
            onSwipeUp?.();
          }
        }
      }
    },
    [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (preventDefault) {
        // Prevent default only for horizontal swipes to allow scrolling
        const currentX = e.changedTouches[0].screenX;
        const currentY = e.changedTouches[0].screenY;
        const deltaX = Math.abs(currentX - touchStartX.current);
        const deltaY = Math.abs(currentY - touchStartY.current);

        if (deltaX > deltaY && deltaX > 10) {
          e.preventDefault();
        }
      }
    },
    [preventDefault]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchStart, handleTouchEnd, handleTouchMove]);

  return { ref, swipeDirection, isSwiping };
}

// Hook for carousel navigation with swipe
export function useCarouselSwipe(itemCount: number, onIndexChange?: (index: number) => void) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev >= itemCount - 1 ? 0 : prev + 1;
      onIndexChange?.(next);
      return next;
    });
  }, [itemCount, onIndexChange]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev <= 0 ? itemCount - 1 : prev - 1;
      onIndexChange?.(next);
      return next;
    });
  }, [itemCount, onIndexChange]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index);
      onIndexChange?.(index);
    }
  }, [itemCount, onIndexChange]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    threshold: 50,
  });

  return {
    currentIndex,
    goToNext,
    goToPrev,
    goToIndex,
    swipeHandlers,
  };
}
