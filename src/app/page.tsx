/**
 * Integration Hub Dashboard
 * Main page showing live request feed and system status
 */

import { DashboardStats } from '@/components/DashboardStats';
import { IntegrationMap } from '@/components/IntegrationMap';
import { LiveRequestFeed } from '@/components/LiveRequestFeed';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Integration Hub
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Universal nurse call system integration for PatientCompanion
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-gray-700">All Systems Operational</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Dashboard Stats */}
          <DashboardStats />

          {/* Integration Map */}
          <IntegrationMap />

          {/* Live Request Feed */}
          <LiveRequestFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Built for PatientCompanion • Universal Integration Hub Demo
          </p>
        </div>
      </footer>
    </div>
  );
}