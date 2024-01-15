import Wallet from "@/lib/models/wallet.model";
import connectToDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("userEmail");

  await connectToDB();

  try {
    const wallet = await Wallet.findOne({ userEmail });

    if (!wallet) {
      return new NextResponse("Wallet not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(wallet), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse("Error fetching wallet", {
      status: 500,
    });
  }
};
