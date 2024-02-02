import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

type User = {
    id: number;
    userName: string;
    userEmail: string;
    userLevel: string;
  };

const UserList = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    userPassword: "",
    userEmail: "",
    userLevel: "",
  });

  // Separate state for editing user
  const [editUser, setEditUser] = useState({
    userName: "",
    userLevel: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        const users = response.data;
        setUsers(users);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);

    // When clicking a row, update the editUser state
    setEditUser({
      userName: user.userName,
      userLevel: user.userLevel,
    });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUser?.userName}?`
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:4000/api/users/${selectedUser?.id}`
        );
        // Refresh the user list after deletion
        const response = await axios.get("http://localhost:4000/api/users");
        const updatedUsers = response.data;
        setUsers(updatedUsers);
        setSelectedUser(null); // Reset selected user after deletion
        setNewUser({
          userName: "",
          userPassword: "",
          userEmail: "",
          userLevel: "",
        });
        setIsEditingUser(false);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:4000/api/users", newUser);
      // Refresh the user list after adding a new user
      const response = await axios.get("http://localhost:4000/api/users");
      const updatedUsers = response.data;
      setUsers(updatedUsers);
      setIsAddingUser(false); // Hide the form after successful addition
      setNewUser({
        userName: "",
        userPassword: "",
        userEmail: "",
        userLevel: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/users/${selectedUser?.id}`,
        editUser // Use the editUser state instead of newUser
      );
      // Refresh the user list after editing a user
      const response = await axios.get("http://localhost:4000/api/users");
      const updatedUsers = response.data;
      setUsers(updatedUsers);
      setIsEditingUser(false); // Hide the form after successful edit
      setEditUser({
        userName: "",
        userLevel: "",
      });
      setSelectedUser(null);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 pr-16">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">user Level</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleRowClick(user)} className={selectedUser === user ? 'bg-slate-100' : ''}>
              <td className="px-6 py-4 border-b border-gray-200 text-center">{user.userName}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-center">{user.userEmail}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-center">{user.userLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isAddingUser || isEditingUser) && (
        <div className="mt-5">
          <h3 className="text-center font-bold">
            {isAddingUser ? "Add User" : "Edit User"}
          </h3>
          <form className="mt-3 flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="UserName"
              value={isAddingUser ? newUser.userName : editUser.userName}
              onChange={(e) =>
                isAddingUser
                  ? setNewUser({ ...newUser, userName: e.target.value })
                  : setEditUser({ ...editUser, userName: e.target.value })
              }
              className="border-gray-300 border-2 rounded-lg w-full mt-1 p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isAddingUser && (
              <>
                <input
                  type="password"
                  placeholder="UserPassword"
                  value={newUser.userPassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userPassword: e.target.value })
                  }
                  className="border-gray-300 border-2 rounded-lg w-full mt-1 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="UserEmail"
                  value={newUser.userEmail}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userEmail: e.target.value })
                  }
                  className="border-gray-300 border-2 rounded-lg w-full mt-1 p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </>
            )}
            <input
              type="text"
              placeholder="UserLevel"
              value={isAddingUser ? newUser.userLevel : editUser.userLevel}
              onChange={(e) =>
                isAddingUser
                  ? setNewUser({ ...newUser, userLevel: e.target.value })
                  : setEditUser({ ...editUser, userLevel: e.target.value })
              }
              className="border-gray-300 border-2 rounded-lg w-full mt-1 p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isAddingUser ? (
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300 mt-3"
                  type="button"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 mt-3 ml-2"
                  type="button"
                  onClick={() => {
                    setIsAddingUser(false);
                    setSelectedUser(null);
                    setNewUser({
                      userName: "",
                      userPassword: "",
                      userEmail: "",
                      userLevel: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300 mt-3"
                  type="button"
                  onClick={handleEditUser}
                >
                  Save Changes
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 mt-3 ml-2"
                  type="button"
                  onClick={() => setIsEditingUser(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      )}
      <div className='mt-10 flex justify-center'>
      {!isAddingUser && !isEditingUser && (
        <>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300 mt-3"
            onClick={() => {setIsAddingUser(true); setSelectedUser(null);}}
          >
            Add User
          </button>
          {selectedUser && (
            <button
            className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 mt-3 ml-2"
              onClick={() => {
                setIsEditingUser(true);
                setSelectedUser(null);
                setEditUser({
                  userName: selectedUser.userName,
                  userLevel: selectedUser.userLevel,
                });
              }}
            >
              Edit User
            </button>
          )}
        </>
      )}

      {selectedUser && (
        <div>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 mt-3 ml-2"
           onClick={handleDelete}>
            Delete User
          </button>
        </div>
      )}

      </div>
    </div>
  );
};

export default UserList;