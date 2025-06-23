// src/components/BotonCarrito.jsx
import React, { useState } from 'react';
import ModalCarrito from './ModalCarrito';

const BotonCarrito = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <button
        id="carritoBoton"
        title="Ver carrito 🛒"
        onClick={() => setModalAbierto(true)}
        style={styles.boton}
      >
        🛒
      </button>
      <ModalCarrito visible={modalAbierto} onClose={() => setModalAbierto(false)} />
    </>
  );
};

const styles = {
  boton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    border: '2px solid #000',
    borderRadius: '50%',
    padding: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 999
  }
};

export default BotonCarrito;
