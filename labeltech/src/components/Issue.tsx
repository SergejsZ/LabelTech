import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  userName: string;
  userLevel: string;
}

const Issue: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

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
    setShowConfirmation(false); // Reset confirmation dialog
  };

  const handleDelete = async () => {
    try {
      if (selectedUser) {
        await axios.delete(
          `http://localhost:4000/api/users/${selectedUser.id}`
        );
        // Refresh the user list after deletion
        const response = await axios.get("http://localhost:4000/api/users");
        const updatedUsers = response.data;
        setUsers(updatedUsers);
        setSelectedUser(null); // Reset selected user after deletion
        setShowConfirmation(false); // Reset confirmation dialog
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="p-5">
      <h2 className="text-center font-bold">Report an Issue</h2>

      {/* TODO: Insert form in the database */}
      <form className="mt-5 flex flex-col items-center">
        <textarea
          id="issue"
          name="issue"
          className="border-solid border-black border-2 rounded-lg w-full mt-1 p-2"
          placeholder="Please provide a detailed description of your issue."
        />
        <input className="greenbtn mt-3" type="submit" value="Submit" />
      </form>

      <div className="mt-5">
        <h3 className="text-center font-bold">Users</h3>
        <table className="table-auto w-full mt-3">
          <thead>
            <tr>
              <th className="border px-4 py-2">UserName</th>
              <th className="border px-4 py-2">UserLevel</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                className={
                  selectedUser && selectedUser.id === user.id
                    ? "selected-row"
                    : ""
                }
              >
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.userLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete button and confirmation dialog */}
      {selectedUser && (
        <div className="mt-3 text-center">
          <button className="redbtn" onClick={handleShowConfirmation}>
            Delete User
          </button>
          {showConfirmation && (
            <div className="mt-2">
              <p>Are you sure you want to delete {selectedUser.userName}?</p>
              <button className="redbtn" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="greenbtn ml-2" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Issue;
