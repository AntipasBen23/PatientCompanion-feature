/**
 * Live Request Feed Component
 * Displays real-time streaming patient requests
 */

'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { generateMockRequest } from '@/lib/mockData';
import { RequestItem } from './RequestItem';

export function LiveRequestFeed() {
  const { requests, addRequest } = useStore();

  useEffect(() => {
    // Generate new request every 3-5 seconds
    const interval = setInterval(() => {
      const newRequest = generateMockRequest();
      addRequest(newRequest);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [addRequest]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Live Request Feed</h2>
        <p className="mt-1 text-sm text-gray-500">
          Real-time patient requests from all connected systems
        </p>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto p-4">
        {requests.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-gray-500">
            Waiting for requests...
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}