"use client";

import PageLayout from '@/components/PageLayout';
import List from '@/components/List';
import React, { use, useState } from 'react';
import axios from 'axios';

const linesData = [
  { number: 1, leader: 'Paul Aubry', state: 'Ready', action: () => console.log('Start line 1') },
  { number: 2, leader: 'Alexandre Desbos', state: 'Ready', action: () => console.log('Start line 2') },
  { number: 3, leader: 'Baptiste Griva', state: 'Ready', action: () => console.log('Start line 3') },
  { number: 4, leader: 'Francois Boussion', state: 'Running', action: () => console.log('Stop line 4') },
  { number: 5, leader: 'Logan Goddard', state: 'Ready', action: () => console.log('Start line 5') },
];

type LineDetails = {
  number: number;
  leader: string;
  state: string;
  action: () => void;
};



const Page = () => {

  const [lines, setLines] = useState<LineDetails[]>([]);

  useState(() => {
    const fetchLineDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/lineDetails");
        const lines = response.data;
        setLines(lines);
      } catch (error) {
        console.error("Error fetching line details:", error);
      }
    }
    fetchLineDetails();
  }
  );

  return (
    <PageLayout >
    <div className='ml-96 mt-10 w-9/12 pr-16'>
      <h2 className='text-2xl font-bold mb-10'>Production Line Management</h2>
      <List lines={lines} />
    </div>
    </PageLayout >
  );
};

export default Page;