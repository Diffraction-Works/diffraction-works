import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="overflow-hidden bg-card border-border">
      {/* Image skeleton */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0" />
        
        {/* Overlay buttons skeleton */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* GitHub link skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-3 w-48" />
        </div>
        
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-3 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-3 w-4" />
          </div>
        </div>
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  );
}

// Multiple skeleton cards for grid loading
export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
