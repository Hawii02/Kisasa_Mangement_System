import React from 'react'
import { BiHomeSmile } from "react-icons/bi";
import {Link} from 'react-router-dom'
import { MdOutlineInventory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaHandsHolding } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";
import { FaShopLock } from "react-icons/fa6";


function NavBar() {
  return (
    <div className='bg-white fixed w-full mt-10 lg:mt-0 lg:w-[200px] text-[#022c22] font-bold h-full flex flex-col shadow-md '>
      <div className='flex flex-col mb-9 items-center justify-center w-full h-[160px] '>
      <FaShopLock  className='text-8xl'/> 
      <h1 className='text-xl'>Kis<span className='text-1xl text-[#f59e0b] font-bold '>A</span>sa</h1>

      </div>
      <div className=' flex   flex-col gap-3  w-full justify-center items-center '>
        <div className='w-full link_item p-2  flex items-center justify-center'><Link to='/' className='flex items-center justify-center'><BiHomeSmile className='mr-3' /> <span>Home</span></Link></div>
        <div className='w-full link_item p-2  flex items-center justify-center'> <Link to='/assets' className='flex items-center justify-center'><MdOutlineInventory  className='mr-3'/> <span>Assets</span></Link></div>
        <div className='w-full link_item p-2  flex items-center justify-center'><Link to='/transactions' className='flex items-center justify-center'><GrTransaction className='mr-3'/> <span>Transactions</span></Link></div>
        <div className='w-full link_item p-2  flex items-center justify-center'> <Link to='/holdings' className='flex items-center justify-center'><FaHandsHolding className='mr-3'/> <span>Holdings</span></Link></div>
        <div className='w-full link_item p-2  flex items-center justify-center'>  <Link to='/client' className='flex items-center justify-center'><BsPersonFillCheck className='mr-3'/> <span>Clients</span></Link></div>
        <div className='w-full link_item p-2  flex items-center justify-center'>  <Link to='/accounts' className='flex items-center justify-center'><MdOutlineManageAccounts  className='mr-3'/> <span>Accounts</span></Link></div>
      </div>
      <div className='w-full items-center justify-center'>
        <hr />
      </div>
   
    </div>
  )
}

export default NavBar