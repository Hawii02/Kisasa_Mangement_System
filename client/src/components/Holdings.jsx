import React, { useState, useEffect } from 'react';

function Holding() {
  const [holdings, setHoldings] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedHolding, setSelectedHolding] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5556/holdings')
      .then(response => response.json())
      .then(data => setHoldings(data))
      .catch(error => console.error('Error fetching holdings:', error));
  }, []);

  const filteredHoldings = holdings.filter(holding => {
    return holding.client_id.toString().includes(search); 
  });

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleEdit = id => {
    const holdingToEdit = holdings.find(holding => holding.id === id);
    if (!holdingToEdit) {
      console.error(`Holding with ID ${id} not found.`);
      return;
    }
    setSelectedHolding(holdingToEdit);
  };

  const handleSaveChanges = updatedHolding => {
    setHoldings(prevHoldings => prevHoldings.map(holding => {
      if (holding.id === updatedHolding.id) {
        return updatedHolding;
      }
      return holding;
    }));
    setSelectedHolding(null);
  };

  const handleDelete = id => {
    const confirmDelete = window.confirm('Are you sure you want to delete this holding?');
    if (!confirmDelete) {
      return; 
    }
    fetch(`http://127.0.0.1:5556/holdings/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete holding with ID ${id}`);
      }
      setHoldings(prevHoldings => prevHoldings.filter(holding => holding.id !== id));
      console.log(`Holding with ID ${id} deleted successfully.`); 
      setHoldings(prevHoldings => {
        return prevHoldings.map((holding, index) => {
          return { ...holding, id: index + 1 };
        });
      });
    })
    .catch(error => {
      console.error('Error deleting holding:', error);
    });
  };
  const EditModal = ({ holding, onSave, onClose }) => {
    const [editedHolding, setEditedHolding] = useState({ ...holding });

    const handleInputChange = event => {
      const { name, value } = event.target;
      setEditedHolding(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSave = () => {
      onSave(editedHolding);
    };

    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Edit Holding
                  </h3>
                  <div className="mt-2">
                    <form>
                      <div className="mb-4">
                        <label htmlFor="number_of_shares" className="block text-gray-700 text-sm font-bold mb-2">Number of Shares:</label>
                        <input type="text" id="number_of_shares" name="number_of_shares" value={editedHolding.number_of_shares} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="purchase_price" className="block text-gray-700 text-sm font-bold mb-2">Purchase Price:</label>
                        <input type="text" id="purchase_price" name="purchase_price" value={editedHolding.purchase_price} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="purchase_date" className="block text-gray-700 text-sm font-bold mb-2">Purchase Date:</label>
                        <input type="text" id="purchase_date" name="purchase_date" value={editedHolding.purchase_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Save
              </button>
              <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex items-center w-full h-screen flex-col mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
        <h1 className='text-center'>Client's Overview Holdings</h1>
        <form className='ml-11 float-right'>
          <input 
            type="text"
            placeholder='Search by Client ID...'
            className='bg-none text-sm p-1  border border-black outline-none w-full rounded-full text-black'
            value={search}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className='w-full items-center flex justify-center mt-7 '>
        <table className='border rounded-lg w-full h-screen  border-black '>
          <thead>
            <tr className='border border-black font-bold '>
              <th className='border  border-black p-1'>Index</th>
              <th className='border  border-black p-1'>Account id</th>
              <th className='border  border-black p-1'>Asset id</th>
              <th className='border  border-black p-1'>Client id</th>
              <th className='border  border-black p-1'>Client name</th>
              <th className='border  border-black p-1'>Number of shares</th>
              <th className='border  border-black p-1'>Purchase price</th>
              <th className='border  border-black p-1'>Purchase date</th>
              <th className='border  border-black p-1'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.map(holding => (
              <tr key={holding.id} className='w-full border border-black'>
                <td className='p-1  text-center'>{holding.id}</td>
                <td className='p-1  text-center'>{holding.account_id}</td>
                <td className='p-1  text-center'>{holding.asset_id}</td>
                <td className='p-1  text-center'>{holding.client_id}</td>
                <td className='p-1  text-center'>{holding.client_name}</td>
                <td className='p-1  text-center'>{holding.number_of_shares}</td>
                <td className='p-1  text-center'>{holding.purchase_price}</td>
                <td className='p-1  text-center'>{holding.purchase_date}</td>
                <div  className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm '
                    onClick={() => handleEdit(holding.id)}
                  >
                    Edit
                  </button>
                  <button
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => handleDelete(holding.id)}
                  >
                    Delete
                  </button>
                  </div>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedHolding && (
        <EditModal
          holding={selectedHolding}
          onSave={handleSaveChanges}
          onClose={() => setSelectedHolding(null)}
        />
      )}
    </div>
  );
}

export default Holding;
