import React from 'react';

const Header = ({ onChangeSeccion }) => {
  return (
    <header>
      <div className="header-top">
        <img src="/img/logo.png" alt="Logo DokiT-shirts" />
        <h1>DokiT-shirts</h1>
      </div>
      <nav>
        <ul>
          <li><button onClick={() => onChangeSeccion('home')}>Home</button></li>
          <li><button onClick={() => onChangeSeccion('catalogo')}>Catálogo</button></li>
          <li><button onClick={() => onChangeSeccion('guiaTallas')}>Guía de Tallas</button></li>
          <li><button onClick={() => onChangeSeccion('galeria')}>Próximamente</button></li>
          <li><button onClick={() => onChangeSeccion('contacto')}>Contacto</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
