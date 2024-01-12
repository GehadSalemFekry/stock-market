import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  // TODO: You can add more fields as needed, such as historical prices, market cap, etc.
});

const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

export default Stock;
