import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../store/context";
import { ListGroup } from 'react-bootstrap';
import '../styles/Global.css'

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return ( 
<ListGroup>
  <h4 className="mb-2">Каталог:</h4>
  {device.types.map(type => (
    <ListGroup.Item 
      key={type.id}
      className={`type-item ${type.id === device.selectedType.id ? 'active' : ''}`}
      onClick={() => {
        device.setSelectedType(
          type.id === device.selectedType?.id ? "" : type
        );
      }}
    >
      {type.name}
    </ListGroup.Item>
  ))}
</ListGroup>



    
  );
});

export default TypeBar;
