import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Stock } from "@/lib/types";
import { useWebSocket } from "@/context/WebSocketContext";


interface StockTransactionProps {
  stock: Stock;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const StockTransaction: React.FC<StockTransactionProps> = ({
  stock,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const { data: session } = useSession();
  const { socket } = useWebSocket();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      alert("You must be logged in to perform a transaction.");
      return;
    }

    // Create a transaction object
    const transaction = {
      userEmail: session.user?.email, 
      symbol: stock.symbol,
      quantity: quantity,
      price: stock.price, 
      type: transactionType,
    };

    // Send the transaction to the server
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // If the transaction is successful, send it via the WebSocket
      if (socket && socket.readyState === WebSocket.OPEN) {
        const wsTransaction = {
          symbol: transaction.symbol,
          quantity: transaction.quantity,
          isBuy: transaction.type === "buy",
        };

        socket.send(JSON.stringify(wsTransaction));
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!session && isModalOpen) {
    closeModal();
    alert("You must be logged in to perform a transaction.");
    return;
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
        !isModalOpen && "hidden"
      }`}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-lg font-bold mb-4">{`Perform a transaction for ${stock.name}`}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">
              Transaction Type:
            </label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as "buy" | "sell")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
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
          &times;
        </button>
      </div>
    </div>
  );
};

export default StockTransaction;
