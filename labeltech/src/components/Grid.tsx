import { useState, ReactElement } from 'react';
import styles from '../styles/grid.module.css';

type GridProps = {
  components: ReactElement[];
};


let isComponentExpended = false;

const Grid: React.FC<GridProps> = ({ components }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    if (!isComponentExpended) {
      setExpandedId(expandedId === id ? null : id);
      isComponentExpended = true;
      //get all the grid items
      document.querySelectorAll(`.${styles.gridItem}`).forEach((element) => {
        if (element !== document.querySelectorAll(`.${styles.gridItem}`)[id]) {
          element.classList.add(styles.blurEffect);
        }
      });
    }
    else {
      if (expandedId !== id) {
        setExpandedId(null);
        isComponentExpended = false;
        document.querySelectorAll(`.${styles.gridItem}`).forEach((element) => {
          element.classList.remove(styles.blurEffect);
        });
      }
    }
  };

  return (
    <div className={styles.grid}>
      {components.map((Component, index) => (
          <div 
            key={index}
            className={`${styles.gridItem} ${expandedId === index ? styles.expanded : ''} border-solid border-2 border-black rounded-lg`}
            onClick={() => handleClick(index)}
          >
            {Component}
          </div>
          
      ))}
    </div>
  );
};

export default Grid;
  