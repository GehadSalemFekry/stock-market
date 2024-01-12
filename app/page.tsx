import React from "react";
import StockDisplay from "@/components/StockDisplay";

// TODO: Mock data for stocks
const mockStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 150.1,
    historicalData: [145.12, 146.15, 147.36, 148.45, 149.5, 150.1], // Example historical prices
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 250.55,
    historicalData: [240.11, 242.3, 243.22, 245.33, 248.7, 250.55],
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 650.75,
    historicalData: [630.2, 640.15, 645.3, 648.45, 650.0, 650.75],
  },
  // Add more mock stocks as necessary
];

const StocksPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stocks Overview</h1>
      <StockDisplay stocks={mockStocks} />
    </div>
  );
};

export default StocksPage;
