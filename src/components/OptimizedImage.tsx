'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined);

  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400',
          className
        )}
        style={{ width, height }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={fill ? undefined : { width, height }}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          {...(fill ? { fill: true } : { width: width!, height: height! })}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          {...(placeholder === 'blur' && defaultBlurDataURL ? { blurDataURL: defaultBlurDataURL } : {})}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
      
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
}

// Preload critical images
export function preloadImage(src: string) {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
}

// Image optimization utilities
export function getOptimizedImageUrl(
  src: string,
  width: number,
  height?: number,
  quality: number = 85
): string {
  // For external images, use Next.js Image Optimization API
  if (src.startsWith('http')) {
    const params = new URLSearchParams({
      url: src,
      w: width.toString(),
      q: quality.toString(),
    });
    
    if (height) {
      params.set('h', height.toString());
    }
    
    return `/_next/image?${params.toString()}`;
  }
  
  return src;
}

// Responsive image sizes
export const RESPONSIVE_SIZES = {
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
  thumbnail: '(max-width: 768px) 50vw, 25vw',
  avatar: '(max-width: 768px) 50px, 100px',
} as const;
