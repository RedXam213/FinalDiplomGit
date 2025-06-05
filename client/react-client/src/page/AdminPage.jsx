import React, { useState, useEffect,useContext } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import CreateBrand from '../components/modalsPage/CreateBrand'
import CreateDevice from '../components/modalsPage/CreateDevice'
import CreateType from '../components/modalsPage/CreateType'
import { getBrands, getTypes } from '../components/axiosHttp/deviceAPI';
import { Context } from '../store/context'
import { observer } from 'mobx-react-lite';
import '../styles/Global.css';

const Admin = observer(() => {
    const { device } = useContext(Context)
    
    const [brandVisible,setBrandVisible] = useState(false)
    const [typeVisible,setTypeVisible] = useState(false)
    const [deviceVisible,setDeviceVisible] = useState(false)

    useEffect(()=> {
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
      },[])

      return (
        <Container className="admin-container">
          <div className="admin-button-group">
            <button className="admin-button" onClick={() => setTypeVisible(true)}>
              Додати тип
            </button>
            <button className="admin-button" onClick={() => setBrandVisible(true)}>
              Додати бренд
            </button>
            <button className="admin-button" onClick={() => setDeviceVisible(true)}>
              Додати пристрій
            </button>
          </div>
    
          <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
          <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
          <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
      );
});

export default Admin;
