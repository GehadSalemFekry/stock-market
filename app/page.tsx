"use client";

import React, { useEffect, useState } from "react";
import StockDisplay from "@/components/StockDisplay";
import { Stock } from "@/lib/types";
import { useStocks } from "@/context/StocksContext";
import { useWebSocket } from "@/context/WebSocketContext";

const StocksPage = () => {
  const { stocks, setStocks } = useStocks();
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    // Connection opened
    socket.onopen = () => {
      console.log("Connection opened");
    };

    // Listen for messages
    socket.onmessage = (event) => {
      const fetchedStocks = JSON.parse(event.data);

      setStocks((currentStocks: Stock[]) => {
        // Map through all fetched stocks to update or add their historical data
        return fetchedStocks.map((fetchedStock: Stock) => {
          const existingStock = currentStocks.find((s: Stock) => s.symbol === fetchedStock.symbol);

          // If the stock already exists, update it
          if (existingStock) {
            return {
              ...fetchedStock,
              historicalData: [...(existingStock.historicalData || []), fetchedStock.price],
            };
          }

          // If it's a new stock, initialize historical data
          return { ...fetchedStock, historicalData: [fetchedStock.price] };
        });
      });
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("Connection closed", event);
    };

    return () => {
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
    };
  }, [socket]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stocks Overview</h1>
      <StockDisplay stocks={stocks} />
    </div>
  );
};

export default StocksPage;
