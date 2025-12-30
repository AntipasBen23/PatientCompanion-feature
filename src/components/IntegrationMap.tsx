/**
 * Integration Map Component
 * Visual diagram showing data flow between nurse call systems and PatientCompanion
 */

'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { generateMockConnectors } from '@/lib/mockData';
import { ConnectorCard } from './ConnectorCard';

export function IntegrationMap() {
  const { connectors, initConnectors, updateConnector } = useStore();

  useEffect(() => {
    // Initialize connectors on mount
    if (connectors.length === 0) {
      initConnectors(generateMockConnectors());
    }

    // Update connector status every 5 seconds
    const interval = setInterval(() => {
      connectors.forEach((connector) => {
        const newLatency = Math.floor(Math.random() * 100) + 50;
        const newStatus = Math.random() > 0.05 ? 'connected' : 'degraded';
        
        updateConnector(connector.id, {
          latency: newLatency,
          status: newStatus,
          requestsProcessed: connector.requestsProcessed + Math.floor(Math.random() * 10),
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [connectors, initConnectors, updateConnector]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Connected Systems</h2>
        <p className="mt-1 text-sm text-gray-500">
          Active integrations with nurse call vendors
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connectors.map((connector) => (
          <ConnectorCard key={connector.id} connector={connector} />
        ))}
      </div>

      {connectors.length === 0 && (
        <div className="flex h-40 items-center justify-center text-sm text-gray-500">
          No connectors configured
        </div>
      )}
    </div>
  );
}