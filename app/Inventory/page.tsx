import React from 'react'
import Table from "../components/Table";
import Filter from "../filters/filters/FilterPanel"
function page() {
  return (
    <>
    <div className="flex flex-col items-center gap-20 justify-center min-h-screen  p-4">
    <Filter />
    <Table />
    </div>
    </>
  )
}

export default page