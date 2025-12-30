 /**
 * HL7 v2 Message Generator
 * Generates realistic HL7 messages for nurse call system integration demo
 */

export interface HL7Message {
  messageType: string;
  messageControlId: string;
  timestamp: string;
  patientId: string;
  patientName: string;
  roomNumber: string;
  bedNumber: string;
  requestType: string;
  priority: 'routine' | 'urgent' | 'stat';
  nurseStationId: string;
  rawMessage: string;
}

const REQUEST_TYPES = [
  'Pain medication needed',
  'Assistance to bathroom',
  'Request for water',
  'Need blanket',
  'Call button pressed',
  'Family visitor assistance',
  'IV bag replacement',
  'Vitals check requested',
  'Dietary request',
  'Room temperature adjustment',
];

const NURSE_STATIONS = ['NS-2A', 'NS-2B', 'NS-3A', 'NS-3B', 'NS-4A', 'NS-ICU'];

function generatePatientId(): string {
  const prefix = 'MRN';
  const number = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}${number}`;
}

function generatePatientName(): string {
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Barbara'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${lastName}^${firstName}`;
}

function generateRoomNumber(): string {
  const floor = Math.floor(Math.random() * 5) + 2; // Floors 2-6
  const room = Math.floor(Math.random() * 50) + 1;
  return `${floor}${room.toString().padStart(2, '0')}`;
}

function generateMessageControlId(): string {
  return Math.random().toString(36).substring(2, 15).toUpperCase();
}

function formatHL7Timestamp(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function buildRawHL7Message(data: Omit<HL7Message, 'rawMessage'>): string {
  const segments = [
    `MSH|^~\\&|NURSE_CALL|HOSPITAL|PATIENT_COMPANION|INTEGRATION_HUB|${data.timestamp}||ADT^A01|${data.messageControlId}|P|2.5`,
    `PID|1||${data.patientId}||${data.patientName}||19800101|M|||${data.roomNumber}^${data.bedNumber}|||||||`,
    `PV1|1|I|${data.nurseStationId}^${data.roomNumber}^${data.bedNumber}||||||||||||||||`,
    `OBX|1|ST|REQUEST_TYPE||${data.requestType}||||||F`,
    `OBX|2|ST|PRIORITY||${data.priority}||||||F`,
  ];
  
  return segments.join('\r');
}

export function generateHL7Message(): HL7Message {
  const timestamp = new Date();
  const patientId = generatePatientId();
  const patientName = generatePatientName();
  const roomNumber = generateRoomNumber();
  const bedNumber = ['A', 'B'][Math.floor(Math.random() * 2)];
  const requestType = REQUEST_TYPES[Math.floor(Math.random() * REQUEST_TYPES.length)];
  const messageControlId = generateMessageControlId();
  const nurseStationId = NURSE_STATIONS[Math.floor(Math.random() * NURSE_STATIONS.length)];
  
  // Priority distribution: 60% routine, 30% urgent, 10% stat
  const rand = Math.random();
  let priority: 'routine' | 'urgent' | 'stat';
  if (rand < 0.6) priority = 'routine';
  else if (rand < 0.9) priority = 'urgent';
  else priority = 'stat';
  
  const messageData = {
    messageType: 'ADT^A01',
    messageControlId,
    timestamp: formatHL7Timestamp(timestamp),
    patientId,
    patientName,
    roomNumber,
    bedNumber,
    requestType,
    priority,
    nurseStationId,
  };
  
  return {
    ...messageData,
    rawMessage: buildRawHL7Message(messageData),
  };
}

export function generateBatchHL7Messages(count: number): HL7Message[] {
  return Array.from({ length: count }, () => generateHL7Message());
}