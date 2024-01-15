import { authOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WalletDetails from "@/components/WalletDetails";
import TransactionHistory from "@/components/TransactionHistory";

const TransactionHistoryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login/?callbackUrl=/dashboard");
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Transaction History</h1>
      {session.user?.email && <TransactionHistory userEmail={session.user.email} />}
    </div>
  );
};

export default TransactionHistoryPage;
