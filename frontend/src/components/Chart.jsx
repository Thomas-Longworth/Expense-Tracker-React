import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
   
)
const Chart = ({maxBudget, total}) => {
    const data = {
        labels: ['Budget', 'Expenses',  'Available'],
        datasets: [
            { 
                label:'Balance',
                data: [maxBudget.total_budget,total, (maxBudget.total_budget-total)],
                backgroundColor: [ 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)' ],
                borderColor: [
                    'green',
                    'red',
                    'orange',
                ],
                borderWidth: 1,
            }
        ]
    }
    const options = {
        maintainAspectRatio: false

    }
  return (
    <>
    <div className='container mt-4 chart-container '>

        <Bar
        data={data}
        options={options}
        >
    
        </Bar>


    </div>


    </>
  )
}

export default Chart