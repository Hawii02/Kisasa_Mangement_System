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
  );
}

export default Transactions;