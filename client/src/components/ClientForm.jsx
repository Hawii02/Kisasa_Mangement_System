import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5556/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Redirect to the client list page after successful creation
        navigate('/client');
      } else {
        console.error('Failed to create client:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to create client:', error.message);
    }
  };

  return (
    <div className='w-full h-screen'>
      <div className='flex items-center justify-center text-3xl font-bold w-full'>
        <h1>Create New Client</h1>
      </div>
      <div className='grid grid-cols-2 w-full h-screen mt-6'>
        
        <form onSubmit={handleSubmit} className='flex flex-col w-[400px] h-[500px] p-5 rounded-lg shadow-md gap-4'>
        <div className='custom_bg_image2 w-full h-full rounded-md'></div>
          <input
            className='rounded-md outline-none p-2 text-sm'
            type="text"
            id="first_name"
            name="first_name"
            placeholder='First Name...'
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            className='rounded-md outline-none p-2 text-sm'
            type="text"
            id="last_name"
            name="last_name"
            placeholder='Last Name...'
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            className='rounded-md outline-none p-2 text-sm'
            type="email"
            id="email"
            name="email"
            placeholder='Enter Email...'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className='w-full flex items-center justify-center'>
            <button type="submit" className='bg-[#022c22] text-white w-[130px] p-2 rounded-full font-bold'>Create</button>
          </div>
        </form>
        <div className='custom_bg_image3 shadow-md rounded-md h-[500px]'></div>
      </div>
    </div>
  );
}

export default ClientForm;
