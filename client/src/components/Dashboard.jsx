import React from 'react'
import LineGraph from './LineGraph'

function Dashboard() {
  return (
    <div className='w-full h-screen items-center grid gap-4 '>
    <div className='flex flex-col items-center lg:grid lg:grid-cols-4 gap-4 h-full w-full '>
      <div className='flex items-center justify-center w-full h-full col-span-3 shadow-md rounded-lg'>
        <LineGraph />
      </div>
      <div className='flex items-center justify-center shadow-md rounded-lg h-full'>card2</div>
    </div>
    <div className='flex flex-col items-center lg:grid lg:grid-cols-5 gap-4 h-full w-full'>
      <div className='flex items-center col-span-2 justify-center h-full rounded-lg shadow-md'> card3</div>
      <div className='flex col-span-3 items-center justify-center h-full rounded-lg shadow-md'> card3</div>

    </div>
    </div>
  )
}

export default Dashboard