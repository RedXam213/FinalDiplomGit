import React from 'react';
import '../styles/Global.css';

const Footer = () => {
  return (
    <footer className="site-footer">
  <div className="footer-container">
    <div className="footer-section">
      <h4>Про нас</h4>
      <div className="footer-link">Про компанію</div>
      <div className="footer-link">Контакти</div>
      <a className="footer-link" href="#">Новини</a>
    </div>

    <div className="footer-section">
      <h4>Консультація</h4>
      <a className="footer-link" href="tel:+380991111111">+38 (099) 111-11-11</a>
      <a className="footer-link" href="mailto:randomGmail.com">randomGmail@gmail.com</a>
    </div>

    <div className="footer-section">
      <h4>Наші соцмережі</h4>
      <div className="footer-socials">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-telegram-plane"></i></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
  © {new Date().getFullYear()} NestBuy. Усі права захищені ТОВ "Хижі бабаки"
  </div>
</footer>


  );
};

export default Footer;