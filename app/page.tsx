"use client";

import React, { useEffect, useState } from "react";
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

// add the stock interface
interface Stock {
  symbol: string;
  name: string;
  price: number;
  historicalData: number[];
}

const StocksPage = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8081");

    // Connection opened
    socket.onopen = () => {
      console.log("Connection opened");
    };

    // Listen for messages
    socket.onmessage = (event) => {
      const fetchedStocks = JSON.parse(event.data);

      console.log("update", fetchedStocks);

      // setStocks((currentStocks) => {
      //   fetchedStocks.forEach((stock: Stock) => {
      //     const existingStockIndex = currentStocks.findIndex(
      //       (s) => s.symbol === stock.symbol
      //     );
      //     if (existingStockIndex >= 0) {
      //       // Update the existing stock
      //       const updatedStocks = [...currentStocks];
      //       updatedStocks[existingStockIndex] = {
      //         ...updatedStocks[existingStockIndex],
      //         price: stock.price,
      //         historicalData: [
      //           ...updatedStocks[existingStockIndex].historicalData,
      //           stock.price,
      //         ],
      //       };
      //       return updatedStocks;
      //     } else {
      //       // Add new stock
      //       return [
      //         ...currentStocks,
      //         { ...stock, historicalData: [stock.price] },
      //       ];
      //     }
      //   });

      //   return currentStocks;
      // });

      setStocks((currentStocks) => {
        // Map through all fetched stocks to update or add their historical data
        return fetchedStocks.map((fetchedStock : Stock) => {
          const existingStock = currentStocks.find(
            (s) => s.symbol === fetchedStock.symbol
          );

          // If the stock already exists, update it
          if (existingStock) {
            return {
              ...fetchedStock,
              historicalData: [
                ...(existingStock.historicalData || []),
                fetchedStock.price,
              ],
            };
          }

          // If it's a new stock, initialize historical data
          return { ...fetchedStock, historicalData: [fetchedStock.price] };
        });
      });

      console.log("Stocks: ", stocks);
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("Connection closed", event);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stocks Overview</h1>
      <StockDisplay stocks={stocks} />
    </div>
  );
};

export default StocksPage;
