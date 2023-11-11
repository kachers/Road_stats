import React from 'react';

interface RecordModel {
    id: number;
  carId: string;
  speed: number;
  date: string; // Adjust the type based on your actual data type for date
}

interface TableProps {
  records: RecordModel[];
}

const Table: React.FC<TableProps> = ({ records }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Car ID</th>
          <th>Speed</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index}>
            <td>{record.id}</td>
            <td>{record.carId}</td>
            <td>{record.speed}</td>
            <td>{record.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;