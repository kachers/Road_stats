import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Filter.css'; // Import the CSS file for styling

const Filter: React.FC = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleApplyFilter = () => {
    // Read values from filter inputs
    const speedValue = speed !== null ? speed : undefined;
    const fromDateValue = fromDate !== null ? fromDate.toISOString().split('T')[0] : undefined;
    const toDateValue = toDate !== null ? toDate.toISOString().split('T')[0] : undefined;

    // Log the URL
    const filterURL = `http://localhost:8080/user/filter?speed=${speedValue}&fromDate=${fromDateValue}&toDate=${toDateValue}`;
    console.log('Filter URL:', filterURL);

    // Call the GET method FilterStats
    fetch(filterURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        // Handle the data as needed
        console.log('Filtered data:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleResetFilter = () => {
    // Implement the logic to reset the filter
    setSpeed(null);
    setFromDate(null);
    setToDate(null);
    console.log('Filter reset');
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
          <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
        </div>

        <div className="filter-label">
          <label>Date To:</label>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
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