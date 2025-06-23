import React, { useState, useContext } from 'react';
import { CarritoContext } from './CarritoContext';

const ModalCarrito = ({ visible, onClose }) => {
  const { carrito, limpiarCarrito, actualizarCantidad, eliminarProducto, agregarProducto } = useContext(CarritoContext);

  // Estados para simulación de pago
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [fecha, setFecha] = useState('');
  const [cvv, setCvv] = useState('');
  const [mensajePago, setMensajePago] = useState('');

  const pagar = () => {
      if (!nombre || !numero || !fecha || !cvv) {
        setMensajePago('Por favor completa todos los campos.');
        return;
      }

      const datosPago = {
        nombre,
        numero,
        fecha,
        cvv,
        carrito
      };

      // Guardar en localStorage
      localStorage.setItem('datosPago', JSON.stringify(datosPago));

      setMensajePago('¡Pago realizado exitosamente! 🎉 Sus datos han sido robados ;)');
    };

  // Función para manejar el cambio de talla
  const cambiarTalla = (item, nuevaTalla) => {
    if (nuevaTalla === item.talla) return; // Si no cambia la talla, no hacer nada

    // Primero eliminamos el item con la talla antigua
    eliminarProducto(item.id, item.talla);

    // Luego agregamos el producto con la nueva talla y la misma cantidad
    agregarProducto({ ...item, talla: nuevaTalla, cantidad: item.cantidad });
  };

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton} title="Cerrar carrito">
          &times;
        </button>
        <h2>Carrito de Compras</h2>
        <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '1rem' }}>
          {carrito.length === 0 ? (
            <li>No hay productos en el carrito</li>
          ) : (
            carrito.map((item, i) => (
              <li key={`${item.id}-${item.talla}-${i}`} style={{ marginBottom: '10px' }}>
                <div>
                  {item.nombre} - Precio unitario: ${item.precio.toLocaleString('es-CL')}
                </div>

                <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                  <label>
                    Talla:{' '}
                    <select
                      value={item.talla}
                      onChange={(e) => cambiarTalla(item, e.target.value)}
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </label>
                </div>

                <div>
                  Cantidad:{' '}
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => {
                      const nuevaCant = parseInt(e.target.value);
                      if (nuevaCant > 0) {
                        actualizarCantidad(item.id, item.talla, nuevaCant);
                      }
                    }}
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                  <button
                    onClick={() => eliminarProducto(item.id, item.talla)}
                    style={{
                      backgroundColor: '#c0392b',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {carrito.length > 0 && (
          <button
            onClick={limpiarCarrito}
            style={{
              marginBottom: '1rem',
              backgroundColor: '#c0392b',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Vaciar carrito
          </button>
        )}

        <div id="simulacionPago">
          <h3>Simulación de pago</h3>

          <label>Nombre en la tarjeta</label>
          <input
            type="text"
            placeholder="Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={styles.input}
          />

          <label>Número de tarjeta</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            style={styles.input}
          />

          <label>Fecha de expiración</label>
          <input
            type="month"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={styles.input}
          />

          <label>CVV</label>
          <input
            type="password"
            placeholder="123"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={styles.input}
          />

          {/* Total del pedido */}
          <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '16px' }}>
            Total pedido: $
            {carrito
              .reduce((total, item) => total + item.precio * item.cantidad, 0)
              .toLocaleString('es-CL')}
          </div>

          <button
            onClick={pagar}
            style={{ ...styles.button, marginTop: '10px' }}
          >
            Pagar
          </button>
          <p
            id="mensajePago"
            style={{
              color: mensajePago.includes('exitosamente') ? 'green' : 'red',
              marginTop: '10px',
            }}
          >
            {mensajePago}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    maxHeight: '90%',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  closeButton: {
    float: 'right',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  input: {
    width: '100%',
    padding: '6px 8px',
    margin: '6px 0 12px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default ModalCarrito;
