'use client';

import dynamic from 'next/dynamic';

const BundleSizeMonitor = dynamic(
  () => import("@/components/BundleSizeMonitor"),
  { ssr: false }
);

export default function ClientBundleSizeMonitor() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return <BundleSizeMonitor />;
}
