import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';


export const registration = async (email,password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role:'ADMIN'})
    localStorage.setItem('token', data.jwtToken)
    return jwtDecode(data.jwtToken)
}

export const login = async (email,password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.jwtToken)
    return jwtDecode(data.jwtToken)
} 

export const check = async () => {  
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.jwtToken)
    return jwtDecode(data.jwtToken)
}


/*
Как происходит авторизация по токену
1)Отправляем введенный email и пароль на сервер с помощью dataUser = await login(email, password) (post) логин/регистрацию
2)Сервер принимает реквест и разбирает его, после успешных проверок на стороне апишки сервера он высылает нам обьект с токеном ендопинтом - res.json({jwtToken})
3)Принимаем токен от сервера в data и кладем в localStorage через localStorage.setItem('token', data.jwtToken), после чего возвращаем его уже в обьявленную переменную dataUser
4)На данный момент токен ни на что не влияет, но у нас есть функция check, которую мы применяем в useEffect при монтированнии App.jsx.
5)При монтировании применяется check и мы отправляем get запрос который с помощью интерцептора(типо мидлвара) уже впихнул токен из localStorage который наполнен после login-а. 
6)Сервер принимает на мидлвару данный токен и вынимает его из реквеста, сравнивает его с помощью секретного ключа и отправляет дальше через next(), очевидно потом применяется функция userController.check
которая уже отравляет на фронт новый токен.

Таким образом когда мы удаляем токен то App.jsx заново монтируется, useEffect вызывает check get с токеном, которого нету, мидлвара на сервере это ловит и выбивает ошибку 401 "Не авторизован" 
В то время если все впорядке, .then у check просто обновляет true на isAuth у глобального стейта 
*/