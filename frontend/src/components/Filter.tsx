import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Filter.css'; 

interface FilterProps {
  onApplyFilter: (speed: number | null, fromDate: Date | null, toDate: Date | null) => void;
  onResetFilter: () => void;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilter, onResetFilter }) => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleApplyFilter = () => {
    onApplyFilter(speed, fromDate, toDate);
  };

  const handleResetFilter = () => {
    setSpeed(null);
    setFromDate(null);
    setToDate(null);
    onResetFilter();
  };

  return (
    <div className="filter-container">
      <div className="filter-row">
        <div className="filter-label">
          <label>Speed From:</label>
          <input
            type="number"
            value={speed || ''}
            onChange={(e) => setSpeed(e.target.value !== '' ? parseInt(e.target.value) : null)}
          />
        </div>

        <div className="filter-label">
          <label>Date From:</label>
          <DatePicker selected={fromDate} onChange={(date) => setFromDate(date as Date)} />
        </div>

        <div className="filter-label">
          <label>Date To:</label>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date as Date)} />
        </div>

        <div className="filter-buttons">
          <button onClick={handleApplyFilter}>Apply Filter</button>
          <button onClick={handleResetFilter}>Reset Filter</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;