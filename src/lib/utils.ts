// src/lib/utils.ts — Utility functions
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMetricValue(
  value: number | string,
  format: 'number' | 'text',
  prefix?: string,
  suffix?: string,
): string {
  if (format === 'text') return String(value)
  const num = typeof value === 'number' ? value : parseInt(value, 10)
  const formatted = num >= 1000 ? num.toLocaleString('en-US') : String(num)
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`
}
