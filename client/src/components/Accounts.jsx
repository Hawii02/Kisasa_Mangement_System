import React, { useState, useEffect } from 'react';

function Account() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch(' http://127.0.0.1:5556/api/accounts')
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
     
      <table className='border border-black rounded-lg w-full h-screen '>
        <thead>
          <tr className='text-[#f59e0b] font-bold border border-black'>
            <th className='border border-black'>Id</th>
            <th className='border border-black'>Account_number</th>
            <th className='border border-black'>Account_balance</th>
            <th className='border border-black'>Client_id</th>
            <th className='border border-black'>Client_name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td className='text-center border border-black '>{account.id}</td>
              <td className='text-center '>{account.account_number}</td>
              <td className='text-center border border-black'>{account.acc_balance}</td>
              <td className='text-center border border-black'>{account.client_id}</td>
              <td className='text-center '>{account.client_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Account