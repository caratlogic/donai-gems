import { useState, useCallback } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";


const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(...inputs));

const CaratFilter = () => {
  const [minValue, setMinValue] = useState(1234);
  const [maxValue, setMaxValue] = useState(3000); 

  const minLimit = 0;
  const maxLimit = 5000;

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(Number(e.target.value), maxValue - 1);
      setMinValue(value);
    },
    [maxValue]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(Number(e.target.value), minValue + 1);
      setMaxValue(value);
    },
    [minValue]
  );

  const minPercent = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div className="w-full p-4">

      <div className="rounded-t-lg px-3 py-2 mb-3" style={{ backgroundColor: "#C49A6C" }}>
        <h3 className="text-white font-medium text-sm">Carat</h3>
      </div>

      <div className="relative mb-3 px-2">
        <div className="h-1 bg-gray-200 rounded-full relative">

          <div
            className="absolute h-1 rounded-full"
            style={{
              backgroundColor: "#B57E42",
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
      
          <div
            className="absolute w-3 h-3 rounded-full shadow-sm cursor-pointer transform -translate-y-1 -translate-x-1.5 border border-white"
            style={{
              backgroundColor: "#B57E42",
              left: `${minPercent}%`,
            }}
          />
          <div
            className="absolute w-3 h-3 rounded-full shadow-sm cursor-pointer transform -translate-y-1 -translate-x-1.5 border border-white"
            style={{
              backgroundColor: "#B57E42",
              left: `${maxPercent}%`,
            }}
          />
        </div>

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={handleMinChange}
          className={cn("absolute w-full h-1 opacity-0 cursor-pointer")}
          style={{ zIndex: 1, top: "-2px" }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={handleMaxChange}
          className={cn("absolute w-full h-1 opacity-0 cursor-pointer")}
          style={{ zIndex: 2, top: "-2px" }}
        />
      </div>


      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={minValue}
            readOnly
            className={cn(
              "w-full px-2 py-1.5 text-xs text-center rounded border",
              "text-gray-700 bg-gray-50 border-gray-200",
              "focus:outline-none focus:ring-1 focus:ring-orange-300"
            )}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={maxValue}
            readOnly
            className={cn(
              "w-full px-2 py-1.5 text-xs text-center rounded border",
              "text-gray-700 bg-gray-50 border-gray-200",
              "focus:outline-none focus:ring-1 focus:ring-orange-300"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CaratFilter;
