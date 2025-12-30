/**
 * Mock Data Utilities
 * Generates realistic data for the integration hub demo
 */

import { generateHL7Message } from './hl7Generator';
import { generateFHIRCommunication } from './fhirGenerator';
import type { PatientRequest, Connector } from './store';

const VENDORS = [
  { id: 'hillrom', name: 'Hillrom', protocol: 'HL7 v2.5' },
  { id: 'rauland', name: 'Rauland', protocol: 'RELL Protocol' },
  { id: 'ascom', name: 'Ascom', protocol: 'Unite API' },
  { id: 'critical-alert', name: 'Critical Alert', protocol: 'REST API' },
  { id: 'west-com', name: 'West-Com', protocol: 'FHIR R4' },
];

export function generateMockRequest(): PatientRequest {
  const vendor = VENDORS[Math.floor(Math.random() * VENDORS.length)];
  const useHL7 = Math.random() > 0.5;
  
  if (useHL7) {
    const hl7 = generateHL7Message();
    return {
      id: hl7.messageControlId,
      patientName: hl7.patientName.replace('^', ' '),
      roomNumber: `${hl7.roomNumber}-${hl7.bedNumber}`,
      requestType: hl7.requestType,
      priority: hl7.priority,
      timestamp: new Date().toISOString(),
      vendor: vendor.name,
    };
  } else {
    const fhir = generateFHIRCommunication();
    return {
      id: fhir.id,
      patientName: fhir.subject.display,
      roomNumber: `${Math.floor(Math.random() * 400) + 100}`,
      requestType: fhir.payload[0].contentString,
      priority: fhir.priority === 'asap' ? 'urgent' : fhir.priority,
      timestamp: fhir.sent,
      vendor: vendor.name,
    };
  }
}

export function generateMockConnectors(): Connector[] {
  return VENDORS.map((vendor) => ({
    id: vendor.id,
    vendor: vendor.name,
    status: Math.random() > 0.1 ? 'connected' : 'degraded',
    latency: Math.floor(Math.random() * 100) + 50,
    requestsProcessed: Math.floor(Math.random() * 50000) + 10000,
  }));
}

export function simulateSystemHealth() {
  return VENDORS.map((vendor) => ({
    ...vendor,
    status: Math.random() > 0.05 ? 'connected' : 'degraded',
    latency: Math.floor(Math.random() * 150) + 30,
  }));
}