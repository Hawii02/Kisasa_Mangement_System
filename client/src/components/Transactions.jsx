import React, { useState, useEffect } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/transactions')
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
            <th>Client Name</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.client_id}</td>
              <td>{transaction.transaction_type}</td>
              <td>{transaction.transaction_amount}</td>
              <td>{transaction.transaction_date}</td>
              <td>{transaction.client_first_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Transactions;