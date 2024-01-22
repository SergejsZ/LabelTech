import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

type User = {
    id: number;
    userName: string;
    userEmail: string;
    userLevel: string;
  };
  
//sample of data
const fakeUsers: User[] = [
  { id: 1, userName: 'Paul Aubry', userEmail: 'paul.aubry@gmail.com', userLevel: 'Quality insurance' },
  { id: 2, userName: 'Baptiste Griva', userEmail: 'baptiste.griva@gmail.com', userLevel: 'Line leader' },
];

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
    <div className="container mx-auto p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">userLevel</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200">{user.userName}</td>
              <td className="px-6 py-4 border-b border-gray-200">{user.userEmail}</td>
              <td className="px-6 py-4 border-b border-gray-200">{user.userLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
