/**
 * Brand Colors & Constants
 * Matches PatientCompanion's visual identity
 */

export const COLORS = {
  // Primary (from PatientCompanion branding)
  navy: {
    primary: '#2B3E70',
    dark: '#1F2D50',
    light: '#3A5199',
  },
  
  // Status colors
  status: {
    connected: '#34C759',
    degraded: '#FFB800',
    disconnected: '#FF3B30',
  },
  
  // Priority colors
  priority: {
    routine: '#34C759',
    urgent: '#FFB800',
    stat: '#FF3B30',
  },
  
  // Accents
  blue: '#4A90E2',
  
  // Neutrals
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

export const VENDORS = [
  { id: 'hillrom', name: 'Hillrom', protocol: 'HL7 v2.5' },
  { id: 'rauland', name: 'Rauland', protocol: 'RELL Protocol' },
  { id: 'ascom', name: 'Ascom', protocol: 'Unite API' },
  { id: 'critical-alert', name: 'Critical Alert', protocol: 'REST API' },
  { id: 'west-com', name: 'West-Com', protocol: 'FHIR R4' },
] as const;

export const NURSE_CALL_REQUESTS = [
  'Pain medication needed',
  'Assistance to bathroom',
  'Request for water',
  'Need blanket',
  'Call button pressed',
  'IV bag replacement',
  'Vitals check requested',
] as const;

export const METRICS = {
  requestsPerBedPerDay: 8.5,
  avgNurseHourlyRate: 45,
  traditionalImplementationMonths: 6,
  newImplementationMinutes: 5,
} as const;