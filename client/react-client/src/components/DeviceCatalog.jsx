import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../store/context";
import {Row, Container} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceCatalog = observer(() => {
    const {device} = useContext(Context)

    return (
        
  <Row className="d-flex align-items-stretch ">
        {device.devices.map(device =>
      
      <DeviceItem key={device.id} device={device}/>
        
        )}
  </Row>

    );
});

export default DeviceCatalog;