/**
 * FHIR R4 Communication Resource Generator
 * Generates realistic FHIR messages for nurse call integration demo
 */

export interface FHIRCommunication {
  resourceType: 'Communication';
  id: string;
  status: 'preparation' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'routine' | 'urgent' | 'asap' | 'stat';
  category: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  }>;
  subject: {
    reference: string;
    display: string;
  };
  topic: {
    text: string;
  };
  sent: string;
  received?: string;
  recipient: Array<{
    reference: string;
    display: string;
  }>;
  sender: {
    reference: string;
    display: string;
  };
  payload: Array<{
    contentString: string;
  }>;
  meta: {
    source: string;
    versionId: string;
    lastUpdated: string;
  };
}

const NURSE_CALL_CATEGORIES = [
  { code: 'assistance', display: 'General Assistance' },
  { code: 'pain-management', display: 'Pain Management' },
  { code: 'hygiene', display: 'Hygiene Assistance' },
  { code: 'medication', display: 'Medication Request' },
  { code: 'nutrition', display: 'Nutrition/Dietary' },
  { code: 'comfort', display: 'Comfort Request' },
  { code: 'vital-signs', display: 'Vital Signs Check' },
  { code: 'emergency', display: 'Emergency' },
];

const NURSE_CALL_REQUESTS = {
  'assistance': [
    'Patient requires assistance getting out of bed',
    'Help needed with mobility',
    'Assistance requested for bathroom visit',
    'Patient needs help adjusting position',
  ],
  'pain-management': [
    'Patient reports pain level 7/10',
    'Pain medication requested',
    'Patient experiencing discomfort',
    'Pain assessment needed',
  ],
  'hygiene': [
    'Patient requests bed bath',
    'Oral care assistance needed',
    'Patient needs help with grooming',
    'Bedpan requested',
  ],
  'medication': [
    'Scheduled medication reminder',
    'Patient requesting PRN medication',
    'IV medication due',
    'Pain relief medication needed',
  ],
  'nutrition': [
    'Patient requesting water',
    'Meal tray assistance needed',
    'Dietary restrictions question',
    'Patient requesting snack',
  ],
  'comfort': [
    'Extra blanket requested',
    'Room temperature adjustment needed',
    'Pillow adjustment requested',
    'Lighting adjustment needed',
  ],
  'vital-signs': [
    'Scheduled vital signs check',
    'Patient reports feeling unwell',
    'Blood pressure check requested',
    'Temperature check needed',
  ],
  'emergency': [
    'Patient experiencing chest pain',
    'Sudden change in condition',
    'Fall detected',
    'Patient in distress',
  ],
};

const NURSE_STATIONS = [
  'Practitioner/nurse-station-2a',
  'Practitioner/nurse-station-2b',
  'Practitioner/nurse-station-3a',
  'Practitioner/nurse-station-icu',
];

const VENDORS = ['Hillrom', 'Rauland', 'Ascom', 'Critical Alert', 'West-Com'];

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generatePatientReference(): { reference: string; display: string } {
  const patientId = Math.floor(Math.random() * 900000) + 100000;
  const firstName = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer'][Math.floor(Math.random() * 6)];
  const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)];
  
  return {
    reference: `Patient/${patientId}`,
    display: `${firstName} ${lastName}`,
  };
}

export function generateFHIRCommunication(): FHIRCommunication {
  const now = new Date();
  const category = NURSE_CALL_CATEGORIES[Math.floor(Math.random() * NURSE_CALL_CATEGORIES.length)];
  const requests = NURSE_CALL_REQUESTS[category.code as keyof typeof NURSE_CALL_REQUESTS];
  const request = requests[Math.floor(Math.random() * requests.length)];
  const patient = generatePatientReference();
  const nurseStation = NURSE_STATIONS[Math.floor(Math.random() * NURSE_STATIONS.length)];
  const vendor = VENDORS[Math.floor(Math.random() * VENDORS.length)];
  
  // Priority distribution based on category
  let priority: 'routine' | 'urgent' | 'asap' | 'stat';
  if (category.code === 'emergency') {
    priority = 'stat';
  } else if (category.code === 'pain-management' || category.code === 'medication') {
    priority = Math.random() < 0.5 ? 'urgent' : 'asap';
  } else {
    priority = Math.random() < 0.8 ? 'routine' : 'urgent';
  }
  
  // Status distribution: 70% in-progress, 20% completed, 10% preparation
  const rand = Math.random();
  let status: 'preparation' | 'in-progress' | 'completed' | 'on-hold';
  if (rand < 0.1) status = 'preparation';
  else if (rand < 0.8) status = 'in-progress';
  else status = 'completed';
  
  return {
    resourceType: 'Communication',
    id: generateUUID(),
    status,
    priority,
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/communication-category',
            code: category.code,
            display: category.display,
          },
        ],
      },
    ],
    subject: patient,
    topic: {
      text: `Nurse Call Request - ${category.display}`,
    },
    sent: now.toISOString(),
    ...(status === 'completed' && {
      received: new Date(now.getTime() + Math.random() * 600000).toISOString(), // Within 10 minutes
    }),
    recipient: [
      {
        reference: nurseStation,
        display: nurseStation.split('/')[1].toUpperCase().replace(/-/g, ' '),
      },
    ],
    sender: {
      reference: patient.reference,
      display: patient.display,
    },
    payload: [
      {
        contentString: request,
      },
    ],
    meta: {
      source: `urn:nurse-call-system:${vendor.toLowerCase()}`,
      versionId: '1',
      lastUpdated: now.toISOString(),
    },
  };
}

export function generateBatchFHIRCommunications(count: number): FHIRCommunication[] {
  return Array.from({ length: count }, () => generateFHIRCommunication());
}