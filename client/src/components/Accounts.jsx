import React, { useState, useEffect } from 'react';

function Account() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/accounts')
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  return (
    <div className='flex items-center w-full h-screen flex-col mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
      <h1 className='text-center'>Client Accounts Overview</h1>
      </div>
      <div className='w-full items-center flex justify-center mt-7 '>
     
      <table className='border rounded-lg w-full h-screen '>
        <thead>
          <tr className='text-[#f59e0b] font-bold '>
            <th></th>
            <th>Account_number</th>
            <th>Account_balance</th>
            <th>Client_id</th>
            <th>Client_name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.account_number}</td>
              <td>{account.account_balance}</td>
              <td>{account.client_id}</td>
              <td>{account.client_first_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Account