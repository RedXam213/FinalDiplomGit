import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from '../store/context';
import { Pagination } from "react-bootstrap"
import '../styles/Global.css'

const Pages = observer(() => { 

    const { device } = useContext(Context)
    const pageMath = Math.ceil(device.count / device.limit)
    const numPage = []
    /* 
    сам Pagination, а именно PageItem (кол-во страниц) рендерится от количества обсчитанных в формуле страниц, а обсчитывается он просто от полученного значения count всех устройств от сервера и лимита 
     отображения устройств на странице. Так же с сервера отправляются найденные устройства по фильтру/без и после определенной точки заданой offset, но возвращает он четко количество указанное в limit

     При нажатии очевидно цифра page сохраняется в device.page которая и передается серваку для обсчета offset (сколько нужно пропустить устройств)
    */

    
    
    for (let i = 0; i < pageMath; i++) {
        numPage.push(i + 1)
    }

    return (
        <Pagination className="custom-pagination">
            {numPage.map(page => 
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() =>  
                        device.setPage(page)
                    }
                >
                    { page }
                </Pagination.Item> 
            )}
        </Pagination>
    )
})

export default Pages