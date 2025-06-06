import React, { useContext, useEffect } from 'react'
import TypeBar from '../components/TypeBar';
import Pages from '../components/Pagination';
import { Container, Row, Col } from "react-bootstrap";
import BrandBar from '../components/BrandBar';
import DeviceCatalog from '../components/DeviceCatalog';
import { observer } from 'mobx-react-lite';
import { Context } from '../store/context';
import { getBrands, getDevices, getTypes, getBrandsByType } from '../components/axiosHttp/deviceAPI';
import SideBar from '../components/SideBar';
import BrandBarTop from '../components/BrandBarTop';
import NamePath from '../components/NamePath';
import SortUpDownButtons from '../components/UpDownPriceButton';
import '../styles/Global.css';


const Shop = observer(() => {
  const { device } = useContext(Context);
  

  useEffect(() => {
      // ініціалізація
      getTypes().then(data => device.setTypes(data))
      getBrands().then(data => device.setBrands(data))
      getDevices(null, null, 1, device.limit).then(data => {
        device.setDevices(data.rows)
        device.setCount(data.count)
      })
    }, [])
    
  useEffect(() => {
    const { min, max } = device.priceFilter;
    device.setPage(1)
    if (device.selectedType?.id) {
      getBrandsByType(device.selectedType.id).then(data => {
        device.setBrands(data)
      })
    } else {
      getBrands().then(data => device.setBrands(data)) 
    }

    getDevices(device.selectedType?.id, device.selectedBrands, 1, device.limit, null, min, max, device.sortOrder)
      .then(data => {
        device.setDevices(data.rows)
        device.setCount(data.count)
      })
  }, [device.selectedType,device.selectedBrands,device.priceFilter,device.sortOrder])


    
  useEffect(() => {
    const { min, max } = device.priceFilter;
    getDevices(device.selectedType?.id, device.selectedBrands, device.page, device.limit, null, min, max, device.sortOrder)
      .then(data => {
        device.setDevices(data.rows)
        device.setCount(data.count)
      })
  }, [device.page])

 
  
    return (
      <Container className="mt-5">
          <NamePath /> 
      <Row className="g-4">
        <Col md={3}>
          <div className='sidebox'>
            <SideBar />
          </div>
        </Col>
        <Col md={9}>
        <div className="content-box">
          <SortUpDownButtons />
          <BrandBarTop />
          <DeviceCatalog />
          <Pages />
        </div>
        </Col>
        
      </Row>
    </Container>
    )
})

export default Shop;




/*
То как работает запрос к серверу на получение девайсов и то какой прилетает ответ и что происходит на апишке:
Фронт:
1)В BrandBar и TypeBar сетаем нужный бренд/тайп, после чего тригерится useEffect отправляя запрос getDevices, который просто пристает к запросу get на пути device/
Бек:
1)Мы оправляем запрос на бекенд метод getAllDevice который принимает brandId,TypeId,page,limit, там апишка обсчитывает offset - сколько устройств надо пропустить (page * limit - limit)
Сначала при запросе к бд, бд по фильтрам ищет подходящие устройства, отдавая в виде "списка строк" после чего пропускает из полученного списка кол-во устройств указанного в offset, и отдает то
кол-во устройств которое указано в лимит. 
Устройств по фильтрам/без : 20
offset = page * limit - limit (получили сколько устройств мы уже отрисовали на прошлых стр) и с offset (3 * 3 - 3(нам же страницу третью нужно отрисовать, поэтому -)) = 6. 
С 7 устройства начинаем передачу строк, передаем после с 7 строки включительно 3 устройства, т.к лимит устройств переданный в запросе к бд - 3.
2)Бекенд апи нам возвращает в массиве взятые с бд устройства и кол-во устройств всего подходящие по фильтрам и мы принимаем это в фронте перекидывая в глобальный стейт device и count
3)Тут мы уже рассчитываем кол-во отображаемых страниц в баре с помощью count и limit, и создаем deviceItem через DeviceCatalog из устройств переданных в device
*/