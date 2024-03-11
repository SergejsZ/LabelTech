import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

type User = {
  id: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  userLevel: string;
};

const initialUserState = {
  id: null,
  userName: '',
  userEmail: '',
  userLevel: '',
  userPassword: '',
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: number | null; userName: string; userEmail: string; userLevel: string; userPassword: string; }>({ id: null, userName: '', userEmail: '', userLevel: '', userPassword: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      // Vérifier d'abord si l'utilisateur est associé à une ligne de production
      const checkResponse = await axios.get(`http://localhost:4000/api/checkUser/${id}`);
      if (checkResponse.data.isAssociated) {
        alert('This user is associated with a production line and cannot be deleted.');
        return;
      }
  
      // Demander une confirmation pour la suppression
      if (window.confirm('Are you sure you want to delete this user?')) {
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error processing user deletion:', error);
    }
  };

  const handleEditUserClick = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = isEditing ? 'put' : 'post';
    const url = isEditing ? `http://localhost:4000/api/users/${currentUser.id}` : 'http://localhost:4000/api/users';
    
    try {
      await axios[method](url, currentUser);
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });

    if (name === 'userPassword') {
      if (!passwordRegex.test(value)) {
        setPasswordError('The password must contain at least 8 characters, including an upper case letter, a lower case letter, a number and a special character.');
      } else {
        setPasswordError('');
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsEditing(false);
    setCurrentUser(initialUserState);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-end">
        <button
          onClick={() => setModalVisible(true)}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userLevel}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleEditUserClick(user)} className="text-blue-500 hover:text-blue-700 mr-3">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
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
              <label htmlFor="userName" className="block text-gray-800 text-sm font-semibold mb-2">User Name:</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={currentUser.userName}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
      
            <div className="flex flex-col">
              <label htmlFor="userEmail" className="block text-gray-800 text-sm font-semibold mb-2">User Email:</label>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                value={currentUser.userEmail}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
      
            {!isEditing && (
              <div className="flex flex-col">
              <label htmlFor="userPassword" className="block text-gray-800 text-sm font-semibold mb-2">User Password:</label>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                value={currentUser.userPassword}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required={!currentUser} // .isediting
              />
              {passwordError && <p className="text-red-500 text-xs mt-2">{passwordError}</p>}
            </div>
            )}
      
            <div className="flex flex-col">
              <label htmlFor="userLevel" className="block text-gray-800 text-sm font-semibold mb-2">User Level:</label>
              <select
                name="userLevel"
                id="userLevel"
                value={currentUser.userLevel}
                onChange={handleInputChange}
                className="shadow appearance-none border border-gray-400 bg-white rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Leader">Leader</option>
                <option value="Quality">Quality</option>
              </select>
            </div>
      
            <div className="flex justify-center space-x-4 pt-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                {isEditing ? 'Update User' : 'Add User'}
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

export default UserList;
