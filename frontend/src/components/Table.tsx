import React from 'react';
import './Table.css'; 

interface RecordModel {
  id: number;
  carId: string;
  speed: number;
  date: string;
}

interface TableProps {
  records: RecordModel[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({ records, currentPage, handlePageChange }) => {
  const pageSize = 20;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedRecords = records.slice(startIndex, endIndex);
  const recordsPerPage = 20;

  return (
    <div className="container">
      {records.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Speed</th>
              <th>Car ID</th>
            </tr>
          </thead>
          <tbody>
            {displayedRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.date}</td>
                <td>{record.speed}</td>
                <td>{record.carId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records to display</p>
      )}
      <div className="button-container">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={endIndex >= records.length}>
          Next
        </button>
        <button onClick={() => handlePageChange(Math.ceil(records.length / recordsPerPage))} disabled={endIndex >= records.length}>
          Last
        </button>
      </div>
    </div>
  );
};

export default Table;