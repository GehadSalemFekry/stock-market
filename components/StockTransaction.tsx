import React, { useState } from "react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
}

interface StockTransactionProps {
  stock: Stock;
  onTransactionComplete: () => void;
}

const StockTransaction: React.FC<StockTransactionProps> = ({ stock, onTransactionComplete }) => {
  const [quantity, setQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Call the API to execute the transaction
    const result = await executeTransaction({
      symbol: stock.symbol,
      quantity,
      type: transactionType,
      price: stock.price,
    });

    // Callback to refresh data or notify user
    onTransactionComplete();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg">{`Perform a transaction for ${stock.name}`}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value as "buy" | "sell")}
            className="border rounded px-2 py-1"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {transactionType === "buy" ? "Buy" : "Sell"}
          </button>
        </div>
      </form>
    </div>
  );
};

async function executeTransaction(transactionData: {
  symbol: string;
  quantity: number;
  type: "buy" | "sell";
  price: number;
}) {
  // TODO: This function would interact with your server to execute the transaction
  // Replace with your actual API call logic

  console.log("Transaction data:", transactionData);
  // Mock response
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
}

export default StockTransaction;
