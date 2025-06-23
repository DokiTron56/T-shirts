import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // 🟢 Cargar del localStorage al iniciar
  useEffect(() => {
    const guardado = localStorage.getItem('carrito');
    if (guardado) setCarrito(JSON.parse(guardado));
  }, []);

  // 💾 Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (productoNuevo) => {
    setCarrito((carritoActual) => {
      const existeIndex = carritoActual.findIndex(
        (item) => item.id === productoNuevo.id && item.talla === productoNuevo.talla
      );
      if (existeIndex >= 0) {
        const nuevoCarrito = [...carritoActual];
        nuevoCarrito[existeIndex].cantidad += 1;
        return nuevoCarrito;
      } else {
        return [...carritoActual, { ...productoNuevo, cantidad: 1 }];
      }
    });
  };

  const actualizarCantidad = (id, talla, nuevaCantidad) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id && item.talla === talla
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const eliminarProducto = (id, talla) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => !(item.id === id && item.talla === talla))
    );
  };

  const limpiarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        limpiarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

