import { useState, useCallback } from "react";

const PriceFilter = () => {
  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(10000);
  const minLimit = 0;
  const maxLimit = 20000;

 const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Math.min(Number(e.target.value), maxValue - 1);
  setMinValue(value);
}, [maxValue]);

const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Math.max(Number(e.target.value), minValue + 1);
  setMaxValue(value);
}, [minValue]);


  const minPercent = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-6">

      <div className="bg-orange-100 rounded-lg px-4 py-2 mb-4">
        <h3 className="text-gray-700 font-medium text-base">Price</h3>
      </div>


      <div className="relative mb-4">
        <div className="h-1.5 bg-gray-300 rounded-full relative">

          <div 
            className="absolute h-1.5 bg-orange-400 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />
          
          <div 
            className="absolute w-4 h-4 bg-orange-500 rounded-full shadow-md cursor-pointer transform -translate-y-1 -translate-x-2 border-2 border-white"
            style={{ left: `${minPercent}%` }}
          />
          
          <div 
            className="absolute w-4 h-4 bg-orange-500 rounded-full shadow-md cursor-pointer transform -translate-y-1 -translate-x-2 border-2 border-white"
            style={{ left: `${maxPercent}%` }}
          />
        </div>
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-1.5 opacity-0 cursor-pointer"
          style={{ zIndex: 1 }}
        />
        
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-1.5 opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
      </div>

  
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={`${minValue}`}
            readOnly
            className="w-full px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1">
          <input
            type="text"
            value={`${maxValue}`}
            readOnly
            className="w-full px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-md text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;