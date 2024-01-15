"use client";

import React, { useEffect, useState } from "react";
import { Transaction } from "@/lib/types";

interface TransactionHistoryProps {
  userEmail: string; 
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userEmail }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?userEmail=${encodeURIComponent(userEmail)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransactions(data.transactions); 
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchTransactions();
    }
  }, [userEmail]);

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Stock Symbol
            </th>
            <th scope="col" className="py-3 px-6">
              Type
            </th>
            <th scope="col" className="py-3 px-6">
              Quantity
            </th>
            <th scope="col" className="py-3 px-6">
              Price
            </th>
            <th scope="col" className="py-3 px-6">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-4 px-6">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="py-4 px-6">{transaction.symbol}</td>
              <td className="py-4 px-6">{transaction.type}</td>
              <td className="py-4 px-6">{transaction.quantity}</td>
              <td className="py-4 px-6">{transaction.price?.toFixed(2)}</td>
              <td className="py-4 px-6">
                {(transaction.quantity * transaction.price)?.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
