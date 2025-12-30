/**
 * ROI Calculator Page
 * Interactive calculator showing cost and time savings
 */

'use client';

import { useState } from 'react';
import { calculateROI, formatCurrency, formatNumber } from '@/lib/roiCalculator';
import { VENDORS } from '@/lib/constants';
import { Navigation } from '@/components/Navigation';

export default function CalculatorPage() {
  const [inputs, setInputs] = useState({
    hospitalBeds: 200,
    currentVendor: VENDORS[0].name,
    avgResponseTimeMinutes: 8,
  });

  const results = calculateROI(inputs);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ROI Calculator
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Calculate your potential savings with Integration Hub
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Hospital Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter your facility information
            </p>

            <div className="mt-6 space-y-6">
              {/* Hospital Beds */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Hospital Beds
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={inputs.hospitalBeds}
                  onChange={(e) =>
                    setInputs({ ...inputs, hospitalBeds: Number(e.target.value) })
                  }
                  className="mt-2 w-full"
                />
                <div className="mt-1 flex justify-between text-sm text-gray-500">
                  <span>50</span>
                  <span className="font-semibold text-gray-900">
                    {inputs.hospitalBeds} beds
                  </span>
                  <span>500</span>
                </div>
              </div>

              {/* Current Vendor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Nurse Call Vendor
                </label>
                <select
                  value={inputs.currentVendor}
                  onChange={(e) =>
                    setInputs({ ...inputs, currentVendor: e.target.value })
                  }
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {VENDORS.map((vendor) => (
                    <option key={vendor.id} value={vendor.name}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Response Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Average Response Time (minutes)
                </label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="1"
                  value={inputs.avgResponseTimeMinutes}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      avgResponseTimeMinutes: Number(e.target.value),
                    })
                  }
                  className="mt-2 w-full"
                />
                <div className="mt-1 flex justify-between text-sm text-gray-500">
                  <span>3 min</span>
                  <span className="font-semibold text-gray-900">
                    {inputs.avgResponseTimeMinutes} minutes
                  </span>
                  <span>15 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Annual Savings */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-sm font-medium text-gray-600">Annual Cost Savings</h3>
              <p className="mt-2 text-4xl font-bold text-green-600">
                {formatCurrency(results.annualCostSavings)}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {formatNumber(results.totalHoursSavedAnnually)} nurse hours saved per year
              </p>
            </div>

            {/* 5-Year Savings */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-sm font-medium text-gray-600">5-Year Total Savings</h3>
              <p className="mt-2 text-4xl font-bold text-[#2B3E70]">
                {formatCurrency(results.fiveYearSavings)}
              </p>
            </div>

            {/* Implementation Speed */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-sm font-medium text-gray-600">
                Implementation Time
              </h3>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {results.timeToValueComparison}
              </p>
              <p className="mt-1 text-sm font-semibold text-green-600">
                {results.implementationSpeedup}
              </p>
            </div>

            {/* Additional Metrics */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-medium text-gray-900">
                Additional Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response Time Improvement</span>
                  <span className="font-medium text-gray-900">
                    {results.responseTimeImprovement}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Nurse Burnout Reduction</span>
                  <span className="font-medium text-gray-900">
                    {results.nurseBurnoutReduction}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Patient Satisfaction</span>
                  <span className="font-medium text-gray-900">
                    {results.patientSatisfactionIncrease}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 rounded-lg bg-[#2B3E70] p-6 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              Save {formatCurrency(results.annualCostSavings)} annually
            </h2>
            <p className="mt-2 text-blue-100">
              With {formatNumber(results.dailyRequests)} patient requests per day, Integration Hub
              saves {results.minutesSavedPerRequest} minutes per request through smart routing and
              prioritization.
            </p>
            <div className="mt-4 text-sm text-blue-200">
              Based on {inputs.hospitalBeds} beds • {inputs.currentVendor} • Industry benchmarks
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}