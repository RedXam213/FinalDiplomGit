import React, { useState, useEffect, useContext} from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneDevices } from '../components/axiosHttp/deviceAPI';
import { getBasket, addDeviceToBasket } from '../components/axiosHttp/basketAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../store/context';

const DevicePage = observer(() => {
  const { basket } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneDevices(id).then((data) => setDevice(data));
  }, [id]);

  const handleAddToBasket = async (deviceId) => {
    const alreadyInBasket = basket.items.some((item) => item.device.id === deviceId);
    if (alreadyInBasket) {
      basket.setShowBasket(true);
    } else {
      await addDeviceToBasket(deviceId);
      const updatedBasket = await getBasket();
      basket.setItems(updatedBasket);
      basket.setShowBasket(true);
    }
  };

 
  const GoBackButt = () => {
    navigate(-1);
  };

  return (
    <Container className="device-page-container">
       <Button
          className="mb-3 button-back"
          onClick={GoBackButt}
        >
            ← Назад
        </Button>
      <Card className="device-page-card">
      <Row className="align-items-streched">
  
  <Col md={3} className="device-image-col">
    <Image
      width={320}
      height={320}
      src={import.meta.env.VITE_REACT_APP_API_URL + device.img}
      className="device-image-page"
    />
  </Col>


  <Col md={6}>
    <Card className="device-specs-card">
      <h4 className="device-specs-title">Характеристики</h4>
      {device.info.map((info, index) => (
        <div
          key={info.id}
          className={`device-spec-item ${index % 2 === 0 ? 'even' : ''}`}
        >
          <strong>{info.title}</strong>: {info.description}
        </div>
      ))}
    </Card>
  </Col>

  <Col md={3}>
    <Card className="device-info-card">
      <h3>{device.name}</h3>
      <h4 className="device-price-page">{device.price} ₴</h4>
      <Button
        className="add-to-basket-button"
        onClick={() => handleAddToBasket(device.id)}
      >
        Купити
      </Button>
      <Button
        className="add-to-basket-button"
        onClick={() => handleAddToBasket(device.id)}
      >
        Оформити у кредит
      </Button>
    </Card>
  </Col>
</Row>
      </Card>
    </Container>
  );
});

export default DevicePage;
