/**
 * Utility Helper Functions
 * Formatting, date handling, and common operations
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind class merger (for shadcn/ui compatibility)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// Format relative time (e.g., "2 minutes ago")
export function formatRelativeTime(timestamp: string): string {
  const now = new Date().getTime();
  const time = new Date(timestamp).getTime();
  const diff = now - time;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Format time (e.g., "2:30 PM")
export function formatTime(timestamp: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(timestamp));
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Sleep function for delays
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get priority color
export function getPriorityColor(priority: 'routine' | 'urgent' | 'stat'): string {
  const colors = {
    routine: 'text-green-600 bg-green-50',
    urgent: 'text-yellow-600 bg-yellow-50',
    stat: 'text-red-600 bg-red-50',
  };
  return colors[priority];
}

// Get status color
export function getStatusColor(status: 'connected' | 'degraded' | 'disconnected'): string {
  const colors = {
    connected: 'text-green-600 bg-green-50',
    degraded: 'text-yellow-600 bg-yellow-50',
    disconnected: 'text-red-600 bg-red-50',
  };
  return colors[status];
}

// Get status dot color
export function getStatusDotColor(status: 'connected' | 'degraded' | 'disconnected'): string {
  const colors = {
    connected: 'bg-green-500',
    degraded: 'bg-yellow-500',
    disconnected: 'bg-red-500',
  };
  return colors[status];
}