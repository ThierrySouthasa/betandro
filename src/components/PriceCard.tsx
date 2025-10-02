interface PriceCardProps {
    plan: string;
    description: string;
    price: string;
  }
  
  export default function PriceCard({ plan, description, price }: PriceCardProps) {
    return (
      <div className="w-[300px] bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-sm p-4 space-y-4 text-center">
        {/* Nom de la formule */}
        <h3 className="text-lg font-semibold text-white">{plan}</h3>
  
        {/* Description */}
        <p className="text-sm text-gray-300">{description}</p>
  
        {/* Prix */}
        <p className="text-2xl font-bold text-orange-500">{price}</p>
      </div>
    );
  }
  