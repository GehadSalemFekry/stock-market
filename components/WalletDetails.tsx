"use client";

import React, { useState, useEffect } from "react";

interface StockHolding {
  symbol: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
}

interface WalletDetailsProps {
  userEmail: string | null | undefined;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ userEmail }) => {
  const [balance, setBalance] = useState<number>(0);
  const [holdings, setHoldings] = useState<StockHolding[]>([]);

  useEffect(() => {
    const mockWalletData = {
      balance: 10000,
      holdings: [
        {
          symbol: "AAPL",
          quantity: 50,
          currentPrice: 150.0,
          purchasePrice: 120.0,
        },
        {
          symbol: "MSFT",
          quantity: 30,
          currentPrice: 250.0,
          purchasePrice: 200.0,
        },
        {
          symbol: "GOOG",
          quantity: 20,
          currentPrice: 300.0,
          purchasePrice: 310.0,
        },
      ],
    };
    setTimeout(() => {
      setBalance(mockWalletData.balance);
      setHoldings(mockWalletData.holdings);
    }, 1000);
  }, [userEmail]);

  // Calculate the total value of the holdings
  const totalHoldingsValue = holdings.reduce(
    (acc, holding) => acc + holding.quantity * holding.currentPrice,
    0
  );

  const getProfitClass = (profit: number) => {
    return profit >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold border-b pb-2 mb-4">
        Wallet Details
      </h3>
      <div className="mb-4">
        <span className="text-gray-700">Balance:</span>
        <span className="ml-2 text-gray-900">${balance.toFixed(2)}</span>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Stock Holdings:</h4>
        {holdings.length > 0 ? (
          <ul>
            {holdings.map((holding) => {
              const profit =
                (holding.currentPrice - holding.purchasePrice) *
                holding.quantity;
              return (
                <li key={holding.symbol} className="mb-2">
                  <span className="text-gray-700">{holding.symbol}:</span>
                  <span className="ml-2 text-gray-900">
                    {holding.quantity} shares @ $
                    {holding.currentPrice.toFixed(2)}
                    <span className={`${getProfitClass(profit)}`}>
                      {" "}
                      (Profit: ${profit.toFixed(2)})
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-600">No current holdings.</p>
        )}
      </div>
      <div className="pt-4 border-t">
        <span className="text-gray-700">Total Holdings Value:</span>
        <span className="ml-2 text-gray-900">
          ${totalHoldingsValue.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default WalletDetails;
