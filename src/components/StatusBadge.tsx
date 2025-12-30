/**
 * Status Badge Component
 * Visual indicator for connection status, priority levels, etc.
 */

import { cn, getStatusColor, getStatusDotColor, getPriorityColor } from '@/lib/utils';

interface StatusBadgeProps {
  status?: 'connected' | 'degraded' | 'disconnected';
  priority?: 'routine' | 'urgent' | 'stat';
  label?: string;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  priority,
  label,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const colorClass = status ? getStatusColor(status) : priority ? getPriorityColor(priority) : '';
  const dotColor = status ? getStatusDotColor(status) : '';
  
  const displayLabel = label || status || priority || '';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass,
        className
      )}
    >
      {showDot && status && (
        <span className={cn('h-1.5 w-1.5 rounded-full', dotColor)} />
      )}
      <span className="capitalize">{displayLabel}</span>
    </span>
  );
}