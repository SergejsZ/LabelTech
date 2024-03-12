import React from 'react';
import { Tooltip, Button } from "@material-tailwind/react";

type FlagProps = {
  time: string;
};

const Flag: React.FC<FlagProps> = ({ time }) => {
  return (
    <div>
      <Tooltip
      content={`error time is : ${time}`}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      >
        <div className="absolute" style={{ left: `calc(${time} * 10%)` }}>
          <img src="../utils/icons/flag.png" alt="flag" style={{ width: '20px', height: '20px' }} />
          {/* <p>{time}</p> */}
        </div>
      </Tooltip>
    </div>
  );
};

export default Flag;