import React from 'react';

const FilterControls = ({ currentFilter, onFilterChange }) => {
  const severityOptions = ['All', 'Low', 'Medium', 'High'];

  return (
    <div className="filter-controls">
      <label htmlFor="severity-filter">Filter by Severity:</label>
      <select 
        id="severity-filter"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {severityOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterControls;