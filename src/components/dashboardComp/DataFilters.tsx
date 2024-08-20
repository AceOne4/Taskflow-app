// src/components/Dashboard/DataFilters.tsx
"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const DataFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex gap-5 items-center justify-center mb-4">
      <MagnifyingGlassIcon className="w-4 h-4" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2  rounded w-1/3 bg-neutral-800"
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        className="p-2  rounded w-1/3 bg-neutral-800"
      >
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="in-progress">In Progress</option>
        <option value="not-started">Not Started</option>
      </select>
    </div>
  );
};

export default DataFilters;
