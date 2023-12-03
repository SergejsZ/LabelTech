import React, { useState, ReactNode } from 'react';
import styles from '../styles/grid.module.css';

interface GridProps {
  items: ReactNode[];
}

const Grid: React.FC<GridProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<ReactNode | null>(null);

  const selectItem = (item: ReactNode) => {
    setSelectedItem(item);
  };

  const clearSelection = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {selectedItem && (
        <div className={styles.overlay} onClick={clearSelection}>
          <div className={styles.detail} onClick={e => e.stopPropagation()}>
            {selectedItem}
          </div>
        </div>
      )}
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${selectedItem && styles.blurred}`}
            onClick={() => selectItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
