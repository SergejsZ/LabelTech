"use client";
import React, { useState, useEffect } from 'react';
import { decode } from '../../public/utils/jwtUtils';

interface UserData {
  username: string;
  role: string;
}
  
const Home: React.FC = () => {

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token:', token);
      const decodedUserData = decode(token);
      setUserData(decodedUserData); 
      
      if (decodedUserData && decodedUserData.role) {
        console.log('Decoded:', decodedUserData);
        if (decodedUserData.role === 'Admin') {
          window.location.href = '/admin';
        } else if (decodedUserData.role === 'Leader') {
          window.location.href = '/line_leader';
        }
        else{
          window.location.href = '/quality';
        }
      }
    }
    else {
      window.location.href = '/login';
    }
  }, []); 
    
  
    return (
      <div className='h-screen'>
      </div>
    );
  };

export default Home;
