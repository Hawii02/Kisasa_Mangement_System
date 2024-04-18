import React from 'react'
import LineGraph from './LineGraph'
import { GrTransaction } from "react-icons/gr";
import { MdOutlineInventory } from "react-icons/md";
import { FaHandsHolding } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import Assets from './Assets'

function Dashboard() {
  return (
    <div className='w-full items-center h-screen grid gap-4 grid-cols-5'>
      
    <div className='flex flex-col gap-3 p-2 shadow-md h-screen items-center col-span-1'>
      <div className='shadow-sm bg-[#fef2f2a2] rounded-lg gap-2 items-center grid grid-cols-3 h-full justify-center w-full'>
        <div className='items-center jusify-center ml-3    flex w-full'>
        <GrTransaction className='text-6xl'/>
        </div>
        <div className='flex w-full items-center p-3  col-span-2 flex-col'>
          <h1 className=' font-bold text-2xl'>Total</h1>
          <h1 className='font-bold '>Transactions</h1>
          <h1 className='font-bold text-xl'>300</h1>
        </div>
      
      </div>
      <div className='shadow-sm bg-[#dcfce796] rounded-lg items-center grid grid-cols-3  h-full justify-center w-full'>
      <div className='items-center jusify-center ml-3 flex w-full'>
      <MdOutlineInventory  className='text-6xl'/>
      </div>
      <div className='flex w-full items-center col-span-2  flex-col'>
          <h1 className=' font-bold text-2xl'>Total</h1>
          <h1 className='font-bold '>Assets</h1>
          <h1 className='font-bold text-xl'>400</h1>
        </div>
      </div>
      
      <div className='shadow-sm bg-[#ddcdd68f] rounded-lg items-center grid grid-cols-3  h-full justify-center w-full'>
      <div className='items-center jusify-center ml-3 flex w-full'>
      <FaHandsHolding className='text-6xl'/> 
      </div>
      <div className='flex w-full col-span-2 items-center flex-col'>
          <h1 className=' font-bold text-2xl'>Total</h1>
          <h1 className='font-bold '>Holdings</h1>
          <h1 className='font-bold text-xl'>200</h1>
        </div>
      </div>
      <div className='shadow-sm bg-[#fef3c742] rounded-lg items-center grid grid-cols-3  h-full justify-center w-full'>
      <div className='items-center jusify-center ml-3 flex w-full'>
      <MdOutlineManageAccounts className='text-6xl'/>
      </div>
      <div className='flex w-full col-span-2 items-center flex-col'>
          <h1 className=' font-bold text-2xl'>Total</h1>
          <h1 className='font-bold '>Accounts</h1>
          <h1 className='font-bold text-xl'>900</h1>
        </div>
      </div>
    </div>
    <div className='col-span-4  h-screen p-3 items-center justify-center'>
      <div className='rounded-lg shadow-md  h-[300px] items-center'>
       
          <LineGraph />
        
      </div>
      <div className='rounded-lg shadow-md mt-3 h-[300px]'>
        <Assets />
      </div>
    </div>

    
    </div>
  )
}

export default Dashboard