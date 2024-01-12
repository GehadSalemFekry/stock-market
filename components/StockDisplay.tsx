interface Stock {
  symbol: string;
  name: string;
  price: number;
}

interface StockDisplayProps {
  stocks: Stock[];
}

const StockDisplay: React.FC<StockDisplayProps> = ({ stocks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-bold">
            {stock.name} ({stock.symbol})
          </h2>
          <p>${stock.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default StockDisplay;
