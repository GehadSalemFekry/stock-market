"use client";

import React, { useState, useEffect } from "react";
import { useStocks } from "@/context/StocksContext";

interface StockHolding {
  symbol: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
}

interface WalletDetailsProps {
  userEmail: string;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ userEmail }) => {
  const [balance, setBalance] = useState<number>(0);
  const [holdings, setHoldings] = useState<StockHolding[]>([]);
  const { stocks } = useStocks();
  console.log("stocks", stocks);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!userEmail) return;

      try {
        const response = await fetch(`/api/wallet?userEmail=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Wallet data:", data);
        setBalance(data.balance);
        setHoldings(
          data.holdings.map((holding: any) => {
            const currentPrice = stocks.find((s) => s.symbol === holding.symbol)?.price || 0;

            return {
              symbol: holding.symbol,
              quantity: holding.quantity,
              purchasePrice: holding.price,
              currentPrice
            };
          })
        );
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
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
      <h3 className="text-lg font-semibold border-b pb-2 mb-4">Wallet Details</h3>
      <div className="mb-4">
        <span className="text-gray-700">Balance:</span>
        <span className="ml-2 text-gray-900">${balance?.toFixed(2)}</span>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Stock Holdings:</h4>
        {holdings.length > 0 ? (
          <ul>
            {holdings.map((holding) => {
              const profit = (holding.currentPrice - holding.purchasePrice) * holding.quantity;
              return (
                <li key={holding.symbol} className="mb-2">
                  <span className="text-gray-700">{holding.symbol}:</span>
                  <span className="ml-2 text-gray-900">
                    {holding.quantity} shares @ ${holding.currentPrice?.toFixed(2)}
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
        <span className="ml-2 text-gray-900">${totalHoldingsValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default WalletDetails;
