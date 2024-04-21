import React, { useState, useEffect } from 'react';

function Client() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5556/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  return (
    <div className='flex items-center w-full h-screen flex-col mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
      <h1 className='text-center'>List of Clients</h1>
      </div>
      <div className='w-full items-center flex justify-center mt-7 '>
     
      <table className='border border-black rounded-lg w-full h-screen '>
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