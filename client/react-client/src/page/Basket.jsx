import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, Image, Spinner } from 'react-bootstrap';
import { getBasket, removeDeviceFromBasket } from '../components/axiosHttp/basketAPI';
import { Context } from '../store/context';
import '../styles/Global.css';
import { observer } from 'mobx-react-lite';
import { updateQuantity } from '../components/axiosHttp/basketAPI';

const BasketModal = observer(({ show, onHide }) => {
  const [loading, setLoading] = useState(true);
  const { basket } = useContext(Context);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const data = await getBasket();
      basket.setItems(data);

      const initialQuantities = {};
      data.forEach((item) => {
        initialQuantities[item.id] = item.quantity ?? 1;
      });
      setQuantities(initialQuantities);
      
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeDeviceFromBasket(id);
      fetchBasket(); 
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuantityChange = async (id, number) => {
    const newQuantity = Math.max(1, (quantities[id] || 1) + number);
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
    try {
      await updateQuantity(id, newQuantity); 
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    return basket.items.reduce(
      (sum, item) => sum + item.device.price * (quantities[item.id] || 1),
      0
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="true" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Кошик</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : basket.items.length === 0 ? (
          <p>Корзина порожня</p>
        ) : (
          basket.items.map((item, index) => (
            <div key={item.id}>
              <div className="d-flex align-items-center justify-content-between py-2">
                <Image
                  src={import.meta.env.VITE_REACT_APP_API_URL + item.device.img}
                  alt={item.device.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  className="me-3"
                  rounded
                />
                <div className="flex-grow-1">
                  <div className="fw-bold">{item.device.name}</div>
                  <div className="text-muted">Артикул: {item.device.id}</div>
                  <div className="mt-2" style={{ fontWeight: '600', color: 'var(--price-color)' }}>
                    {(item.device.price * (quantities[item.id] ?? 1))} ₴
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="md"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    –
                  </Button>
                  <span style={{ width: '24px', textAlign: 'center' }}>
                  {quantities[item.id] ?? 1}
                  </span>

                  <Button
                    variant="outline-secondary"
                    size="md"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </Button>
                </div>
                <Button variant="danger" size="md" className="ms-3" onClick={() => handleRemove(item.id)}>
                  ×
                </Button>
              </div>
              {index < basket.items.length - 1 && <hr />}
            </div>
          ))
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-5">Загалом: {calculateTotal()} ₴</div>
        <button className="btn-buy" onClick={() => basket.setShowBasket(false)}>
          Оформити замовлення
        </button>
      </Modal.Footer>
    </Modal>
  );
});

export default BasketModal;