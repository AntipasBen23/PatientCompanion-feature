/**
 * Before/After Comparison Page
 * Shows traditional integration vs Integration Hub
 */

import Link from 'next/link';

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Integration Comparison
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Traditional approach vs Integration Hub
          </p>
        </div>
      </header>

      {/* Comparison Grid */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Traditional Approach */}
          <div className="rounded-lg border-2 border-red-200 bg-white p-8">
            <div className="mb-6 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-700">
              Traditional Approach
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">
              6+ Months Per Hospital
            </h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <div>
                  <p className="font-medium text-gray-900">Custom API Development</p>
                  <p className="text-sm text-gray-600">Build unique integrations for each vendor</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <div>
                  <p className="font-medium text-gray-900">Lengthy IT Coordination</p>
                  <p className="text-sm text-gray-600">Weeks of meetings and approvals</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <div>
                  <p className="font-medium text-gray-900">Protocol Translation</p>
                  <p className="text-sm text-gray-600">Manual HL7/FHIR mapping for each system</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <div>
                  <p className="font-medium text-gray-900">Extensive Testing</p>
                  <p className="text-sm text-gray-600">Months of validation and bug fixes</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-red-500">✗</span>
                <div>
                  <p className="font-medium text-gray-900">High Engineering Cost</p>
                  <p className="text-sm text-gray-600">$150K-$300K per hospital deployment</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-lg bg-red-50 p-4">
              <p className="text-center text-sm font-medium text-red-900">
                Result: Slow market expansion, high burn rate
              </p>
            </div>
          </div>

          {/* Integration Hub */}
          <div className="rounded-lg border-2 border-green-200 bg-white p-8">
            <div className="mb-6 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
              Integration Hub
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">
              5 Minutes Per Hospital
            </h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Pre-Built Connectors</p>
                  <p className="text-sm text-gray-600">Top 10 vendors already integrated</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Zero-Code Deployment</p>
                  <p className="text-sm text-gray-600">Point-and-click configuration</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Universal Translation</p>
                  <p className="text-sm text-gray-600">Automatic HL7/FHIR conversion</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Instant Validation</p>
                  <p className="text-sm text-gray-600">Real-time connection testing</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium text-gray-900">Minimal Cost</p>
                  <p className="text-sm text-gray-600">SaaS pricing, no custom engineering</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-lg bg-green-50 p-4">
              <p className="text-center text-sm font-medium text-green-900">
                Result: Rapid scaling, predictable costs
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 rounded-lg bg-[#2B3E70] p-8 text-white">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold">52x</p>
              <p className="mt-2 text-sm text-blue-200">Faster deployment</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">$200K+</p>
              <p className="mt-2 text-sm text-blue-200">Saved per hospital</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">100%</p>
              <p className="mt-2 text-sm text-blue-200">Engineering time freed</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}