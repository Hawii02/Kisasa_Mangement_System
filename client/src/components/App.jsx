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
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/client" element={<Client />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </Router>
  )
}

export default App
