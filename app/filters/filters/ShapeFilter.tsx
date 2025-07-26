'use client'

import React, { useState } from 'react'


const SHAPES = [
  {
    label: "Round",
    value: "round",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 4L29.8 8.4L36 18L29.8 31.6L20 36L10.2 31.6L4 18L10.2 8.4L20 4Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="8"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M20 4L20 12M29.8 8.4L25.66 14.34M36 18L28 18M29.8 31.6L25.66 25.66M20 36L20 28M10.2 31.6L14.34 25.66M4 18L12 18M10.2 8.4L14.34 14.34"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Princess",
    value: "princess",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <rect
          x="12"
          y="12"
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M8 8L12 12M32 8L28 12M32 32L28 28M8 32L12 28"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M20 8V12M32 20H28M20 32V28M8 20H12"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Cushion",
    value: "cushion",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 6C8.686 6 6 8.686 6 12V28C6 31.314 8.686 34 12 34H28C31.314 34 34 31.314 34 28V12C34 8.686 31.314 6 28 6H12Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M12 10C10.895 10 10 10.895 10 12V28C10 29.105 10.895 30 12 30H28C29.105 30 30 29.105 30 28V12C30 10.895 29.105 10 28 10H12Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path d="M20 6V10M34 20H30M20 34V30M6 20H10" stroke="currentColor" strokeWidth="0.5" />
        <path
          d="M12 6L14 8M28 6L26 8M28 34L26 32M12 34L14 32"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Emerald",
    value: "emerald",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 12L12 8H28L32 12V28L28 32H12L8 28V12Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M12 12L16 16H24L28 12"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M12 28L16 24H24L28 28"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M12 8V12M28 8V12M32 12V28M28 32V28M12 32V28M8 28V12"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <rect
          x="16"
          y="16"
          width="8"
          height="8"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Oval",
    value: "oval",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="20"
          cy="20"
          rx="12"
          ry="16"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="8"
          ry="12"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M20 4V8M20 32V36M8 20H12M32 20H28"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M26.93 8.54L25.17 10.3M13.07 8.54L14.83 10.3M26.93 31.46L25.17 29.7M13.07 31.46L14.83 29.7"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Radiant",
    value: "radiant",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 14L10 10H30L34 14V26L30 30H10L6 26V14Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M10 14L14 18H26L30 14"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M10 26L14 22H26L30 26"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="14"
          y="18"
          width="12"
          height="4"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M10 10L14 14M30 10L26 14M30 30L26 26M10 30L14 26"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Asscher",
    value: "asscher",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 12L12 8H28L32 12V28L28 32H12L8 28V12Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M12 12L20 20L28 12"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M12 28L20 20L28 28"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M12 12L20 20M28 12L20 20M28 28L20 20M12 28L20 20"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle
          cx="20"
          cy="20"
          r="4"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Marquise",
    value: "marquise",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 4C28 8 34 14 34 20C34 26 28 32 20 36C12 32 6 26 6 20C6 14 12 8 20 4Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M20 8C25 10 28 15 28 20C28 25 25 30 20 32C15 30 12 25 12 20C12 15 15 10 20 8Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M20 4V8M20 32V36M6 20H12M34 20H28"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M27.32 8.68L25.66 10.34M12.68 8.68L14.34 10.34M27.32 31.32L25.66 29.66M12.68 31.32L14.34 29.66"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Heart",
    value: "heart",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 34L6 20C6 14.477 10.477 10 16 10C17.5 10 19 10.5 20 11.5C21 10.5 22.5 10 24 10C29.523 10 34 14.477 34 20L20 34Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M20 28L10 18C10 15.791 11.791 14 14 14C15 14 16 14.5 16.5 15C17 14.5 18 14 19 14C21.209 14 23 15.791 23 18L20 28Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M16 10C14 12 14 14 16 16M24 10C26 12 26 14 24 16"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M20 18V22M16 20H24"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
  {
    label: "Pear",
    value: "pear",
    svg: (
      <svg
        width={32}
        height={32}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 4C28 4 34 10 34 18C34 26 28 32 20 32C12 32 6 26 6 18C6 14 8 10 12 8L20 4Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M20 8C25 8 28 11 28 16C28 21 25 24 20 24C15 24 12 21 12 16C12 13 13.5 10.5 16 9.5L20 8Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M20 4V8M12 8L14 10M34 18H28M20 32V28M6 18H12"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M29.66 10.34L28 12M10.34 10.34L12 12"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    ),
  },
]

const SHAPE_ROWS = [
  SHAPES.slice(0, 4),
  SHAPES.slice(4, 8),
  SHAPES.slice(8, 10),
]

interface ShapeFilterProps {
  selectedShape?: string
  onShapeSelect?: (shape: string) => void
}

const ShapeFilter: React.FC<ShapeFilterProps> = ({
  selectedShape = "round",
  onShapeSelect,
}) => {
  const [selected, setSelected] = useState<string>(selectedShape)

  const handleShapeClick = (shapeValue: string) => {
    setSelected(shapeValue)
    onShapeSelect?.(shapeValue)
  }

  return (
    <div className="w-full p-4">
 
      <div
        className="mb-3 px-3 py-2 rounded-t-lg"
        style={{ backgroundColor: '#C8A882' }}
      >
        <h3 className="text-sm font-medium text-white">Shape</h3>
      </div>

 
      <div className="flex flex-col gap-2 px-2">
        {SHAPE_ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={
              row.length === 2
                ? "grid grid-cols-2 gap-2 justify-center"
                : "grid grid-cols-4 gap-2"
            }
          >
            {row.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleShapeClick(shape.value)}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-md border transition-all
                  ${
                    selected === shape.value
                      ? "border-[#C8A882] bg-[#C8A882]/10"
                      : "border-transparent hover:border-[#C8A882]/50 hover:bg-gray-50"
                  }
                  focus:outline-none focus:ring-2 focus:ring-[#C8A882]
                `}
                style={{ minWidth: 64, minHeight: 80 }}
                type="button"
                aria-pressed={selected === shape.value}
              >
                <div
                  className={`
                  mb-2 w-8 h-8 flex items-center justify-center transition-colors duration-200
                  ${
                    selected === shape.value ? "text-[#C8A882]" : "text-[#B6A087]"
                  }
                `}
                >
                  {shape.svg}
                </div>
                <span
                  className={`
                  text-[11px] font-medium transition-colors duration-200 select-none
                  ${
                    selected === shape.value ? "text-[#6E4C2B]" : "text-gray-500"
                  }
                `}
                >
                  {shape.label}
                </span>
                {selected === shape.value && (
                  <div
                    className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#C8A882] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShapeFilter