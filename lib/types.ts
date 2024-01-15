export interface Stock {
  symbol: string;
  name: string;
  price: number;
  availableQuantity: number;
  historicalData: number[];
}

export interface Transaction {
  symbol: string;
  quantity: number;
  type: "buy" | "sell";
  price: number;
  date: string;
}

export interface TransactionRequest {
  userEmail: string;
  symbol: string;
  quantity: number;
  type: "buy" | "sell";
  price: number;
}