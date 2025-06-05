import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import BasketStore from './store/BasketStore';
import { Context } from './store/context'; 
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


console.log(import.meta.env.VITE_REACT_APP_API_URL)

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    basket: new BasketStore(),
  }}>
    <App />
  </Context.Provider>
);

/*мы создали коробку Context в отдельном файле(context.js), 
саму коробку заполнили экземплярами глобальных стейтами через Context.Provider value=, и экспортировали эту уже заполненную коробку Context в другие файлы*/



/*Мы создали коробку Context в которую запихнули созданный экземпляр глобального стейта, и с помощью context мы раздали на все файлы этот экземляр?
Так же обьясни чуть более детально что за Context.Provider и в общем как он работает*/
