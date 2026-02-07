# Implementation Plan

## Overview
Transform the Diffraction Works portfolio into a highly responsive and interactive experience by implementing scroll-triggered animations, enhanced hover effects, theme toggle, loading states, and touch gesture support.

## Current State Analysis
- Next.js 15.5.9 with React 19.2.1
- Tailwind CSS with dark mode already configured
- shadcn/ui components installed
- Basic fade-in animation exists in globals.css
- Mobile navigation already implemented
- use-mobile hook exists for responsive detection

## Types
New TypeScript interfaces and types for animation and theme systems.

```typescript
// src/hooks/use-scroll-animation.ts
interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  hasAnimated: boolean;
}

// src/components/ThemeProvider.tsx
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

// src/hooks/use-swipe.ts
interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

interface SwipeReturn {
  ref: React.RefObject<HTMLElement>;
  swipeDirection: 'left' | 'right' | 'up' | 'down' | null;
}
```

## Files

### New Files to Create
- `src/hooks/use-scroll-animation.ts` - Intersection Observer hook for scroll animations
- `src/components/ScrollReveal.tsx` - Reusable scroll reveal wrapper component
- `src/components/ThemeProvider.tsx` - Theme context provider with next-themes pattern
- `src/components/ThemeToggle.tsx` - Toggle button with sun/moon icons
- `src/components/ui/skeleton-card.tsx` - Project card skeleton loader
- `src/components/ui/skeleton-hero.tsx` - Hero section skeleton loader
- `src/components/PageLoader.tsx` - Full page loading transition
- `src/hooks/use-swipe.ts` - Swipe gesture detection hook
- `src/components/MobileCarousel.tsx` - Swipeable project carousel for mobile

### Existing Files to Modify
- `src/app/layout.tsx` - Add ThemeProvider wrapper, remove hardcoded dark class
- `src/app/globals.css` - Add new keyframe animations (pulse, glow, float, slide)
- `src/components/Hero.tsx` - Add parallax background effects, scroll animations
- `src/components/ProjectShowcase.tsx` - Staggered card reveal animations, mobile carousel
- `src/components/ProjectCard.tsx` - Magnetic hover effect, glow borders, scale transforms
- `src/components/PhotographyFeed.tsx` - Fade-in animations, loading placeholders
- `src/components/ContactSection.tsx` - Slide-in animations for content sections
- `src/components/Navigation.tsx` - Link hover underline animations, theme toggle button
- `src/components/Footer.tsx` - Social icon bounce effects

## Functions

### New Functions
- `useScrollAnimation(options)` - Returns ref and animation state for scroll-triggered animations
- `useSwipe(options)` - Returns ref and swipe direction for touch gestures
- `ThemeProvider({ children })` - Provides theme context to entire app
- `ThemeToggle()` - Renders theme toggle button with icons
- `ScrollReveal({ children, animation, delay })` - Wrapper component for scroll animations
- `MobileCarousel({ items })` - Renders swipeable carousel for mobile
- `SkeletonCard()` - Renders project card skeleton
- `SkeletonHero()` - Renders hero section skeleton
- `PageLoader()` - Renders full-page loading transition

### Modified Functions
- `Navigation()` - Add theme toggle button, improve mobile menu transitions
- `Hero()` - Add parallax effects, entrance animations
- `ProjectCard()` - Add magnetic hover, glow effects, improved transitions
- `ProjectShowcase()` - Add scroll-triggered stagger animations
- `PhotographyFeed()` - Add loading states, fade-in animations
- `ContactSection()` - Add slide-in animations on scroll

## Classes

### New Classes (Tailwind/CSS)
- `.animate-slide-up` - Slide up animation
- `.animate-slide-in-left` - Slide in from left
- `.animate-slide-in-right` - Slide in from right
- `.animate-scale-in` - Scale up animation
- `.animate-glow` - Glow pulse animation
- `.animate-float` - Floating animation
- `.magnetic-hover` - Magnetic cursor follow effect
- `.card-glow` - Card glow on hover

### Modified Classes
- `.fade-in` - Enhanced with transform and timing options
- Navigation link classes - Add underline animation
- Project card classes - Add hover transforms and glow

## Dependencies
No new dependencies required - using existing:
- `tailwindcss-animate` for animations
- `lucide-react` for icons
- Radix UI primitives for accessibility
- Native Intersection Observer API
- Native matchMedia API for theme

## Testing
- Verify scroll animations trigger at correct thresholds
- Test theme toggle persists across page reloads (localStorage)
- Check skeleton states render correctly during loading
- Validate touch gestures work on mobile (swipe detection)
- Ensure all hover effects work smoothly on desktop
- Test reduced motion preferences (accessibility)
- Verify no layout shift during animations

## Implementation Order
1. Create utility hooks (use-scroll-animation, use-swipe)
2. Add theme system (ThemeProvider, ThemeToggle, update layout)
3. Implement scroll animations (ScrollReveal component, update sections)
4. Add loading states (skeleton components)
5. Enhance hover effects (update cards, navigation, footer)
6. Add touch gestures (mobile carousel)
7. Final responsive polish across all components
