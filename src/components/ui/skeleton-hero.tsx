import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background skeleton elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-muted/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-muted/30 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title skeleton */}
          <div className="space-y-2 mb-6">
            <Skeleton className="h-16 md:h-20 w-3/4 mx-auto" />
            <Skeleton className="h-16 md:h-20 w-1/2 mx-auto" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2 mb-10 max-w-2xl mx-auto">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6 mx-auto" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-48 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
