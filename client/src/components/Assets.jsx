import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5556/api/assets')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleEdit = id => {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    if (!transactionToEdit) {
      console.error(`Transaction with ID ${id} not found.`);
      return;
    }
    setSelectedTransaction(transactionToEdit);
  };

  const handleDelete = id => {
    fetch(`http://127.0.0.1:5556/assets/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setTransactions(transactions.filter(transaction => transaction.id !== id));
          console.log(`Transaction with ID ${id} deleted successfully`);
        } else {
          console.error(`Failed to delete transaction with ID ${id}`);
        }
      })
      .catch(error => console.error(`Error deleting transaction with ID ${id}:`, error));
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.id.toString().includes(search)
  );

  const redirectToEditPage = id => {
    navigate(`/edit-transaction/${id}`);
  };

  return (
    <div className='flex flex-col items-center w-full h-screen mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
        <h1 className='text-center'>List of Assets</h1>
        <form className='ml-11 float-right'>
          <input
            type="text"
            placeholder='Search by ID...'
            className='bg-none text-sm p-1  border border-black outline-none w-full rounded-full text-black'
            value={search}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className='w-full items-center flex justify-center mt-7'>
        <table className='border border-black rounded-lg w-full h-screen'>
          <thead>
            <tr className='text border border-black font-bold'>
              <th className='border border-black'>Id</th>
              <th className='border border-black'>Asset Type</th>
              <th className='border border-black'>value</th>
              <th className='border border-black'>Purchase price</th>
              <th className='border border-black'>Purchase date</th>
              <th className='border border-black'>Client Id</th>
              <th className='border border-black'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td className='text-center border border-black p-2'>{transaction.id}</td>
                <td className='text-center border border-black p-2'>{transaction.type_of_asset}</td>
                <td className='text-center border border-black p-2'>{transaction.value}</td>
                <td className='text-center border border-black p-2'>{transaction.purchase_price}</td>
                <td className='text-center border border-black p-2'>{transaction.purchase_date}</td>
                <td className='text-center border border-black p-2'>{transaction.client_id}</td>
                <td className='flex justify-center'>
                  <button className='ml-3 mt-1 bg-green-900 text-white p-1 w-[100px] rounded-md' onClick={() => handleEdit(transaction.id)}>Edit</button>
                  <button className='ml-3 mt-1 bg-red-900 text-white p-1 w-[100px] rounded-md' onClick={() => handleDelete(transaction.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTransaction && (
        <EditModal
          transaction={selectedTransaction}
          onSave={updatedTransaction => {
            setTransactions(prevTransactions =>
              prevTransactions.map(transaction =>
                transaction.id === updatedTransaction.id ? updatedTransaction : transaction
              )
            );
            setSelectedTransaction(null);
          }}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}

function EditModal({ transaction, onSave, onClose }) {
  const [editedTransaction, setEditedTransaction] = useState({ ...transaction });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedTransaction(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedTransaction);
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
                  Edit Transaction
                </h3>
                <div className="mt-2">
                  <form>
                    <div className="mb-4">
                      <label htmlFor="client_id" className="block text-gray-700 text-sm font-bold mb-2">Client ID:</label>
                      <input type="text" id="client_id" name="client_id" value={editedTransaction.client_id} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="transaction_type" className="block text-gray-700 text-sm font-bold mb-2">Transaction Type:</label>
                      <input type="text" id="transaction_type" name="transaction_type" value={editedTransaction.transaction_type} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="transaction_amount" className="block text-gray-700 text-sm font-bold mb-2">Transaction Amount:</label>
                      <input type="text" id="transaction_amount" name="transaction_amount" value={editedTransaction.transaction_amount} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="transaction_date" className="block text-gray-700 text-sm font-bold mb-2">Transaction Date:</label>
                      <input type="text" id="transaction_date" name="transaction_date" value={editedTransaction.transaction_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

export default Transactions;
