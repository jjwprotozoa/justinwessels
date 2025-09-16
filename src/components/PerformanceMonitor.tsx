'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  fmp: number | null; // First Meaningful Paint
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

export function PerformanceMonitor({ enabled = true, onMetrics }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fmp: null,
  });

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const measurePerformance = () => {
      const newMetrics: PerformanceMetrics = {
        fcp: null,
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
        fmp: null,
      };

      // Get Navigation Timing API metrics
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          newMetrics.ttfb = navigation.responseStart - navigation.requestStart;
        }
      }

      // Get Paint Timing API metrics
      if ('PerformanceObserver' in window) {
        try {
          // First Contentful Paint
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              newMetrics.fcp = fcpEntry.startTime;
            }
          });
          fcpObserver.observe({ entryTypes: ['paint'] });

          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              newMetrics.lcp = lastEntry.startTime;
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                newMetrics.fid = entry.processingStart - entry.startTime;
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            newMetrics.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Cleanup observers after 10 seconds
          setTimeout(() => {
            fcpObserver.disconnect();
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
          }, 10000);

        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }

      // Get First Meaningful Paint (approximation)
      if ('performance' in window) {
        const paintEntries = performance.getEntriesByType('paint');
        const fmpEntry = paintEntries.find(entry => entry.name === 'first-meaningful-paint');
        if (fmpEntry) {
          newMetrics.fmp = fmpEntry.startTime;
        }
      }

      setMetrics(newMetrics);
      onMetrics?.(newMetrics);
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, [enabled, onMetrics]);

  // Log performance metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && Object.values(metrics).some(v => v !== null)) {
      console.group('🚀 Performance Metrics');
      console.log('First Contentful Paint (FCP):', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A');
      console.log('Largest Contentful Paint (LCP):', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A');
      console.log('First Input Delay (FID):', metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A');
      console.log('Cumulative Layout Shift (CLS):', metrics.cls ? metrics.cls.toFixed(4) : 'N/A');
      console.log('Time to First Byte (TTFB):', metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A');
      console.log('First Meaningful Paint (FMP):', metrics.fmp ? `${metrics.fmp.toFixed(2)}ms` : 'N/A');
      console.groupEnd();
    }
  }, [metrics]);

  return null;
}

// Performance score calculator
export function calculatePerformanceScore(metrics: PerformanceMetrics): {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  recommendations: string[];
} {
  const recommendations: string[] = [];
  let score = 100;

  // FCP scoring (0-100)
  if (metrics.fcp !== null) {
    if (metrics.fcp <= 1800) {
      // Good
    } else if (metrics.fcp <= 3000) {
      score -= 20;
      recommendations.push('Improve First Contentful Paint - optimize critical CSS and reduce render-blocking resources');
    } else {
      score -= 40;
      recommendations.push('Critical: First Contentful Paint is too slow - optimize initial page load');
    }
  }

  // LCP scoring (0-100)
  if (metrics.lcp !== null) {
    if (metrics.lcp <= 2500) {
      // Good
    } else if (metrics.lcp <= 4000) {
      score -= 20;
      recommendations.push('Improve Largest Contentful Paint - optimize images and reduce server response time');
    } else {
      score -= 40;
      recommendations.push('Critical: Largest Contentful Paint is too slow - optimize largest content element');
    }
  }

  // FID scoring (0-100)
  if (metrics.fid !== null) {
    if (metrics.fid <= 100) {
      // Good
    } else if (metrics.fid <= 300) {
      score -= 20;
      recommendations.push('Improve First Input Delay - reduce JavaScript execution time');
    } else {
      score -= 40;
      recommendations.push('Critical: First Input Delay is too high - optimize JavaScript and reduce main thread blocking');
    }
  }

  // CLS scoring (0-100)
  if (metrics.cls !== null) {
    if (metrics.cls <= 0.1) {
      // Good
    } else if (metrics.cls <= 0.25) {
      score -= 20;
      recommendations.push('Improve Cumulative Layout Shift - ensure images have dimensions and avoid dynamic content insertion');
    } else {
      score -= 40;
      recommendations.push('Critical: Cumulative Layout Shift is too high - fix layout shifts');
    }
  }

  // TTFB scoring (0-100)
  if (metrics.ttfb !== null) {
    if (metrics.ttfb <= 800) {
      // Good
    } else if (metrics.ttfb <= 1800) {
      score -= 15;
      recommendations.push('Improve Time to First Byte - optimize server response time');
    } else {
      score -= 30;
      recommendations.push('Critical: Time to First Byte is too slow - optimize server and CDN');
    }
  }

  // Determine grade
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';

  return { score: Math.max(0, score), grade, recommendations };
}

// Resource timing analyzer
export function analyzeResourceTiming() {
  if (typeof window === 'undefined' || !('performance' in window)) return null;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const analysis = {
    totalResources: resources.length,
    totalSize: 0,
    slowResources: [] as Array<{
      name: string;
      duration: number;
      size: number;
      type: string;
    }>,
    resourceTypes: {} as Record<string, number>,
  };

  resources.forEach(resource => {
    const duration = resource.responseEnd - resource.requestStart;
    const size = resource.transferSize || 0;
    
    analysis.totalSize += size;
    
    // Track slow resources (>1s)
    if (duration > 1000) {
      analysis.slowResources.push({
        name: resource.name,
        duration,
        size,
        type: resource.initiatorType,
      });
    }
    
    // Count resource types
    analysis.resourceTypes[resource.initiatorType] = (analysis.resourceTypes[resource.initiatorType] || 0) + 1;
  });

  return analysis;
}
