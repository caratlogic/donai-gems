import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const TYPES = ["Origin 1", "Origin 2"];

const OriginFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  return (
    <div className="w-full p-4">
      <div className="mb-3 px-3 py-2 rounded-t-lg bg-[#F0D9B5CC]">
        <h3 className="text-sm font-medium text-[#4B2700CC]">Origin</h3>
      </div>

      <div className="relative px-2">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={twMerge(
              clsx(
                "w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-left focus:outline-none focus:ring-1 focus:ring-orange-300 transition-all duration-200 hover:border-gray-300"
              )
            )}
          >
            <span
              className={twMerge(
                clsx(
                  "text-xs",
                  selectedType ? "text-gray-900" : "text-[#4B2700CC]"
                )
              )}
            >
              {selectedType || "Enter your Origin"}
            </span>
            <ChevronDown
              className={twMerge(
                clsx(
                  "absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 transition-transform duration-200",
                  isOpen && "rotate-180"
                )
              )}
              style={{ color: '#4B2700CC' }}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-md">
              <div className="py-1">
                <button
                  onClick={() => handleSelect("")}
                  className="w-full text-left px-2 py-1.5 text-xs hover:bg-gray-50 text-[#4B2700CC] transition-colors duration-150"
                >
                  Enter your Origin
                </button>
                {TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleSelect(type)}
                    className="w-full text-left px-2 py-1.5 text-xs text-gray-900 hover:bg-orange-50 hover:text-orange-900 transition-colors duration-150"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OriginFilter;
