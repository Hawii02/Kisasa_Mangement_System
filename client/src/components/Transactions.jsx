import React, { useState, useEffect } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className='flex flex-col items-center w-full h-screen mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
      <h1 className='text-center'>List of Transactions</h1>
    </div>
      <div className='w-full items-center flex justify-center mt-7'>
      <table className='border rounded-lg w-full h-screen'>
        <thead>
          <tr className='text-[#f59e0b] font-bold'>
            <th>Client Id</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={client.id}>
              <td>{transaction.Client_Id}</td>
              <td>{transaction.Transaction_type}</td>
              <td>{transaction.Amount}</td>
              <td>{transaction.Transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Transactions;