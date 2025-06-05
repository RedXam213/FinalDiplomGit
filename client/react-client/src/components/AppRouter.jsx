import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../store/context';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { user } = useContext(Context); // передали в обьект user ссылку на глобальный стейт с инфою и таким же названием (деструктуризацию провели)
  

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) => ( 
        <Route key={path} path={path} element={<Component />} />      
      ))} 

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;


//уже реально сборочный аппарат, в Routes прилетает текущая url, map отрисовывает в массив все варианты Route(роутов), после чего Routes сравнивает текущий и предложенный, 
// и отдает приказ отрендерится нужному Route в котором лежит нужный компонент. Path лишь индикатор для Route, а element - то что нужно отрисовать

