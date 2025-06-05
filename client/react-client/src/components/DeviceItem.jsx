import React, { useState,useEffect,useContext } from 'react'
import { Card, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from "../utils/consts";
import { BsCart3 } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import { Context } from "../store/context";
import {getBasket, addDeviceToBasket } from '../components/axiosHttp/basketAPI';
import '../styles/Global.css';

const DeviceItem = observer(({ device }) => {
    const { basket } = useContext(Context);
    const navigate = useNavigate();
    
    const handleAddToBasket = async (e, deviceId) => {
        e.stopPropagation();
        const alreadyInBasket = basket.items.some(item => item.device.id === deviceId);
        if (alreadyInBasket) { 
            basket.setShowBasket(true);
        } else {
            await addDeviceToBasket(deviceId);
            const updatedBasket = await getBasket(); 
            basket.setItems(updatedBasket);
            basket.setShowBasket(true);
        }
    };
    
    return (
        <Col md={3} sm={6} xs={12} className="px-2 mb-3 d-flex">
            <Card
                className="device-item-card-custom w-100"
                onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
            >
                <div className="device-image-wrapper ">
                    <Image
                        className="device-image"
                        src={import.meta.env.VITE_REACT_APP_API_URL + device.img}
                        alt={device.name}
                        fluid
                    />
                </div>
                <div className="device-info px-3 pt-4 pb-4">
                    <div className="device-title">{device.name}</div>
                    <div className="device-price-cart d-flex justify-content-between align-items-center">
                        <div className="device-price">{device.price.toLocaleString()} ₴</div>
                        <div className="cart-icon" onClick={(e) => handleAddToBasket(e, device.id)}>
                            <BsCart3 size={20}/>
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    );
});

export default DeviceItem;
