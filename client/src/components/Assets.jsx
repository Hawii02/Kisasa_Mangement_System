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
            <th>Client Id</th>
            <th>Type of asset</th>
            <th>Value</th>
            <th>Purchase price</th>
            <th>Purchase date</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.client_id}</td>
              <td>{asset.type_of_asset}</td>
              <td>{asset.value}</td>
              <td>{asset.purchase_price}</td>
              <td>{asset.purchase_date}</td>
              <td>{asset.client_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Asset