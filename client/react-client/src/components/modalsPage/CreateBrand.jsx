import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { createBrand } from '../axiosHttp/deviceAPI'
import { useState } from 'react';
import '../../styles/Global.css';

const CreateBrand = ({show,onHide}) => {
    const [value,setValue] = useState('')
    const addBrand = () => {
        createBrand({name: value}).then(data =>{
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
          show={show}
          onHide={onHide}
          size="md"
          centered
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-red">
              Додати новий бренд
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="custom-form">
              <Form.Control
                placeholder="Введіть назву бренду"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button className="custom-btn cancel" onClick={onHide}>Закрити</Button>
            <Button className="custom-btn confirm" onClick={addBrand}>Додати</Button>
          </Modal.Footer>
        </Modal>
      );
}




export default CreateBrand