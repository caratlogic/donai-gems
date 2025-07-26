'use client';

import styles from './FilterPanel.module.css';
import ShapeFilter from "./ShapeFilter";
// import PriceFilter from "./PriceFilter";
import CaratFilter from "./CaratFilter";
import ColorFilter from "./ColorFilter";
import TypeFilter from "./TypeFilter";
import OriginFilter from "./OriginFilter";
import FilterButtonGroup from "./FilterButtonGroup";

const FilterPanel = () => {
  return (
    <form
      className={`${styles.panelReset} w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4`}
    >
      <div className="grid grid-cols-3 grid-rows-2 gap-y-0">
        <div className="col-span-1 row-span-2">
          <ShapeFilter />
        </div>

   
        <div className="col-span-1 row-span-1">
          <ColorFilter />
        </div>

        
        <div className="col-span-1 row-span-1">
          <CaratFilter />
        </div>

        
        <div className="col-span-1 row-span-1">
          <TypeFilter />
        </div>

        
        <div className="col-span-1 row-span-1">
          <OriginFilter />
        </div>
      </div>

    
      <div className="flex justify-center pt-3">
        <FilterButtonGroup />
      </div>
    </form>
  );
};

export default FilterPanel;
