import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Client() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5556/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  return (
    <div className='flex items-center w-full h-screen flex-col mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold '>
      <h1 className='text-center'>List of Clients</h1>
    <Link to='/clientform'>  <button className='ml-11 text-sm w-[130px] p-2 bg-[#022c22] text-white rounded-full hover:bg-[#f59e0b] hover:text-[#022c22]'>New Client</button></Link>
      </div>
      <div className='w-full items-center flex justify-center mt-7 '>
     
      <table className='border border-black rounded-lg w-full h-full '>
        <thead>
          <tr className='text-[#f59e0b] font-bold '>
            <th className='border border-black'>First Name</th>
            <th className='border border-black'>Last Name</th>
            <th className='border border-black'>Email</th>
            
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className='border border-black'>
              <td className='text-center'>{client.first_name}</td>
              <td className='text-center'>{client.last_name}</td>
              <td className='text-center border border-black'>{client.email}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Client