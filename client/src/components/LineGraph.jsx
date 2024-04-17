import {Chart as chartjs} from 'chart.js/auto'
import {Bar} from 'react-chartjs-2'

function LineGraph() {
  return (
    <div className='w-full flex items-center justify-center h-full'>
      <Bar
      data={{
        labels:["Stock", "Bond", "ETF"],
        datasets:[{
          label:"Assets",
          data:[200, 500, 600],

          backgroundColor:[
            'rgb(245,158,11)',
            'rgb(2, 44, 43)',
            'rgb(2, 44, 43)',
            
          
          ]
        },
        
      ]
      }}/>
    </div>
  )
}

export default LineGraph