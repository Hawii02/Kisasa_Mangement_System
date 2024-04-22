// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Assets from './Assets';
import Client from './Client';
import Holdings from './Holdings';
import Login from './Login';
import Transactions from './Transactions';
import Accounts from './Accounts';
import Navbar from './NavBar';
import Dashboard from './Dashboard';
import About from './About';
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Logout from './Logout';
import ClientForm from './ClientForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {!isLoggedIn ? <Login handleLogin={handleLogin} /> :
        <div className="bg-[#f9fafb] h-screen text-[#022c22] rounded-lg ">
          <div className='flex  lg:hidden'>
            <button className='text-2xl p-3' onClick={handleToggle}>
              {!isOpen ? <FaBars /> : <IoClose />}
            </button>
            {isOpen && <Navbar />}
          </div>
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
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/clientform" element={<ClientForm />} />

              </Routes>
            </div>
          </div>
        </div>
      }
    </Router>
  );
}

export default App;
