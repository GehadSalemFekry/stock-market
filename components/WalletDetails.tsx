// components/WalletDetails.tsx

import React, { useState, useEffect } from "react";

interface StockHolding {
  symbol: string;
  quantity: number;
  currentPrice: number; // The latest price from the stock pricing service
}

interface WalletDetailsProps {
  userId: string; // assuming you identify users by some ID
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ userId }) => {
  const [balance, setBalance] = useState<number>(0);
  const [holdings, setHoldings] = useState<StockHolding[]>([]);

  useEffect(() => {
    // TODO: Replace this URL with your actual endpoint that returns the wallet details
    const fetchWalletDetails = async () => {
      try {
        const response = await fetch(`/api/wallet/${userId}`);
        const walletData = await response.json();
        setBalance(walletData.balance);
        setHoldings(walletData.holdings);
      } catch (error) {
        console.error("Failed to fetch wallet details:", error);
      }
    };

    fetchWalletDetails();
  }, [userId]);

  // Calculate the total value of the holdings
  const totalHoldingsValue = holdings.reduce(
    (acc, holding) => acc + holding.quantity * holding.currentPrice,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold border-b pb-2 mb-4">Wallet Details</h3>
      <div className="mb-4">
        <span className="text-gray-700">Balance:</span>
        <span className="ml-2 text-gray-900">${balance.toFixed(2)}</span>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Stock Holdings:</h4>
        {holdings.length > 0 ? (
          <ul>
            {holdings.map((holding) => (
              <li key={holding.symbol} className="mb-2">
                <span className="text-gray-700">{holding.symbol}:</span>
                <span className="ml-2 text-gray-900">
                  {holding.quantity} shares @ ${holding.currentPrice.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No current holdings.</p>
        )}
      </div>
      <div className="pt-4 border-t">
        <span className="text-gray-700">Total Holdings Value:</span>
        <span className="ml-2 text-gray-900">${totalHoldingsValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default WalletDetails;
