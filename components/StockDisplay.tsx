"use client";

import React, { useState } from "react";
import StockTransaction from "./StockTransaction";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Stock {
  symbol: string;
  name: string;
  price: number;
  historicalData: number[];
}

interface StockDisplayProps {
  stocks: Stock[];
}

const StockDisplay: React.FC<StockDisplayProps> = ({ stocks }) => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
    // Optionally open a modal or navigate to the transaction page
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stocks.map((stock) => {
        const data = {
          labels: stock.historicalData.map((_, index) => `Day ${index + 1}`),
          datasets: [
            {
              label: "Price",
              data: stock.historicalData,
              fill: false,
              backgroundColor: "rgb(75, 192, 192)",
              borderColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        };

        return (
          <div
            key={stock.symbol}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
            onClick={() => handleStockClick(stock)}
          >
            <h2 className="font-bold">
              {stock.name} ({stock.symbol})
            </h2>
            <p>${stock.price.toFixed(2)}</p>
            <div>
              <Line data={data} />
            </div>
          </div>
        );
      })}

      {selectedStock && (
        <StockTransaction
          stock={selectedStock}
          onTransactionComplete={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default StockDisplay;
