import React, { useState, useEffect } from 'react';

function Client() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('')
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
     
      <table className='border rounded-lg w-full h-screen '>
        <thead>
          <tr className='text-[#f59e0b] font-bold '>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Account Id</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>{client.email}</td>
              <td>{client.account_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Client