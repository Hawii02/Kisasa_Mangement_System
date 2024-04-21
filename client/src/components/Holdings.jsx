import React, { useState, useEffect } from 'react';

function Holding() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/holdings')
      .then(response => response.json())
      .then(data => setHoldings(data))
      .catch(error => console.error('Error fetching holdings:', error));
  }, []);

  return (
    <div className='flex items-center w-full h-screen flex-col mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
      <h1 className='text-center'>Client's Overview Holdings</h1>
      </div>
      <div className='w-full items-center flex justify-center mt-7 '>
     
      <table className='border rounded-lg w-full h-screen '>
        <thead>
          <tr className='text-[#f59e0b] font-bold '>
            <th>Account_id</th>
            <th>Asset_id</th>
            <th>Client_id</th>
            <th>Client_name</th>
            <th>Number_of_shares</th>
            <th>Purchase_price</th>
            <th>Purchase_date</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map(holding => (
            <tr key={holding.id}>
              <td>{holding.account_id}</td>
              <td>{holding.asset_id}</td>
              <td>{holding.client_id}</td>
              <td>{holding.client_first_name}</td>
              <td>{holding.number_of_shares}</td>
              <td>{holding.purchase_price}</td>
              <td>{holding.purchase_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Holding