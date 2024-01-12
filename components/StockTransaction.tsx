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

const StockTransaction: React.FC<StockTransactionProps> = ({
  stock,
  onTransactionComplete,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [isModalOpen, setIsModalOpen] = useState(true); // Assuming modal opens by default

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

  const closeModal = () => {
    onTransactionComplete();
    setIsModalOpen(false);
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
        !isModalOpen && "hidden"
      }`}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-lg font-bold mb-4">{`Perform a transaction for ${stock.name}`}</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-4 rounded-lg shadow"
        >
          <div>
            <label
              htmlFor="transactionType"
              className="block text-sm font-medium text-gray-700"
            >
              Transaction Type:
            </label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) =>
                setTransactionType(e.target.value as "buy" | "sell")
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {transactionType === "buy" ? "Buy" : "Sell"}
            </button>
          </div>
        </form>

        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
        >
          &times; {/* This is a simple 'close' button */}
        </button>
      </div>
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
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 500)
  );
}

export default StockTransaction;
