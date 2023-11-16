import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

interface ChartProps {
  selectedDate: Date | null;
  chartData: number[];
}

const Chart: React.FC<ChartProps> = ({ selectedDate, chartData }) => {
  const selectedDateDisplay = selectedDate
    ? `Selected Date: ${selectedDate.toLocaleDateString()}`
    : '';

  const barChartData = chartData.map((speed, index) => ({
    hour: index + 1,
    speed: speed,
  }));

  return (
    <div>
      
      {selectedDateDisplay && <p>{selectedDateDisplay}</p>}

      {selectedDate && (
        <div style={{ marginTop: '-50px', marginLeft: '5px', marginRight: '5px' }}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={15}
            width={550} 
            height={230} 
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ]}// Tick values for each hour
              tickFormat={(t) => `${String(t - 1).padStart(2, '0')}:00`} 
              style={{
                tickLabels: { fontSize: 5, padding: 5 },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickCount={20} 
              style={{
                tickLabels: { fontSize: 5, padding: 5 }, 
              }}
            />
            <VictoryBar data={barChartData} x="hour" y="speed" style={{ data: { width: 15, fill: 'steelblue' } }} />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default Chart;
