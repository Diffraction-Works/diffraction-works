"use client";

import { ReactNode, ElementType, ComponentPropsWithoutRef, forwardRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "blur-in"
  | "none";

interface ScrollRevealProps<T extends ElementType = "div"> {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  as?: T;
}

const animationStyles: Record<AnimationType, string> = {
  "fade-up": "translate-y-8 opacity-0",
  "fade-down": "-translate-y-8 opacity-0",
  "fade-left": "-translate-x-8 opacity-0",
  "fade-right": "translate-x-8 opacity-0",
  "scale-in": "scale-95 opacity-0",
  "blur-in": "blur-sm opacity-0",
  none: "",
};

export function ScrollReveal<T extends ElementType = "div">({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
  rootMargin = "0px",
  as,
}: ScrollRevealProps<T>) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const initialStyle = animationStyles[animation];
  const Component = as || "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        initialStyle,
        isInView && "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </Component>
  );
}


// Stagger container for multiple items
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  baseDelay = 0,
}: StaggerContainerProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        className
      )}
      style={{
        ["--stagger-delay" as string]: `${staggerDelay}ms`,
        ["--base-delay" as string]: `${baseDelay}ms`,
      }}
    >
      {isInView && children}
    </div>
  );
}

// Stagger item to be used inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  index: number;
  animation?: AnimationType;
  className?: string;
}

export function StaggerItem({
  children,
  index,
  animation = "fade-up",
  className,
}: StaggerItemProps) {
  const initialStyle = animationStyles[animation];

  return (
    <div
      className={cn(
        "transition-all will-change-transform animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards",
        className
      )}
      style={{
        animationDelay: `calc(var(--base-delay, 0ms) + ${index} * var(--stagger-delay, 100ms))`,
        animationDuration: "600ms",
        animationFillMode: "backwards",
      }}
    >
      {children}
    </div>
  );
}
