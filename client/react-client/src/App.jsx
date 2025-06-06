import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from './store/context';
import { observer } from 'mobx-react-lite';
import { check } from './components/axiosHttp/userApi';
import { Spinner } from 'react-bootstrap' 
import Footer from './components/Footer';

const App = observer(() => {
    const {user} = useContext(Context) 
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { 
            user.setAuth(false) 
            setLoading(false)
            return
        }
            check().then(data=> {
            user.setEmail(data.email)
            user.setUser(data)  
            user.setAuth(true)
            user.setRole(data.role) 
        }).finally(()=> setLoading(false))
        
    },[])
    if(loading) {
        return <Spinner animation= {"border"}/>
    }
    return ( 
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            
            <div style={{ flex: 1 }}>
              <AppRouter />
            </div>
      
            <Footer />
          </div>
        </BrowserRouter>
      )
})
export default App;    