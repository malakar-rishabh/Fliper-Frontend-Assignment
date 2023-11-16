import React from 'react';

const Filters = ({ categories, years, onCategoryChange, onYearChange }) => (
    <div className="d-flex gap-2">
        <select className="form-select" onChange={onCategoryChange}>
            <option>All Categories</option>
            {categories.map(category => <option key={category}>{category}</option>)}
        </select>
        <select className="form-select" onChange={onYearChange}>
            <option>All Years</option>
            {years.map(year => <option key={year}>{year}</option>)}
        </select>
    </div>
);

export default Filters;