import React, { useState } from 'react';
import Chart from '../components/Chart';
import DatePicker from 'react-datepicker';

interface AverageSpeedByHour {
  hour: number;
  averageSpeed: number;
}

const Graph: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [chartData, setChartData] = useState<number[]>([]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      try {
        const response = await fetch(`http://localhost:8080/user/graph?date=${formattedDate}`);

        if (response.ok) {
          const data = await response.json();
          const speeds = data.map((record: AverageSpeedByHour) => record.averageSpeed);
          setChartData(speeds);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setChartData([]);
    }
  };

  return (
    <div>      
      <div>
        <label>Select Date: </label>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>      
      <Chart selectedDate={selectedDate} chartData={chartData} />
    </div>
  );
};

export default Graph;