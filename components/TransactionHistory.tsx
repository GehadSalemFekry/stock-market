import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  symbol: string;
  quantity: number;
  transactionType: "buy" | "sell";
  price: number;
  date: string; // TODO: ISO date string
}

interface TransactionHistoryProps {
  userId: string; // TODO: assuming you identify users by some ID
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // TODO: Fetch the transaction history from the backend
    const fetchTransactions = async () => {
      const response = await fetch(`/api/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, [userId]);

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
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="bg-white border-b">
              <td className="py-4 px-6">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="py-4 px-6">{transaction.symbol}</td>
              <td className="py-4 px-6">{transaction.transactionType}</td>
              <td className="py-4 px-6">{transaction.quantity}</td>
              <td className="py-4 px-6">{transaction.price.toFixed(2)}</td>
              <td className="py-4 px-6">{(transaction.quantity * transaction.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
