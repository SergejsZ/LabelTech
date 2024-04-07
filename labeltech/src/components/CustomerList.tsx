import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

type Customer = {
  id: number;
  customerName: string;
  customerEmail: string;
  
};

const initialCustomerState = {
  id: null,
  customerName: '',
  customerEmail: '',
};

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<{ id: number | null; customerName: string; customerEmail: string }>(initialCustomerState);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/customersManagement');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      const checkResponse = await axios.get(`http://localhost:4000/api/checkCustomer/${id}`);
      if (checkResponse.data.isAssociated) {
        alert('Some products are associated with this customer. Please delete the associated products first if you want to delete this customer.');
        return;
      }
  
      if (window.confirm('Are you sure you want to delete this customer?')) {
        await axios.delete(`http://localhost:4000/api/customer/${id}`);
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error processing customer deletion:', error);
    }
  };

  const handleEditcustomerClick = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = isEditing ? 'put' : 'post';
    const url = isEditing ? `http://localhost:4000/api/customer/${currentCustomer.id}` : 'http://localhost:4000/api/customer';
    
    try {
      await axios[method](url, currentCustomer);
      fetchCustomers();
      closeModal();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsEditing(false);
    setCurrentCustomer(initialCustomerState);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-end">
        <button
          onClick={() => setModalVisible(true)}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add customer
        </button>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href={`mailto:${customer.customerEmail}`} className="ttext-black font-bold no-underline hover:no-underline">
                  {customer.customerEmail}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleEditcustomerClick(customer)} className="text-blue-500 hover:text-blue-700 mr-3">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4 z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="customerName" className="block text-gray-800 text-sm font-semibold mb-2">customer Name:</label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                value={currentCustomer.customerName}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
      
            <div className="flex flex-col">
              <label htmlFor="customerEmail" className="block text-gray-800 text-sm font-semibold mb-2">customer Email:</label>
              <input
                type="email"
                name="customerEmail"
                id="customerEmail"
                value={currentCustomer.customerEmail}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
    
      
            <div className="flex justify-center space-x-4 pt-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                {isEditing ? 'Update customer' : 'Add customer'}
              </button>
              <button onClick={closeModal} type="button" className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}

    </div>
  );
};

export default CustomerList;
