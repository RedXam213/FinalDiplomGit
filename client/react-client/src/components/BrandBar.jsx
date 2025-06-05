import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../store/context";
import '../styles/Global.css';
import { motion } from "framer-motion";

const BrandBar = observer(({children}) => {
  const { device } = useContext(Context);

  if (!device.selectedType?.id) return null;

  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}       
    transition={{ duration: 0.5 }}       
  >
    <div className="brand-checkbox-container">
      <h5 className="mb-2">Бренди:</h5>
      <ul className="brand-checkbox-list">
        {device.brands.map((brand) => (
          <li key={brand.id} className="brand-checkbox-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={device.selectedBrands.includes(brand.id)}
                onChange={() => device.setSelectedBrands(brand.id)}
              />
              <span className="custom-checkbox"></span>
              {brand.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
    </motion.div>
  );
});

export default BrandBar;





/*
Как работает передача массива айди брендов для фильтрации
1) В глобальном стейте создали массив и selectedBrands и сетер который работает фильтром выбранных устройств. Методом Brands.includes(переданный brand.id) проверяется наличие,если да то юзается фильтр
this._selectedBrands=this._selectedBrands.filter(id => id !== brandId)Если условие да,(совпадает с переданным айди),то айдишник остается в selectedBrands, иначе не остается в массиве.Если not includes то
значит id нету в массиве и мы сохраняем старый массив, добавляя в конец новый brandId this._selectedBrands = [...this._selectedBrands, brandId]
2) При клике на карточку передаем в setSelectedBrand id бренда и тригерим useEffect на Shop.jsx
3)Отправляем через метод getDevices сам device.selectedBrands, метод проверяет не пустой ли переданный массив device.selectedBrands и params.brandId джоинит через запятую делая строчку
4)На серваке пришел массив brands и ну сам тип, где уже проверяется if(brandId) то выполняется const brandIds = brandId.split(",").map((id) => Number(id)) и очевидно блять каждый стал ебучим номером
5)После чего происходит что если массив больше 0, то передача в обьект where посредством метода, точнее where.brandId = brandId, и уже обьект передаем на поиск Device.findAndCountAll как и тип так же само
6)Нам приходит ответ от сервака с просто массивом девайсов который мы сетаем в глобальный стейт this._devices 
*/