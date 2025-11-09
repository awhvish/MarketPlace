'use client';

import React from 'react';

interface Bid {
  id: string;
  amount: number;
  createdAt: string;
  user: {
    username: string;
  };
}

interface BidHistoryProps {
  bids: Bid[];
  currentPrice?: number;
}

function BidHistory({ bids, currentPrice }: BidHistoryProps) {
  if (!bids || bids.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-white mb-4">Bid History</h3>
        <p className="text-gray-400">No bids yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-white mb-4">Bid History</h3>
      {currentPrice && (
        <p className="text-sm text-gray-400 mb-4">
          Current Price: ${currentPrice.toLocaleString()}
        </p>
      )}
      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-white font-medium">{bid.user.username}</p>
              <p className="text-gray-400 text-sm">
                {new Date(bid.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="text-white font-bold">${bid.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BidHistory;