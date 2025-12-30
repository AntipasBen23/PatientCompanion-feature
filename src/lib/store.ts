/**
 * Global State Store using Zustand
 * Manages integration hub state, requests, and system health
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Hospital {
  id: string;
  name: string;
  beds: number;
  nurseCallVendor: string;
  status: 'connected' | 'degraded' | 'disconnected';
  setupDate: string;
  location: string;
}

export interface IntegrationConnector {
  id: string;
  vendor: string;
  protocol: string;
  status: 'connected' | 'degraded' | 'disconnected';
  latency: number;
  requestsProcessed: number;
  lastPing: string;
  logo?: string;
}

export interface PatientRequest {
  id: string;
  hospitalId: string;
  patientId: string;
  patientName: string;
  roomNumber: string;
  requestType: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
  completedAt?: string;
  nurseStationId: string;
  vendor: string;
}

export interface SystemMetrics {
  totalRequests: number;
  activeRequests: number;
  avgResponseTime: number;
  uptime: number;
  connectedHospitals: number;
}

interface IntegrationHubState {
  // Data
  hospitals: Hospital[];
  connectors: IntegrationConnector[];
  requests: PatientRequest[];
  metrics: SystemMetrics;
  
  // Actions - Hospitals
  addHospital: (hospital: Hospital) => void;
  removeHospital: (id: string) => void;
  updateHospitalStatus: (id: string, status: Hospital['status']) => void;
  
  // Actions - Connectors
  addConnector: (connector: IntegrationConnector) => void;
  updateConnectorStatus: (id: string, status: IntegrationConnector['status'], latency?: number) => void;
  
  // Actions - Requests
  addRequest: (request: PatientRequest) => void;
  updateRequestStatus: (id: string, status: PatientRequest['status']) => void;
  clearOldRequests: () => void;
  
  // Actions - Metrics
  updateMetrics: (metrics: Partial<SystemMetrics>) => void;
  
  // Actions - Utility
  resetStore: () => void;
}

const INITIAL_STATE = {
  hospitals: [] as Hospital[],
  connectors: [] as IntegrationConnector[],
  requests: [] as PatientRequest[],
  metrics: {
    totalRequests: 0,
    activeRequests: 0,
    avgResponseTime: 0,
    uptime: 100,
    connectedHospitals: 0,
  } as SystemMetrics,
};

export const useIntegrationStore = create<IntegrationHubState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      
      // Hospital actions
      addHospital: (hospital) =>
        set((state) => ({
          hospitals: [...state.hospitals, hospital],
          metrics: {
            ...state.metrics,
            connectedHospitals: state.hospitals.length + 1,
          },
        })),
      
      removeHospital: (id) =>
        set((state) => ({
          hospitals: state.hospitals.filter((h) => h.id !== id),
          metrics: {
            ...state.metrics,
            connectedHospitals: Math.max(0, state.hospitals.length - 1),
          },
        })),
      
      updateHospitalStatus: (id, status) =>
        set((state) => ({
          hospitals: state.hospitals.map((h) =>
            h.id === id ? { ...h, status } : h
          ),
        })),
      
      // Connector actions
      addConnector: (connector) =>
        set((state) => ({
          connectors: [...state.connectors, connector],
        })),
      
      updateConnectorStatus: (id, status, latency) =>
        set((state) => ({
          connectors: state.connectors.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status,
                  ...(latency !== undefined && { latency }),
                  lastPing: new Date().toISOString(),
                }
              : c
          ),
        })),
      
      // Request actions
      addRequest: (request) =>
        set((state) => {
          const newRequests = [request, ...state.requests].slice(0, 100); // Keep last 100 requests
          const activeCount = newRequests.filter((r) => r.status !== 'completed').length;
          
          return {
            requests: newRequests,
            metrics: {
              ...state.metrics,
              totalRequests: state.metrics.totalRequests + 1,
              activeRequests: activeCount,
            },
          };
        }),
      
      updateRequestStatus: (id, status) =>
        set((state) => {
          const updatedRequests = state.requests.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status,
                  ...(status === 'completed' && {
                    completedAt: new Date().toISOString(),
                  }),
                }
              : r
          );
          
          const activeCount = updatedRequests.filter((r) => r.status !== 'completed').length;
          
          // Calculate average response time
          const completedRequests = updatedRequests.filter(
            (r) => r.status === 'completed' && r.completedAt
          );
          
          let avgResponseTime = state.metrics.avgResponseTime;
          if (completedRequests.length > 0) {
            const responseTimes = completedRequests.map((r) => {
              const start = new Date(r.timestamp).getTime();
              const end = new Date(r.completedAt!).getTime();
              return (end - start) / 1000 / 60; // Convert to minutes
            });
            avgResponseTime =
              responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
          }
          
          return {
            requests: updatedRequests,
            metrics: {
              ...state.metrics,
              activeRequests: activeCount,
              avgResponseTime: Math.round(avgResponseTime * 10) / 10,
            },
          };
        }),
      
      clearOldRequests: () =>
        set((state) => ({
          requests: state.requests.slice(0, 50),
        })),
      
      // Metrics actions
      updateMetrics: (metrics) =>
        set((state) => ({
          metrics: { ...state.metrics, ...metrics },
        })),
      
      // Utility
      resetStore: () => set(INITIAL_STATE),
    }),
    {
      name: 'integration-hub-storage',
      partialize: (state) => ({
        hospitals: state.hospitals,
        connectors: state.connectors,
        // Don't persist requests and metrics (they regenerate on load)
      }),
    }
  )
);