/**
 * Request Item Component
 * Displays individual patient request in the live feed
 */

import { StatusBadge } from './StatusBadge';
import { formatRelativeTime } from '@/lib/utils';
import type { PatientRequest } from '@/lib/store';

interface RequestItemProps {
  request: PatientRequest;
}

export function RequestItem({ request }: RequestItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="font-medium text-gray-900">{request.patientName}</p>
            <p className="text-sm text-gray-500">Room {request.roomNumber}</p>
          </div>
          
          <StatusBadge priority={request.priority} showDot={false} />
        </div>
        
        <p className="mt-2 text-sm text-gray-700">{request.requestType}</p>
        
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span>{formatRelativeTime(request.timestamp)}</span>
          <span>•</span>
          <span>{request.vendor}</span>
        </div>
      </div>
    </div>
  );
}