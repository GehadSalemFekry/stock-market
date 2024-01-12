import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  holdings: [
    {
      stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
      },
      quantity: Number,
    },
  ],
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
