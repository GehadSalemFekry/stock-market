import TransactionHistory from "@/components/TransactionHistory";

const TransactionHistoryPage = () => {
  const userEmail = "user@example.com"; // Replace with dynamic user email

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Transaction History</h1>
      <TransactionHistory userEmail={userEmail} />
    </div>
  );
};

export default TransactionHistoryPage;
