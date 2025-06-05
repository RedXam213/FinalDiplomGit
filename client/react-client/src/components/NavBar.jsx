import React, { useContext,useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../store/context';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import SearchBox from './SearchBox';
import BasketModal from '../page/Basket';
import { BsCart3 } from "react-icons/bs";
import { FaUserShield, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import logo from '../assets/logoNestV21.png'; 

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const { basket } = useContext(Context);
  const navigate = useNavigate();
  

  const logout = () => {
    user.setUser({});
    user.setAuth(false);
    user.setRole('');
    localStorage.removeItem('token');
    window.location.reload();
  };


  return (
    <Navbar className="navbar-purple" expand="lg" fixed="top">
      <Container className="container-fixed-width d-flex justify-content-between align-items-center">
      <NavLink
        onClick={() => {
         navigate(SHOP_ROUTE);
         window.location.reload();
       }}
       style={{ textDecoration: 'none' }}
     >
       <img 
         src={logo} 
         alt="Logo" 
         className="logo-image"
       />
     </NavLink>

    <div className="d-flex align-items-center search-box">
      <div style={{ flex: '1 1 auto', minWidth: '600px', maxWidth: '600px' }}>
        <SearchBox />
      </div>
    </div>

    <Nav className="ms-auto navbar-icons">
  {user.isAuth ? (
    <>
      {user.role === 'ADMIN' && (
        <button
          className="navbar-icon-button"
          onClick={() => navigate(ADMIN_ROUTE)}
        >
          <FaUserShield size={23} />
        </button>
      )}
      <button
        className="navbar-icon-button"
        onClick={logout}
      >
        <FaSignOutAlt size={23} />
        <span className="user-name">{user.email}</span>
      </button>
    </>
  ) : (
    <button
      className="navbar-icon-button"
      onClick={() => navigate(LOGIN_ROUTE)}
    >
      <FaSignInAlt size={23} />
    </button>
  )}
</Nav>

<button
  className="navbar-icon-button"
  onClick={() => basket.setShowBasket(true)}
>
  <BsCart3 size={23} />
</button>


    <BasketModal show={basket.showBasket} onHide={() => basket.setShowBasket(false)} />
  </Container>
</Navbar>

  );
});

export default NavBar;

