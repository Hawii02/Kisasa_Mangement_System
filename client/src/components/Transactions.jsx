import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://127.0.0.1:5556/transactions')
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

  const handleSaveChanges = () => {
    setTransactions(transactions.map(transaction =>
      transaction.id === editedTransaction.id ? editedTransaction : transaction
    ));
    setSelectedTransaction(null);
  };

  const handleDelete = id => {
    fetch(`http://127.0.0.1:5556/transactions/${id}`, {
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

  return (
    <div className='flex flex-col items-center w-full h-screen mt-5'>
      <div className='flex items-center justify-center w-full text-4xl font-bold hover:text-[#f59e0b]'>
        <h1 className='text-center'>List of Transactions</h1>
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
              <th className='border border-black'>Client Id</th>
              <th className='border border-black'>Transaction Type</th>
              <th className='border border-black'>Amount</th>
              <th className='border border-black'>Transaction Date</th>
              <th className='border border-black'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td className='text-center border border-black p-2'>{transaction.client}</td>
                <td className='text-center border border-black p-2'>{transaction.transaction_type}</td>
                <td className='text-center border border-black p-2'>{transaction.transaction_amount}</td>
                <td className='text-center border border-black p-2'>{transaction.transaction_date}</td>
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
          onSave={handleSaveChanges}
          onClose={() => setSelectedTransaction(null)}
          setEditedTransaction={setEditedTransaction} 
        />
      )}
    </div>
  );
}

function EditModal({ transaction, onSave, onClose, setEditedTransaction }) {
  const [editedData, setEditedData] = useState({ ...transaction });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    setEditedTransaction(editedData); 
    onSave(); 
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
     
    </div>
  );
}

export default Transactions;
