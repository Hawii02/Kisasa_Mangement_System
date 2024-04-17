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
    <div className=''>
      <h1 className='text-center'>List of Clients</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.email}</td>
              <td>{client.accountType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Client