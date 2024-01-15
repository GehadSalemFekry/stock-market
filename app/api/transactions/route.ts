import Transaction from "@/lib/models/transaction.model";
import Wallet from "@/lib/models/wallet.model";
import connectToDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const transactionData = await request.json();

  await connectToDB();

  // Create a new transaction
  const newTransaction = new Transaction(transactionData);

  try {
    // Retrieve or create the user's wallet
    let wallet = await Wallet.findOne({ userEmail: transactionData.userEmail });
    if (!wallet) {
      // Create a new wallet with a mock balance
      wallet = new Wallet({
        userEmail: transactionData.userEmail,
        balance: 100000,
        holdings: [],
      });
    }

    // Update wallet balance and validate transaction
    const transactionAmount = transactionData.quantity * transactionData.price;

    if (transactionData.type === "sell") {
      const holding = wallet.holdings.find(
        (h: { symbol: String; quantity: Number; price: Number }) =>
          h.symbol === transactionData.symbol
      );
      if (!holding || holding.quantity < transactionData.quantity) {
        throw new Error("Not enough holdings to sell");
      }
      holding.quantity -= transactionData.quantity;
      wallet.balance += transactionAmount;
    } else {
      if (wallet.balance < transactionAmount) {
        throw new Error("Insufficient funds to complete the purchase");
      }

      wallet.balance -= transactionAmount;
      const holdingIndex = wallet.holdings.findIndex(
        (h: { symbol: String; quantity: Number; price: Number }) =>
          h.symbol === transactionData.symbol
      );
      if (holdingIndex > -1) {
        wallet.holdings[holdingIndex].quantity += transactionData.quantity;
      } else {
        wallet.holdings.push({
          symbol: transactionData.symbol,
          quantity: transactionData.quantity,
          price: transactionData.price,
        });
      }
    }

    // Save the transaction and the updated wallet
    await newTransaction.save();
    await wallet.save();

    return new NextResponse("Transaction saved successfully", {
      status: 201,
    });
  } catch (error: any) {
    console.error("Transaction save error:", error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("userEmail");

  await connectToDB();

  try {
    const transactions = await Transaction.find({ userEmail });
    return new NextResponse(JSON.stringify({ success: true, transactions }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse("Error retrieving transactions", {
      status: 500,
    });
  }
};
