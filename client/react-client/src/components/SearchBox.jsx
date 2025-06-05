import React, { useState, useEffect, useRef } from 'react';
import { Form, ListGroup, InputGroup } from 'react-bootstrap';
import { getDevices } from './axiosHttp/deviceAPI';
import { useNavigate } from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      getDevices(null, [], 1, 5, query).then(data => {
        setResults(data.rows || []);
        setShowResults(true);
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setQuery('');
    setShowResults(false);
    navigate(DEVICE_ROUTE + '/' + id);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={wrapperRef}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Пошук товару..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
        />
      </InputGroup>
      
    {showResults && (
  <ListGroup
    style={{
      position: 'absolute',
      top: '100%',
      zIndex: 1000,
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderTop: 'none',
      maxHeight: '300px',
      overflowY: 'auto',
    }}
  >
    {results.length > 0 ? (
      results.map(device => (
        <ListGroup.Item
          key={device.id}
          action
          onClick={() => handleSelect(device.id)}
        >
          {device.name}
        </ListGroup.Item>
      ))
    ) : query.trim() !== '' ? (
      <ListGroup.Item disabled>
        Результат не знайдено
      </ListGroup.Item>
    ): null}
  </ListGroup>
)}
    </div>
  );
};

export default SearchBox;
