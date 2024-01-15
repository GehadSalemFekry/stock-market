import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  holdings: [
    {
      symbol: String,
      quantity: Number,
      price: Number,
    },
  ],
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
