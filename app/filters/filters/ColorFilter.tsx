import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(...inputs));

const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K"];

const ColorFilter = () => {
  const [selectedRange, setSelectedRange] = useState({ start: 3, end: 6 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"start" | "end" | null>(null);

  const handleMouseDown = (type: "start" | "end", e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragType(type);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragType) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const progress = Math.max(0, Math.min(1, x / width));
    const index = Math.round(progress * (COLORS.length - 1));

    if (dragType === "start") {
      setSelectedRange((prev) => ({
        ...prev,
        start: Math.min(index, prev.end - 1),
      }));
    } else {
      setSelectedRange((prev) => ({
        ...prev,
        end: Math.max(index, prev.start + 1),
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [isDragging]);

  const getSliderPosition = (index: number) => {
    return (index / (COLORS.length - 1)) * 100;
  };

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="mb-3 px-3 py-2 rounded-t-lg" style={{ backgroundColor: "#F0D9B5CC" }}>
        <h3 className="text-sm font-medium" style={{ color: "#4B2700CC" }}>
          Color
        </h3>
      </div>

      <div className="relative px-2">
        {/* Track */}
        <div
          className="relative h-1 bg-gray-200 rounded-full cursor-pointer select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {/* Highlighted range */}
          <div
            className="absolute h-1 rounded-full"
            style={{
              backgroundColor: "#B57E42",
              left: `${getSliderPosition(selectedRange.start)}%`,
              width: `${getSliderPosition(selectedRange.end) - getSliderPosition(selectedRange.start)}%`,
            }}
          />

          {/* Start Thumb */}
          <div
            className={cn(
              "absolute w-3 h-3 rounded-full border border-white shadow-sm cursor-grab active:cursor-grabbing",
              "transform -translate-x-1/2 -translate-y-1 hover:scale-110 transition-transform duration-200"
            )}
            style={{
              backgroundColor: "#B57E42",
              left: `${getSliderPosition(selectedRange.start)}%`,
            }}
            onMouseDown={(e) => handleMouseDown("start", e)}
          />

          {/* End Thumb */}
          <div
            className={cn(
              "absolute w-3 h-3 rounded-full border border-white shadow-sm cursor-grab active:cursor-grabbing",
              "transform -translate-x-1/2 -translate-y-1 hover:scale-110 transition-transform duration-200"
            )}
            style={{
              backgroundColor: "#B57E42",
              left: `${getSliderPosition(selectedRange.end)}%`,
            }}
            onMouseDown={(e) => handleMouseDown("end", e)}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-3 px-1">
          {COLORS.map((color, index) => {
            const isSelected = index >= selectedRange.start && index <= selectedRange.end;
            return (
              <div
                key={color}
                className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110"
                onClick={() => {
                  const distanceToStart = Math.abs(index - selectedRange.start);
                  const distanceToEnd = Math.abs(index - selectedRange.end);

                  if (distanceToStart <= distanceToEnd) {
                    setSelectedRange((prev) => ({
                      ...prev,
                      start: Math.min(index, prev.end - 1),
                    }));
                  } else {
                    setSelectedRange((prev) => ({
                      ...prev,
                      end: Math.max(index, prev.start + 1),
                    }));
                  }
                }}
              >
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-200",
                    isSelected ? "text-[#B57E42] font-semibold" : "text-gray-400 font-normal"
                  )}
                >
                  {color}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorFilter;
