'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JewelryItem {
  stockId: string;
  productType: string;
  category: string;
  stoneType: string;
  color: string;
  carat: string;
  origin: string;
  treatment: string;
  availability: string;
  certificate: string;
  measurement: string;
}

const sampleData: JewelryItem[] = [
  {
    stockId: 'DNJ001',
    productType: 'Jewelry',
    category: 'Ring',
    stoneType: 'nat sapphire',
    color: 'royal Blue',
    carat: '10.05',
    origin: 'Madagascar',
    treatment: 'no indication',
    availability: 'yes',
    certificate: 'GRS',
    measurement: '13.88X11.84X6.40MM'
  },
  {
    stockId: 'RBY002',
    productType: 'Gemstone',
    category: 'Loose Stone',
    stoneType: 'natural ruby',
    color: 'pigeon blood',
    carat: '3.42',
    origin: 'Myanmar',
    treatment: 'heated',
    availability: 'yes',
    certificate: 'GIA',
    measurement: '9.12X7.88X4.21MM'
  },
  {
    stockId: 'EMD003',
    productType: 'Jewelry',
    category: 'Necklace',
    stoneType: 'natural emerald',
    color: 'vivid green',
    carat: '5.67',
    origin: 'Colombia',
    treatment: 'minor oil',
    availability: 'no',
    certificate: 'SSEF',
    measurement: '11.25X9.18X6.92MM'
  }
];

export default function JewelryInventoryTable() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (stockId: string): void => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(stockId)) {
      newChecked.delete(stockId);
    } else {
      newChecked.add(stockId);
    }
    setCheckedItems(newChecked);
  };

  const ShapeIndicator = () => (
    <div className="relative w-[37px] h-[36px] mx-auto">
      <div className="absolute inset-0  bg-cover bg-center" />
      <div className="absolute inset-0 bg-black opacity-50" />
    </div>
  );

  return (
    <div className="w-full border rounded-md bg-white overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F0D9B5CC] text-[#4B2700CC]">
            <TableHead className="min-w-[80px] px-3">Shape</TableHead>
            <TableHead className="min-w-[80px] px-3">Stock ID</TableHead>
            <TableHead className="min-w-[100px] px-3">Product Type</TableHead>
            <TableHead className="min-w-[80px] px-3">Category</TableHead>
            <TableHead className="min-w-[90px] px-3">Stone Type</TableHead>
            <TableHead className="min-w-[80px] px-3">Color</TableHead>
            <TableHead className="min-w-[60px] px-3">Carat</TableHead>
            <TableHead className="min-w-[80px] px-3">Origin</TableHead>
            <TableHead className="min-w-[90px] px-3">Treatment</TableHead>
            <TableHead className="min-w-[90px] px-3">Availability</TableHead>
            <TableHead className="min-w-[80px] px-3">Certificate</TableHead>
            <TableHead className="min-w-[140px] px-3">Measurement</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sampleData.map((item) => (
            <TableRow key={item.stockId} className="hover:bg-gray-50">
              <TableCell className="px-3 py-2">
                <ShapeIndicator />
              </TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.stockId}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.productType}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.category}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.stoneType}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.color}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.carat}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.origin}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.treatment}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.availability}</TableCell>
              <TableCell className="px-3 py-2 text-sm text-gray-900">{item.certificate}</TableCell>
              <TableCell className="px-3 py-2 flex items-center gap-2">
                <span className="text-sm text-gray-900">{item.measurement}</span>
                <button
                  onClick={() => toggleCheck(item.stockId)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    checkedItems.has(item.stockId)
                      ? 'bg-[#C49A6C] hover:opacity-80'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {checkedItems.has(item.stockId) && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Load More Button */}
      <div className="flex justify-center py-4 border-t">
        <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition">
          Load More
        </button>
      </div>
    </div>
  );
}
