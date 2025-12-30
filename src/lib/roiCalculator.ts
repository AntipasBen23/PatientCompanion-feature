/**
 * ROI Calculator for PatientCompanion Integration Hub
 * Calculates time savings, cost reduction, and implementation speedup
 */

export interface ROIInputs {
  hospitalBeds: number;
  currentVendor: string;
  avgResponseTimeMinutes: number;
  nurseHourlyRate?: number;
  implementationMonths?: number;
}

export interface ROIResults {
  // Time savings
  dailyRequests: number;
  annualRequests: number;
  minutesSavedPerRequest: number;
  totalHoursSavedAnnually: number;
  daysSavedAnnually: number;
  
  // Cost savings
  nurseHourlyRate: number;
  annualCostSavings: number;
  fiveYearSavings: number;
  
  // Implementation comparison
  traditionalTimelineMonths: number;
  newTimelineMinutes: number;
  implementationSpeedup: string;
  timeToValueComparison: string;
  
  // Additional metrics
  responseTimeImprovement: string;
  nurseBurnoutReduction: string;
  patientSatisfactionIncrease: string;
}

// Industry benchmarks (from healthcare studies)
const BENCHMARKS = {
  requestsPerBedPerDay: 8.5, // Average nurse call requests per bed
  minutesSavedWithPrioritization: 3.2, // Time saved per request with smart routing
  defaultNurseHourlyRate: 45, // Average RN hourly rate in USD
  traditionalImplementationMonths: 6, // Typical custom integration timeline
  newImplementationMinutes: 5, // Our solution setup time
  responseTimeImprovementPercent: 35, // Average improvement with smart routing
  burnoutReductionPercent: 28, // Reduction in alert fatigue
  patientSatisfactionIncreasePercent: 42, // HCAHPS improvement
};

export function calculateROI(inputs: ROIInputs): ROIResults {
  const {
    hospitalBeds,
    currentVendor,
    avgResponseTimeMinutes,
    nurseHourlyRate = BENCHMARKS.defaultNurseHourlyRate,
    implementationMonths = BENCHMARKS.traditionalImplementationMonths,
  } = inputs;
  
  // Request volume calculations
  const dailyRequests = Math.round(hospitalBeds * BENCHMARKS.requestsPerBedPerDay);
  const annualRequests = dailyRequests * 365;
  
  // Time savings calculations
  const minutesSavedPerRequest = BENCHMARKS.minutesSavedWithPrioritization;
  const totalMinutesSavedAnnually = annualRequests * minutesSavedPerRequest;
  const totalHoursSavedAnnually = totalMinutesSavedAnnually / 60;
  const daysSavedAnnually = Math.round(totalHoursSavedAnnually / 24);
  
  // Cost savings calculations
  const annualCostSavings = Math.round(totalHoursSavedAnnually * nurseHourlyRate);
  const fiveYearSavings = annualCostSavings * 5;
  
  // Implementation timeline comparison
  const traditionalDays = implementationMonths * 30;
  const traditionalMinutes = traditionalDays * 24 * 60;
  const speedupMultiplier = Math.round(traditionalMinutes / BENCHMARKS.newImplementationMinutes);
  
  // Response time improvement
  const improvedResponseTime = avgResponseTimeMinutes * (1 - BENCHMARKS.responseTimeImprovementPercent / 100);
  const responseTimeReduction = Math.round(avgResponseTimeMinutes - improvedResponseTime);
  
  return {
    // Time savings
    dailyRequests,
    annualRequests,
    minutesSavedPerRequest,
    totalHoursSavedAnnually: Math.round(totalHoursSavedAnnually),
    daysSavedAnnually,
    
    // Cost savings
    nurseHourlyRate,
    annualCostSavings,
    fiveYearSavings,
    
    // Implementation comparison
    traditionalTimelineMonths: implementationMonths,
    newTimelineMinutes: BENCHMARKS.newImplementationMinutes,
    implementationSpeedup: `${speedupMultiplier}x faster`,
    timeToValueComparison: `${implementationMonths} months → ${BENCHMARKS.newImplementationMinutes} minutes`,
    
    // Additional metrics
    responseTimeImprovement: `${responseTimeReduction} min faster (${BENCHMARKS.responseTimeImprovementPercent}% improvement)`,
    nurseBurnoutReduction: `${BENCHMARKS.burnoutReductionPercent}% reduction in alert fatigue`,
    patientSatisfactionIncrease: `${BENCHMARKS.patientSatisfactionIncreasePercent}% HCAHPS improvement`,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}