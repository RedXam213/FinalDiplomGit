import React, { useContext } from 'react';
import { Context } from '../store/context';
import { ButtonGroup, Button } from 'react-bootstrap';
import '../styles/Global.css'

const SortUpDownButtons = () => {
  const { device } = useContext(Context);
  if (!device.selectedType?.id) return null;
    
  return (
      <div className="sort-buttons">
          <span style={{ padding: "4px 2px" }}>Сортування:</span>
          <button 
              onClick={() => device.setSortOrder('asc')}
              className={device.sortOrder === 'asc' ? 'active' : ''}
          >
              Від дешевих до дорогих</button>
          <button 
              onClick={() => device.setSortOrder('desc')}
              className={device.sortOrder === 'desc' ? 'active' : ''}
          >
              Від дорогих до дешевих</button>
          <button 
              onClick={() => device.setSortOrder('newest')}
              className={device.sortOrder === 'newest' ? 'active' : ''}
          >
              Новинка</button>
      
    </div>
  );
};

export default SortUpDownButtons;
