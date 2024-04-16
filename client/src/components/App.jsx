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
import Dashboard from './Dashboard'
import About from './About'


function App() {
  return (
    <Router>
       <div className="bg-[#f9fafb] h-screen  rounded-lg ">
       <div className="md:flex  overflow-hidden">
       <div className="hidden md:hidden lg:flex">
       <Navbar />
        </div>
       
          <div className="flex-1 overflow-auto lg:ml-[18%]  lg:mt-[10px] lg:pr-3 text-[#022c22] ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/client" element={<Client />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<Accounts />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
      </div>
      </div>
     
    </Router>
  )
}

export default App
