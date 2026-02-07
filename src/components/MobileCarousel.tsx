"use client";

import { ReactNode, useState, useCallback } from "react";
import { useCarouselSwipe } from "@/hooks/use-swipe";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function MobileCarousel<T>({
  items,
  renderItem,
  className,
  showDots = true,
  showArrows = true,
}: MobileCarouselProps<T>) {
  const { currentIndex, goToNext, goToPrev, goToIndex, swipeHandlers } =
    useCarouselSwipe(items.length);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Only use the ref from swipeHandlers, not the state props
  const { ref } = swipeHandlers;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >

      {/* Carousel track */}
      <div
        className="flex transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 px-2"
            style={{ touchAction: "pan-y pinch-zoom" }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-lg opacity-0 sm:opacity-100 transition-opacity"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-lg opacity-0 sm:opacity-100 transition-opacity"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}

      {/* Swipe hint for mobile */}
      <div className="sm:hidden text-center mt-4 text-xs text-muted-foreground/60">
        <span className="inline-flex items-center gap-1">
          <ChevronLeft className="w-3 h-3" />
          Swipe to navigate
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

// Simpler card carousel specifically for project cards
interface ProjectCarouselProps {
  children: ReactNode[];
  className?: string;
}

export function ProjectCarousel({ children, className }: ProjectCarouselProps) {
  return (
    <MobileCarousel
      items={children.map((child, i) => ({ id: i, content: child }))}
      renderItem={(item) => item.content}
      className={className}
    />
  );
}
