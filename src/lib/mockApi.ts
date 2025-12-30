/**
 * Mock API Layer
 * Simulates backend API calls with realistic delays and responses
 */

import { sleep } from './utils';

export interface ConnectionTestResult {
  success: boolean;
  vendor: string;
  latency: number;
  message: string;
}

export interface DeploymentResult {
  success: boolean;
  deployedAt: string;
  configurationId: string;
  message: string;
}

// Simulate connection test to a nurse call vendor
export async function testConnection(vendor: string): Promise<ConnectionTestResult> {
  // Simulate network delay (1-2 seconds)
  await sleep(1000 + Math.random() * 1000);
  
  // 95% success rate
  const success = Math.random() > 0.05;
  const latency = Math.floor(Math.random() * 100) + 50;
  
  return {
    success,
    vendor,
    latency,
    message: success
      ? `Successfully connected to ${vendor}`
      : `Connection timeout - please check credentials`,
  };
}

// Simulate deploying integration configuration
export async function deployIntegration(config: {
  vendor: string;
  hospitalName: string;
}): Promise<DeploymentResult> {
  // Simulate deployment process (2-4 seconds)
  await sleep(2000 + Math.random() * 2000);
  
  const success = Math.random() > 0.02; // 98% success rate
  
  return {
    success,
    deployedAt: new Date().toISOString(),
    configurationId: `CFG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    message: success
      ? `Integration deployed successfully`
      : `Deployment failed - please retry`,
  };
}

// Simulate fetching system health
export async function fetchSystemHealth() {
  await sleep(300);
  
  return {
    uptime: 99.8,
    activeConnections: Math.floor(Math.random() * 10) + 5,
    requestsProcessed: Math.floor(Math.random() * 100000) + 50000,
  };
}

// Simulate calculating ROI (with slight delay for realism)
export async function calculateROI(inputs: {
  beds: number;
  vendor: string;
  responseTime: number;
}) {
  await sleep(500);
  
  const annualSavings = inputs.beds * 8.5 * 365 * 3.2 * (45 / 60);
  
  return {
    annualSavings: Math.round(annualSavings),
    fiveYearSavings: Math.round(annualSavings * 5),
    timeToValue: '6 months → 5 minutes',
  };
}