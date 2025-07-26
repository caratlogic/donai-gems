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
import Image from 'next/image';
import myImage  from "../assets/fig1.jpg"
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
  },{
    stockId: 'DNJ004',
    productType: 'Jewelry',
    category: 'Bracelet',
    stoneType: 'Yellow Sapphire',
    color: 'Canary Yellow',
    carat: '12.10',
    origin: 'Sri Lanka',
    treatment: 'Untreated',
    availability: 'Yes',
    certificate: 'GRS',
    measurement: '15.20 x 12.10 x 7.15 mm'
  },
  {
    stockId: 'DNJ005',
    productType: 'Jewelry',
    category: 'Ring',
    stoneType: 'Spinel',
    color: 'Pink',
    carat: '3.45',
    origin: 'Tanzania',
    treatment: 'No Indication',
    availability: 'Yes',
    certificate: 'None',
    measurement: '8.88 x 6.45 x 3.20 mm'
  },
  {
    stockId: 'DNJ006',
    productType: 'Jewelry',
    category: 'Necklace',
    stoneType: 'Amethyst',
    color: 'Purple',
    carat: '18.50',
    origin: 'Brazil',
    treatment: 'No Treatment',
    availability: 'No',
    certificate: 'GIA',
    measurement: '20.00 x 15.00 x 10.00 mm'
  }
];

export default function JewelryInventoryTable() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'table' | 'grid'>('table');

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
  const GridCard = ({ item }: { item: JewelryItem }) => (
    <div className="bg-white border rounded-lg p-4 hover:border-[#4B2700CC] hover:shadow-md transition-all duration-200 max-w-[236px] max-h-[347px]">
    <div className='max-w-[200px] mx-auto mb-4'>
      <Image src={myImage} alt="Jewelry Image" width={200} height={200} className="w-full h-48 object-cover rounded-md mb-4" />
    </div>
    <div className='text-[#4B2700CC]  text-lg mb-2'>
      Stock ID: {item.stockId}
    </div>
    <div className='text-[#4B2700CC] text-lg mb-2'>
      Product Type: {item.productType}
      </div>
      <button className='ml-15 text-[#4B2700CC] border border-[#4B2700CC] px-4 py-2 transition-colors'>
       View
      </button>
    </div>
  );

  
   
  return (
    <div className="max-w-7xl mx-auto w-full relative z-0">
      <div className="flex justify-between items-center mb-4"> 
        <div className="flex gap-0">
          <div
            onClick={() => setActiveTab('table')}
            className={`px-2 py-2  ${activeTab === 'table' ? 'bg-[#F0D9B5CC] text-[#4B2700CC]' : 'bg-gray-200 text-gray-800 '} flex items-center gap-2 cursor-pointer transition-colors `}
          >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
            <div>
            List
            </div>
          </div>
          <div
            onClick={() => setActiveTab('grid')}
            className={`px-2 py-2  ${activeTab === 'grid' ? 'bg-[#F0D9B5CC] text-[#4B2700CC]' : 'bg-gray-200 text-gray-800'} flex items-center gap-2 cursor-pointer transition-colors `}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <div>
            Visuals
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'table' ? (
         <div className="w-full border rounded-md bg-white overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F0D9B5CC] ">
            <TableHead className="min-w-[80px] px-3 text-[#4B2700CC]">Shape</TableHead>
            <TableHead className="min-w-[80px] px-3 text-[#4B2700CC]">Stock ID</TableHead>
            <TableHead className="min-w-[100px] px-3 text-[#4B2700CC]">Product Type</TableHead>
            <TableHead className="min-w-[80px] px-3 text-[#4B2700CC]">Category</TableHead>
            <TableHead className="min-w-[90px] px-3 text-[#4B2700CC]">Stone Type</TableHead>
            <TableHead className="min-w-[80px] px-3 text-[#4B2700CC]">Color</TableHead>
            <TableHead className="min-w-[60px] px-3 text-[#4B2700CC]">Carat</TableHead>
            <TableHead className="min-w-[80px] px-3 text-[#4B2700CC]">Origin</TableHead>
            <TableHead className="min-w-[90px] px-3 text-[#4B2700CC]">Treatment</TableHead>
            <TableHead className="min-w-[90px] px-3 text-[#4B2700CC]">Availability</TableHead>
            <TableHead className="min-w-[80px] px-3 text-[#4B2700CC]">Certificate</TableHead>
            <TableHead className="min-w-[140px] px-3 text-[#4B2700CC]">Measurement</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sampleData.map((item) => (
            <TableRow key={item.stockId} className="hover:border-[#4B2700CC] ">
              <TableCell className="px-3 py-2 hover:border-[#4B2700CC]">
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

      
      <div className="flex justify-center py-4 border-t">
        <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition">
          Load More
        </button>
      </div>
    </div>
      ) : (
        <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 gap-x-0">
          {sampleData.map((item) => (
            <GridCard key={item.stockId} item={item} />
          ))}
        </div>
      )}
   </div>
  );
}
