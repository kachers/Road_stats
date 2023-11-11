
import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Filter from '../components/Filter';

const Stats: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]); // Adjust the type based on your actual data type
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]); // New state for filtered records
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/stats');
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
          setFilteredRecords(data); // Initialize filteredRecords with all records
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Filter />
      <Table
        records={filteredRecords} 
        currentPage={currentPage}
         handlePageChange={(newPage) => setCurrentPage(newPage)}
/>
    </div>
  );
};

export default Stats;