import React from 'react';

const SortControls = ({ currentSort, onSortChange }) => {
  return (
    <div className="sort-controls">
      <label htmlFor="sort-order">Sort by Date:</label>
      <select 
        id="sort-order"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default SortControls;