import React, { useContext} from 'react';
import { Modal, Form, Button, Dropdown, DropdownMenu, Col, Row } from 'react-bootstrap'
import { Context } from '../../store/context'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { createDevice } from '../axiosHttp/deviceAPI'
import '../../styles/Global.css';

const CreateDevice = observer(({show,onHide}) => {
    const { device } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState()
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description:'', number: Date.now()}])
    }

    const deleteInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const inputInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value}: i)) /*Просто редачим массив info отправляя новый массив в стейт, ищем по 
        числу элемента который передали и числу из уже созданного пустого массива но с уникальным айди*/
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => { 
            onHide()
            setName('')
            setPrice('')
            setFile(null)
            setInfo([])
            device.setSelectedBrand({})
            device.setSelectedType({})

        })
    }

    return (
    <Modal
        show = {show}
        onHide={onHide}
        size="md"
        centered 
        >
        <Modal.Header closeButton>
            <Modal.Title className="modal-title-red">
            Додати новий пристрій
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className='mb-4'>
                    <Dropdown.Toggle className='custom-toggle'>{device.selectedType.name || "Обери тип"}</Dropdown.Toggle>
                    <DropdownMenu>
                        {device.types.map(type => 
                            <Dropdown.Item
                                onClick={() => device.setSelectedType(type)}
                                key={type.id}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </DropdownMenu>
                </Dropdown>

                <Dropdown className='mt-3'>
                    <Dropdown.Toggle className='custom-toggle'>{device.selectedBrand.name || "Обери бренд"}</Dropdown.Toggle>
                    <DropdownMenu>
                        {device.brands.map(brand => 
                            <Dropdown.Item
                                onClick={() => device.setSelectedBrand(brand)}
                                key={brand.id}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </DropdownMenu>
                </Dropdown>

                <Form.Control
                value={name}
                onChange={e => setName(e.target.value)} 
                className='mt-4'
                placeholder='Введіть назву'
                />

                <Form.Control
                value={price}
                onChange={e => setPrice(Number(e.target.value))} 
                className='mt-4'
                placeholder='Введіть ціну у грн'
                type='number'
                />

                <Form.Control 
                className='mt-4'
                placeholder='Завантажте фото'
                type='file'
                onChange={(e) => setFile(e.target.files[0])} 
                />
                    
                <hr />
                    
                <Button
                className="custom-btn confirm"
                onClick={addInfo}
                >
                    Додати характеристики
                </Button>
                { /*Рендерится только тогда когда есть что то в массиве info, мы добавляем в info через стейт setInfo который есть в слушателете onClick обьект с пустыми значениями (кроме числа-айдишки) 
                    По итогу при нажатии кнопки мы добавили обьект и map перебрал массив, по итогу которого отрендерились написанные Row. Удаление происходит через функцию deleteInfo(текущее число-айди) 
                    в основе которой тот же setInfo, только по фильтру который берет все обьекты из info, по фильтру условие которого в том что число обьекта !== переданное число
                    сравнивает переданное число-айди с числами из обьектов массива info! И при условии true возвращает обьекты. Тоесть Все что не равняется true, а тут оно не не равняется ибо на самом деле
                    одно и то же число, и возвращает false.
                  */
                    info.map(i => 
                        <Row className='mt-3' key={i.number}>
                            <Col md = {4} >
                                <Form.Control
                                value={i.title || ''}
                                onChange={(e)=> 
                                    inputInfo('title', e.target.value, i.number)
                                } 
                                placeholder = "Додайте назву хар-ки"
                                />
                            </Col>

                            <Col md = {4}>
                                <Form.Control
                                value={i.description || ''}
                                onChange={(e) => 
                                    inputInfo('description', e.target.value, i.number)
                                }
                                placeholder = "Додайте опис"
                                />
                            </Col>
                            <Col md = {4}>
                                <Button 
                                className="custom-btn cancel"
                                onClick={() => deleteInfo(i.number)}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )
                }

            </Form>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
            <Button className="custom-btn cancel" onClick={onHide}>Закрити</Button>
            <Button className="custom-btn confirm" onClick={addDevice}>Додати</Button>
        </Modal.Footer>
    </Modal>
    )
    
})

export default CreateDevice