const FilterButtonGroup = () => (
  <div className="flex gap-3 justify-end mt-4">
    <button
      type="reset"
      className="border border-gray-300 rounded-md px-5 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50"
    >
      CLEAR
    </button>
    <button
      type="button"
      className="border border-gray-300 rounded-md px-5 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50"
    >
      SAVE
    </button>
    <button
      type="submit"
      className="rounded-md px-5 py-2 text-sm font-medium text-white bg-[#C49A6C] hover:bg-[#b88f5f]"
    >
      SEARCH
    </button>
  </div>
);

export default FilterButtonGroup;
