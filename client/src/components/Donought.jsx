import { Doughnut } from 'react-chartjs-2';

function DonutChart() {
  return (
    <div className='w-full flex items-center justify-center h-full'>
      <Doughnut
        data={{
          labels:["Stock", "Bond", "ETF"],
          datasets:[{
            label:"Assets",
            data:[200, 500, 600],
            backgroundColor:[
              'rgb(245,158,11)',
              'rgb(2, 44, 43)',
              'rgb(12, 95, 100)', // Adjusted color
            ]
          }]        
        }}
      />
    </div>
  );
}

export default DonutChart;
