import React from 'react';

type FlagProps = {
  time: string;
};

const Flag: React.FC<FlagProps> = ({ time }) => {
  return (
    <div className="absolute" style={{ left: `calc(${time} * 10%)` }}>
      <img src="../utils/icons/flag.png" alt="flag" style={{ width: '20px', height: '20px' }} />
      <p>{time}</p>
    </div>
  );
};

export default Flag;