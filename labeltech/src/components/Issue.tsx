import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
interface User {
  id: number;
  userName: string;
  userLevel: string;
}

const Issue = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div className="p-5">
      <h2 className="text-center font-bold">Report an Issue</h2>

      {/*TODO: insert form in the database */}
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
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.userName}</td>
                <td className="border px-4 py-2">{user.userLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issue;
