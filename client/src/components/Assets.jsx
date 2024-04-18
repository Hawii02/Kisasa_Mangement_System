import React, { useState, useEffect } from 'react';

function Asset() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  return (
    <div className='flex items-center w-full  flex-col'>
      <div className='flex items-center justify-center w-full text-2xl font-bold hover:text-[#f59e0b]'>
      <h1 className='text-center'>Client Assets Overview</h1>
      </div>
      <div className='w-full items-center flex justify-center mt-2 '>
     
      <table className='  w-full  '>
        <thead>
          <tr className='text-[#f59e0b] font-bold '>
            <th>number_of_shares</th>
            <th>purchase_date</th>
            <th>purchase_price</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.number_of_shares}</td>
              <td>{asset.purchase_date}</td>
              <td>{asset.purchase_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Asset