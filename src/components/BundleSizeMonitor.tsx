'use client';

import { useEffect, useState } from 'react';

interface BundleSizeData {
  totalSize: number;
  gzippedSize: number;
  compressionRatio: string;
  budgetPassed: boolean;
  violations: string[];
  timestamp: string;
}

interface BundleSizeMonitorProps {
  enabled?: boolean;
  showDetails?: boolean;
}

export default function BundleSizeMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  showDetails = false 
}: BundleSizeMonitorProps) {
  const [bundleData, setBundleData] = useState<BundleSizeData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const loadBundleData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/bundle-size');
        if (response.ok) {
          const data = await response.json();
          setBundleData(data);
        }
      } catch (error) {
        console.warn('Failed to load bundle size data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBundleData();
  }, [enabled]);

  if (!enabled || loading) return null;

  if (!bundleData) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded text-sm">
        Bundle data not available
      </div>
    );
  }

  const getStatusColor = () => {
    if (bundleData.budgetPassed) return 'bg-green-100 border-green-400 text-green-800';
    return 'bg-red-100 border-red-400 text-red-800';
  };

  return (
    <div className={`fixed bottom-4 right-4 border px-3 py-2 rounded text-sm max-w-sm ${getStatusColor()}`}>
      <div className="font-semibold mb-1">
        Bundle Size Monitor
        {bundleData.budgetPassed ? ' ✅' : ' ❌'}
      </div>
      
      <div className="text-xs space-y-1">
        <div>Total: {bundleData.totalSize.toFixed(1)} KB</div>
        <div>Gzipped: {bundleData.gzippedSize.toFixed(1)} KB</div>
        <div>Compression: {bundleData.compressionRatio}%</div>
        
        {showDetails && bundleData.violations.length > 0 && (
          <div className="mt-2">
            <div className="font-semibold">Violations:</div>
            {bundleData.violations.map((violation, index) => (
              <div key={index} className="text-xs">• {violation}</div>
            ))}
          </div>
        )}
        
        <div className="text-xs opacity-75 mt-1">
          Updated: {new Date(bundleData.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
