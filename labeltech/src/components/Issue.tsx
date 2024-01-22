import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  userName: string;
  userLevel: string;
}

const Issue = () => {
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
    <div className="p-5">
      {/* <h2 className="text-center font-bold">Report an Issue</h2>


      <form className="mt-5 flex flex-col items-center">
        <textarea
          id="issue"
          name="issue"
          className="border-solid border-black border-2 rounded-lg w-full mt-1 p-2"
          placeholder="Please provide a detailed description of your issue."
        />
        <input className="greenbtn mt-3" type="submit" value="Submit" />
      </form> */}

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
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedUser?.id === user.id ? "#a0aec0" : "transparent",
                }}
              >
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.userLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isAddingUser || isEditingUser) && (
        <div className="mt-5">
          <h3 className="text-center font-bold">
            {isAddingUser ? "Add User" : "Edit User"}
          </h3>
          <form className="mt-3 flex flex-col items-center">
            <input
              type="text"
              placeholder="UserName"
              value={isAddingUser ? newUser.userName : editUser.userName}
              onChange={(e) =>
                isAddingUser
                  ? setNewUser({ ...newUser, userName: e.target.value })
                  : setEditUser({ ...editUser, userName: e.target.value })
              }
              className="border-solid border-black border-2 rounded-lg w-full mt-1 p-2"
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
                  className="border-solid border-black border-2 rounded-lg w-full mt-1 p-2"
                />
                <input
                  type="text"
                  placeholder="UserEmail"
                  value={newUser.userEmail}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userEmail: e.target.value })
                  }
                  className="border-solid border-black border-2 rounded-lg w-full mt-1 p-2"
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
              className="border-solid border-black border-2 rounded-lg w-full mt-1 p-2"
            />
            {isAddingUser ? (
              <div>
                <button
                  className="greenbtn mt-3"
                  type="button"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
                <button
                  className="redbtn mt-3 ml-2"
                  type="button"
                  onClick={() => {
                    setIsAddingUser(false);
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
                  className="greenbtn mt-3"
                  type="button"
                  onClick={handleEditUser}
                >
                  Save Changes
                </button>
                <button
                  className="redbtn mt-3 ml-2"
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

      {!isAddingUser && !isEditingUser && (
        <>
          <button
            className="greenbtn mt-3"
            onClick={() => setIsAddingUser(true)}
          >
            Add User
          </button>
          {selectedUser && (
            <button
              className="yellowbtn mt-3 ml-2"
              onClick={() => {
                setIsEditingUser(true);
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
        <div className="mt-3">
          <button className="redbtn mt-3" onClick={handleDelete}>
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

export default Issue;
