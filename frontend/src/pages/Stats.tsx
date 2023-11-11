import React, { useEffect, useState } from 'react';
import Table from '../components/Table';

const Stats: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]); // Adjust the type based on your actual data type

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/stats');
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
      <h2>Stats Page</h2>
      <Table records={records} />
    </div>
  );
};

export default Stats;