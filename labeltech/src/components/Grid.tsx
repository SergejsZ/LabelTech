import { useState, ReactElement } from 'react';
import styles from '../styles/Grid.module.css';

type GridProps = {
  components: ReactElement[];
};

const Grid: React.FC<GridProps> = ({ components }) => {
  const [expandedComponent, setExpandedComponent] = useState<ReactElement | null>(null);
  const [styleProps, setStyleProps] = useState({});

  const handleClick = (component: ReactElement, event: React.MouseEvent) => {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    setStyleProps({
      position: 'fixed',
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      transition: 'all 0.5s ease',
      zIndex: 1000,
    });
    setExpandedComponent(component);
  };

  return (
    <div className={styles.grid}>
      {components.map((Component, index) => (
        <div
          key={index}
          className={styles.gridItem}
          // onClick={(event) => handleClick(Component, event)}
          >
          {Component}
        </div>
      ))}

      {expandedComponent && (
        <div style={styleProps}>
          {expandedComponent}
        </div>
      )}
    </div>
  );
};

export default Grid;
