import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Filter from '../components/Filter';

const Stats: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]); 
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means it only runs once, equivalent to componentDidMount

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/stats');
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
        setFilteredRecords(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleApplyFilter = (speed: number | null, fromDate: Date | null, toDate: Date | null) => {
    
    const filterURL = `http://localhost:8080/user/filter?speed=${encodeURIComponent(String(speed))}&fromDate=${encodeURIComponent(String(fromDate))}&toDate=${encodeURIComponent(String(toDate))}`;
    console.log('Filter URL:', filterURL);
  const handleApplyFilter = (speed: number | null, fromDate: Date | null, toDate: Date | null) => {
    
    fetch(filterURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        
        setFilteredRecords(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
    
    const filteredData = records.filter((record) => {
      // Check speed if provided
      if (speed !== null && record.speed < speed) {
        return false;
      }
  
      // Check fromDate if provided
      if (fromDate !== null) {
        const recordDate = new Date(record.date);
        if (recordDate < fromDate) {
          return false;
        }
      }
  
      // Check toDate if provided
      if (toDate !== null) {
        const recordDate = new Date(record.date);
        if (recordDate > toDate) {
          return false;
        }
      }
  
      // Include the record if it passes all conditions
      return true;
    });


    setFilteredRecords(filteredData);
  };

  const handleResetFilter = () => {
    setFilteredRecords(records);
    console.log('Filter reset');
  };

  return (
    <div>
      <Filter onApplyFilter={handleApplyFilter} onResetFilter={handleResetFilter} />
      <Table
        records={filteredRecords} 
        currentPage={currentPage}
        handlePageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default Stats;