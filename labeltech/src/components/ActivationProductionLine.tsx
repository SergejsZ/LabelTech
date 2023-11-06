import React from 'react';

const LineItem = ({ line }: { line: number }) => {
  const isActive = line % 2 === 0;
  const lineClass = isActive ? 'active' : 'inactive';
  
  return (
    <li className={`border-solid border-black border-y ${lineClass} text-center`}>
      Line {line}
    </li>
  );
};

const ActivationProductionLine = () => {
  const lines = Array.from({ length: 8 }, (_, i) => i + 1);
  
  return (
    <div>
      <h2 className='text-center font-bold'>Active/inactive production lines</h2>
      <div className='flex flex-row'>
        <div className='m-2'>
          <ul className='w-32'>
            {lines.map((line) => (
              <LineItem key={line} line={line} />
            ))}
          </ul>
        </div>
        <div className='flex flex-col mt-5'>
          <p className='active'>Activate</p>
          <p className='inactive'>Inactive</p>
        </div>
      </div>  
    </div>
  );
};

export default ActivationProductionLine;
