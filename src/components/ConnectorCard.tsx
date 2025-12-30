/**
 * Connector Card Component
 * Displays nurse call vendor integration status
 */

import { StatusBadge } from './StatusBadge';
import { formatNumber } from '@/lib/utils';
import type { Connector } from '@/lib/store';

interface ConnectorCardProps {
  connector: Connector;
}

export function ConnectorCard({ connector }: ConnectorCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{connector.vendor}</h3>
          <p className="mt-1 text-sm text-gray-500">Nurse Call System</p>
        </div>
        
        <StatusBadge status={connector.status} />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Latency</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{connector.latency}ms</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500">Requests</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatNumber(connector.requestsProcessed)}
          </p>
        </div>
      </div>
    </div>
  );
}