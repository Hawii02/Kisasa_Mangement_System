import React, { useState, useEffect } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/transactions')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTransactions(data)})
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className=''>
      <h1 className='text-center'>List of Transactions</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Client Id</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transaction_date}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;