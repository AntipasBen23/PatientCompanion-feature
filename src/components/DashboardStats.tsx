/**
 * Dashboard Stats Component
 * Displays key metrics at the top of the dashboard
 */

'use client';

import { useStore } from '@/lib/store';
import { MetricCard } from './MetricCard';
import { formatNumber } from '@/lib/utils';

export function DashboardStats() {
  const { requests, connectors } = useStore();

  const stats = {
    totalRequests: requests.length,
    activeConnections: connectors.filter((c) => c.status === 'connected').length,
    avgLatency: connectors.length > 0
      ? Math.round(connectors.reduce((sum, c) => sum + c.latency, 0) / connectors.length)
      : 0,
    systemUptime: 99.8,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Requests"
        value={formatNumber(stats.totalRequests)}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
        trend={{ value: '+12%', isPositive: true }}
      />

      <MetricCard
        title="Active Connections"
        value={stats.activeConnections}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />

      <MetricCard
        title="Avg Latency"
        value={`${stats.avgLatency}ms`}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        trend={{ value: '-8%', isPositive: true }}
      />

      <MetricCard
        title="System Uptime"
        value={`${stats.systemUptime}%`}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
}