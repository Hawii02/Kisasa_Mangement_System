import React from 'react'
import { BiHomeSmile } from "react-icons/bi";
import {Link} from 'react-router-dom'
import { MdOutlineInventory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaHandsHolding } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

function NavBar() {
  return (
    <div className='bg-[#022c22]   text-white w-[200px] h-screen flex flex-col '>
      <div className='flex items-center justify-center w-full h-[160px] '>

      </div>
      <div className=' flex ml-7  flex-col w-full'>
        <div className='w-full mb-7 flex items-center justify-start'><Link to='/' className='flex items-center justify-center'><BiHomeSmile className='mr-3' /> <span>Home</span></Link></div>
        <div className='w-full mb-7 flex items-center justify-start'> <Link to='/assets' className='flex items-center justify-center'><MdOutlineInventory  className='mr-3'/> <span>Assets</span></Link></div>
        <div className='w-full mb-7 flex items-center justify-start'><Link to='/transactions' className='flex items-center justify-center'><GrTransaction className='mr-3'/> <span>Transactions</span></Link></div>
        <div className='w-full mb-7 flex items-center justify-start'> <Link to='/holdings' className='flex items-center justify-center'><FaHandsHolding className='mr-3'/> <span>Holdings</span></Link></div>
        <div className='w-full mb-7 flex items-center justify-start'> <Link to='/accounts' className='flex items-center justify-center'><MdOutlineManageAccounts className='mr-3'/> <span>Accounts</span></Link></div>
        <div className='w-full mb-7 flex items-center justify-start'>  <Link to='/client' className='flex items-center justify-center'><BsPersonFillCheck className='mr-3'/> <span>Clients</span></Link></div>
      </div>
      <div className='w-full items-center justify-center'>
        <hr />
      </div>
   
    </div>
  )
}

export default NavBar