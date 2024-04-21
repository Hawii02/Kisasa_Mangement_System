import React, { useState, useEffect } from 'react';

function Asset() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/assets')
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  const filteredAssets = assets.filter(asset => {
    return asset.id.toString().includes(search); // Filter by ID
  });

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleEdit = id => {
    // Find the asset with the given ID
    const assetToEdit = assets.find(asset => asset.id === id);
    if (!assetToEdit) {
      console.error(`Asset with ID ${id} not found.`);
      return;
    }

    // Set the selected asset in state
    setSelectedAsset(assetToEdit);
  };

  const handleSaveChanges = updatedAsset => {
    // Update the asset in the assets state
    setAssets(prevAssets => prevAssets.map(asset => {
      if (asset.id === updatedAsset.id) {
        return updatedAsset;
      }
      return asset;
    }));
    // Close the modal
    setSelectedAsset(null);
  };

  const handleDelete = id => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm('Are you sure you want to delete this asset?');
    if (!confirmDelete) {
      return; // If user cancels deletion, exit the function
    }

    // Perform the delete action
    fetch(`http://127.0.0.1:5555/assets/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete asset with ID ${id}`);
      }
      // Remove the deleted asset from the assets state
      setAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
      console.log(`Asset with ID ${id} deleted successfully.`);

      // Reassign IDs in ascending order
      setAssets(prevAssets => {
        return prevAssets.map((asset, index) => {
          return { ...asset, id: index + 1 };
        });
      });
    })
    .catch(error => {
      console.error('Error deleting asset:', error);
    });
  };

  return (
    <div className='flex items-center w-full  flex-col'>
      <div className='flex items-center justify-center w-full  '>
        <h1 className='text-center text-2xl font-bold hover:text-[#f59e0b]'>Client Assets Overview</h1>
        <form className='ml-11 float-right'>
          <input
            type="text"
            placeholder='Search by ID...'
            className='bg-none text-sm p-1  border border-black outline-none w-[250px] rounded-full text-black'
            value={search}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className='w-[500px] items-center flex justify-center mt-2 '>
        <table className='  w-full border rounded-lg border-black h-screen  '>
          <thead>
            <tr className=' font-bold  w-full border border-black  '>
              <th className='p-2 border border-black'>Index</th>
              <th className='p-2 border border-black'>number of shares</th>
              <th className='p-2 border border-black'>purchase date</th>
              <th className='p-2 border border-black'>purchase price</th>
              <th className='p-2 border border-black'>Date purchased</th>
              <th className='p-2 border border-black'>Client Id</th>
              <th className='p-2 border border-black'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map(asset => (
              <tr key={asset.id} className='w-full border border-black'>
                <td className='p-1  text-center'>{asset.id}</td>
                <td className='p-1  text-center'>{asset.type_of_asset}</td>
                <td className='p-1  text-center'>{asset.value}</td>
                <td className='p-1  text-center'>{asset.purchase_price}</td>
                <td className='p-1  text-center'>{asset.purchase_date}</td>
                <td className='p-1  text-center'>{asset.client_id}</td>
                <td className='p-1  text-center'>
                  <button
                    className='flex p-2 w-[150x] text-sm bg-[#022c22] text-white mr-2'
                    onClick={() => handleEdit(asset.id)}
                  >
                    Edit
                  </button>
                  <button
                    className='flex p-2 w-[150x] text-sm bg-red-800 text-white'
                    onClick={() => handleDelete(asset.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAsset && (
        <EditModal
          asset={selectedAsset}
          onSave={handleSaveChanges}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
}

function EditModal({ asset, onSave, onClose }) {
  const [editedAsset, setEditedAsset] = useState({ ...asset });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedAsset(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedAsset);
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
                  Edit Asset
                </h3>
                <div className="mt-2">
                  <form>
                    <div className="mb-4">
                      <label htmlFor="type_of_asset" className="block text-gray-700 text-sm font-bold mb-2">Type of Asset:</label>
                      <input type="text" id="type_of_asset" name="type_of_asset" value={editedAsset.type_of_asset} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="value" className="block text-gray-700 text-sm font-bold mb-2">Value:</label>
                      <input type="text" id="value" name="value" value={editedAsset.value} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="purchase_price" className="block text-gray-700 text-sm font-bold mb-2">Purchase Price:</label>
                      <input type="text" id="purchase_price" name="purchase_price" value={editedAsset.purchase_price} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="purchase_date" className="block text-gray-700 text-sm font-bold mb-2">Purchase Date:</label>
                      <input type="text" id="purchase_date" name="purchase_date" value={editedAsset.purchase_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="client_id" className="block text-gray-700 text-sm font-bold mb-2">Client ID:</label>
                      <input type="text" id="client_id" name="client_id" value={editedAsset.client_id} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
}

export default Asset;
