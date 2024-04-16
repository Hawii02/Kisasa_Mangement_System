import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Assets from './Assets'
import Client from './Client'
import Holdings from './Holdings'
import Login from './Login'
import Transactions from './Transactions'
import Accounts from './Accounts'
import Navbar from './NavBar'


function App() {
  return (
    <Router>
       <div className="bg-[#f9fafb]  rounded-lg ">
       <div className="md:flex h-screen overflow-hidden">
       <div className="hidden md:hidden lg:flex">
       <Navbar />
        </div>
       
          <div className="flex-1 overflow-auto lg:ml-[30px]  mt-[90px] lg:pr-3 text-[#022c22] ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/client" element={<Client />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<Accounts />} /> 
      </Routes>
      </div>
      </div>
      </div>
     
    </Router>
  )
}

export default App
