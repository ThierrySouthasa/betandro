import { FaFutbol } from 'react-icons/fa';

interface PronosticCardProps {
  equipe1: string;
  equipe2: string;
  cote: number;
  pronostic?: string;
  result?: string;
  prediction?: string;
}

export default function PronosticCard({
  equipe1,
  equipe2,
  cote,
  pronostic,
  result,
  prediction,
}: PronosticCardProps) {
  const borderColor =
    result === 'WON' ? 'border-green-500'
      : result === 'LOST'
      ? 'border-red-500'
      : 'border-blue-500';

  return (
    <div className="w-[300px] bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-sm p-4 space-y-4">
      <div className="text-left pl-2">
        <span className="text-gray-300 font-semibold text-sm">{result}</span>
      </div>

      <div className={`w-[95%] mx-auto border-t ${borderColor}`}></div>

      <div className="flex items-center justify-between">
        <div className="w-[40px] flex items-center justify-end pr-3">
          <FaFutbol className="w-5 h-5 text-gray-300" />
        </div>

        <div className="h-6 w-px bg-gray-700 mx-2"></div>

        <div className="flex-1 pl-2 flex flex-col items-start">
          <span className="text-gray-300 text-sm">{equipe1}</span>
          <span className="text-gray-300 text-sm">{equipe2}</span>
        </div>

        <div className="h-6 w-px bg-gray-700 mx-2"></div>

        <div className="flex flex-col items-center px-2">
          <span className="text-gray-300 text-sm">Cote</span>
          <strong className="text-white text-sm">{cote}</strong>
        </div>
      </div>

      <div className={`w-[95%] mx-auto border-t ${borderColor}`}></div>

      <div className="text-center">
      <span className="text-gray-300 text-sm">
  {pronostic ? (
    <>
      Pronostic : <strong className="text-orange-500">{pronostic}</strong>
    </>
  ) : (
    <>
      Pari : <strong className="text-orange-500">{prediction}</strong>
    </>
  )}
</span>

      </div>
    </div>
  );
}
