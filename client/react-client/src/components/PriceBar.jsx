import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../store/context";
import { observer } from "mobx-react-lite";
import "../styles/Global.css";
import { motion } from "framer-motion";

const PriceBar = observer(() => {
  const { device } = useContext(Context);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setMinPrice(device.priceFilter.min !== null ? device.priceFilter.min : "");
    setMaxPrice(device.priceFilter.max !== null ? device.priceFilter.max : "");
  }, [device.priceFilter.min, device.priceFilter.max]);

  const applyPriceFilter = () => {
    device.setPriceFilter({
      min: minPrice || null,
      max: maxPrice || null,
    });
    device.setPage(1);
  };

  return (
    <motion.div
        initial={{ opacity: 0, x: -20 }}    
        animate={{ opacity: 1, x: 0 }}      
        transition={{ duration: 0.5 }}     
      >
    <div className="price-filter">
      <h5>Ціна, грн</h5>
      <Form className="price-form">
        <div className="price-input-group">
          <div className="price-input-wrapper">
            <span className="price-label">від</span>
            <Form.Control
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="₴"
              className="price-input"
            />
          </div>

          <div className="price-dash">–</div>

          <div className="price-input-wrapper">
            <span className="price-label">до</span>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="₴"
              className="price-input"
            />
          </div>
        </div>

        <div className="d-grid">
        <Button className="price-button" variant="primary" onClick={applyPriceFilter}>
            Застосувати
        </Button>

        </div>
      </Form>
    </div>
    </motion.div>
  );
});

export default PriceBar;
