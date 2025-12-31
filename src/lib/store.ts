import { create } from 'zustand';

export interface PatientRequest {
  id: string;
  patientName: string;
  roomNumber: string;
  requestType: string;
  priority: 'routine' | 'urgent' | 'stat';
  timestamp: string;
  vendor: string;
}

export interface Connector {
  id: string;
  vendor: string;
  status: 'connected' | 'degraded' | 'disconnected';
  latency: number;
  requestsProcessed: number;
}

interface StoreState {
  requests: PatientRequest[];
  connectors: Connector[];
  addRequest: (request: PatientRequest) => void;
  updateConnector: (id: string, updates: Partial<Connector>) => void;
  initConnectors: (connectors: Connector[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  requests: [],
  connectors: [],
  
  addRequest: (request) =>
    set((state) => ({
      requests: [request, ...state.requests].slice(0, 50),
    })),
  
  updateConnector: (id, updates) =>
    set((state) => ({
      connectors: state.connectors.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  
  initConnectors: (connectors) => set({ connectors }),
}));