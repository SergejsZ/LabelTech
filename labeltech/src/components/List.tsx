import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Line {
    number: number;
    leader: string;
    state: string;
    action: () => void;
}

const List = ({ lines }: { lines: Line[] }) => {

  const [users, setUsers] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

    return (
      <div className="rounded overflow-hidden shadow-lg bg-white">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Line number
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Line leader
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                State
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {line.number}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {line.leader === null ? 'Unassigned' : users.find((user) => user.id === line.leader)?.userName}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {line.state}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    className={`text-white font-bold py-2 px-4 rounded ${line.state === 'Ready' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
                    onClick={() => line.action()}
                  >
                    {line.state === 'Ready' ? 'Start' : 'Stop'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default List