import { ComponentType, lazy, Suspense, useEffect, useRef, useState } from 'react';

// Lazy loading wrapper with error boundary
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = lazy(importFunc);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    const FallbackComponent = fallback || DefaultFallback;
    return (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Default fallback component
function DefaultFallback() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

// Preload function for critical components
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return () => {
    importFunc().catch(error => {
      console.warn('Failed to preload component:', error);
    });
  };
}

// Dynamic import with retry logic
export function dynamicImportWithRetry<T>(
  importFunc: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const attemptImport = (attempt: number) => {
      importFunc()
        .then(resolve)
        .catch(error => {
          if (attempt < retries) {
            console.warn(`Import attempt ${attempt + 1} failed, retrying...`, error);
            setTimeout(() => attemptImport(attempt + 1), delay * attempt);
          } else {
            reject(error);
          }
        });
    };
    
    attemptImport(0);
  });
}

// Route-based code splitting
export const LazyRoutes = {
  ContentManager: createLazyComponent(
    () => import('@/components/ContentManager'),
    () => <ContentManagerSkeleton />
  ),
  ProjectDetail: createLazyComponent(
    () => import('@/components/ProjectDetail'),
    () => <ProjectDetailSkeleton />
  ),
  CaseStudy: createLazyComponent(
    () => import('@/components/CaseStudy'),
    () => <CaseStudySkeleton />
  ),
  GitHubShields: createLazyComponent(
    () => import('@/components/GitHubShields'),
    () => <GitHubShieldsSkeleton />
  ),
  DocsLink: createLazyComponent(
    () => import('@/components/DocsLink'),
    () => <DocsLinkSkeleton />
  ),
};

// Skeleton components for better UX
function ContentManagerSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div>
                  <div className="h-5 w-64 mb-2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-1">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function CaseStudySkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-wrap gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GitHubShieldsSkeleton() {
  return (
    <div className="flex gap-2">
      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
      <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

function DocsLinkSkeleton() {
  return <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />;
}

// Preload critical components on hover
export function usePreloadOnHover(importFunc: () => Promise<any>) {
  const preload = () => {
    importFunc().catch(() => {
      // Silently fail
    });
  };

  return {
    onMouseEnter: preload,
    onFocus: preload,
  };
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  threshold: number = 0.1,
  rootMargin: string = '50px'
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsIntersecting(true);
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isIntersecting, hasIntersected };
}
