'use client';

import React from 'react';
import { TrendingUp, Users, Clock } from 'lucide-react';

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
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Bid History</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400">No bids yet. Be the first to place a bid!</p>
        </div>
      </div>
    );
  }

  // Sort bids by amount (highest first)
  const sortedBids = [...bids].sort((a, b) => Number(b.amount) - Number(a.amount));
  const highestBidAmount = sortedBids.length > 0 ? Number(sortedBids[0].amount) : 0;

  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Bid History</h3>
        </div>
        {currentPrice && (
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10">
            <span className="text-sm text-gray-400">Current:</span>
            <span className="text-lg font-bold gradient-text">${currentPrice.toLocaleString()}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {sortedBids.map((bid, index) => {
          const isHighestBid = Number(bid.amount) === highestBidAmount;
          
          return (
            <div
              key={bid.id}
              className="glass-hover rounded-xl p-4 border border-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isHighestBid 
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                      : 'bg-gradient-to-br from-purple-600 to-pink-600'
                  }`}>
                    <span className="text-sm font-bold text-white">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{bid.user.username}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(bid.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold gradient-text">${bid.amount.toLocaleString()}</p>
                  {isHighestBid && (
                    <span className="text-xs text-green-400 font-medium">Highest Bid</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BidHistory;