import Admin from"./page/Admin"
import Shop from "./page/Shop"
import DevicePage from "./page/DevicePage"
import Auth from "./page/Auth"
import { ADMIN_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
   {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },

]

//По сути сборочный аппарат/бд файл: просто берет пути из другого файла, и ставит на ключ компоненты которые нужно будет при нахождении этих путей отрисовать.