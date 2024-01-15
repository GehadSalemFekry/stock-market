"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Stock } from "@/lib/types";

interface StocksContextType {
  stocks: Stock[];
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
}

const StocksContext = createContext<StocksContextType | undefined>(undefined);

export const useStocks = () => {
  const context = useContext(StocksContext);
  if (context === undefined) {
    throw new Error("useStocks must be used within a StocksProvider");
  }
  return context;
};

interface StocksProviderProps {
  children: ReactNode;
}

export const StocksProvider: React.FC<StocksProviderProps> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>(() => {
    // Load stocks from localStorage
    const savedStocks = localStorage.getItem("stocks");
    return savedStocks ? JSON.parse(savedStocks) : [];
  });

  useEffect(() => {
    // Update localStorage when stocks change
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  return <StocksContext.Provider value={{ stocks, setStocks }}>{children}</StocksContext.Provider>;
};
