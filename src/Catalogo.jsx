import { CarritoContext } from './CarritoContext';
import React, { useState, useContext, useEffect } from 'react';


const productos = [
  {
    id: 1,
    nombre: 'Real Madrid 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/real.jpg',
  },
  {
    id: 2,
    nombre: 'Universidad de Chile 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/u.jpg',
  },
  {
    id: 3,
    nombre: 'Colo-Colo 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/colo.jpg',
  },
  {
    id: 4,
    nombre: 'Arsenal 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/arsenal.jpg',
  },
  {
    id: 5,
    nombre: 'Manchester United 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/united.jpg',
  },
  {
    id: 6,
    nombre: 'Manchester City 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/city.jpg',
  },
  {
    id: 7,
    nombre: 'Barca 24-25',
    precio: 20000,
    categoria: '24-25',
    imagen: '/img/barca.jpg',
  },
  {
    id: 8,
    nombre: 'Real Madrid 99',
    precio: 20000,
    categoria: 'retros',
    imagen: '/img/real99.jpg',
  },
  {
    id: 9,
    nombre: 'Boca 02-03',
    precio: 20000,
    categoria: 'retros',
    imagen: '/img/boca02-03.jpg',
  },
  {
    id: 10,
    nombre: 'Manchester City Retro',
    precio: 20000,
    categoria: 'retros',
    imagen: '/img/cityretro.jpg',
  },
  {
    id: 11,
    nombre: 'Colo-Colo 1991',
    precio: 20000,
    categoria: 'retros',
    imagen: '/img/colo91.jpg',
  },
  {
    id: 12,
    nombre: 'Colo-Colo Entrenamiento',
    precio: 20000,
    categoria: 'exclusivas',
    imagen: '/img/coloen.jpg',
  },
  {
    id: 13,
    nombre: 'Real Madrid Y3',
    precio: 20000,
    categoria: 'exclusivas',
    imagen: '/img/y3.jpg',
  },
  {
    id: 14,
    nombre: 'Barcelona x Travis Scott',
    precio: 20000,
    categoria: 'exclusivas',
    imagen: '/img/travis.jpg',
  },
  {
    id: 15,
    nombre: 'Colo-Colo Centenario',
    precio: 20000,
    categoria: 'exclusivas',
    imagen: '/img/ColoC.jpg',
  },

];

const Catalogo = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState({});
  const [mensaje, setMensaje] = useState(''); // Estado para mensaje

  // Aquí obtienes la función para agregar productos al carrito
  const { agregarProducto } = useContext(CarritoContext);

  const filtrarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const agregarAlCarrito = (producto, talla) => {
    agregarProducto({ ...producto, talla });
    setMensaje(`Se agregó "${producto.nombre}" (talla ${talla}) al carrito.`);
    setTimeout(() => setMensaje(''), 3000); // Ocultar mensaje después de 3 segundos
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      categoriaSeleccionada === 'todas' || producto.categoria === categoriaSeleccionada
  );

useEffect(() => {
  if (!mensaje) return;
  const timer = setTimeout(() => setMensaje(''), 5000);
  return () => clearTimeout(timer);
}, [mensaje]);

  return (
    <section id="catalogo">
      <h2>Catálogo de Camisetas</h2>

      {mensaje && (
  <div
    style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#27ae60',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      fontWeight: 'bold',
      zIndex: 9999,
      animation: 'fadein 0.5s, fadeout 0.5s 4.5s',
    }}
  >
    {mensaje}
  </div>
)}

<style>{`
  @keyframes fadein {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeout {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100%); }
  }
`}</style>

      <h3>Categorías de Camisetas</h3>

      <div className="categorias">
        <div className="categoria" onClick={() => filtrarCategoria('24-25')}>
          <img src="/img/24-25.jpg" alt="Camisetas 24-25" />
          <p>Camisetas 24-25</p>
        </div>
        <div className="categoria" onClick={() => filtrarCategoria('exclusivas')}>
          <img src="/img/ex.jpg" alt="Camisetas Exclusivas" />
          <p>Camisetas Exclusivas</p>
        </div>
        <div className="categoria" onClick={() => filtrarCategoria('retros')}>
          <img src="/img/retro.jpg" alt="Camisetas Retros" />
          <p>Camisetas Retros</p>
        </div>
        <div className="categoria mostrar-todas" onClick={() => filtrarCategoria('todas')}>
          <p>Mostrar Todas</p>
        </div>
      </div>

      <h3 id="subtitulo-categoria">
        {categoriaSeleccionada === 'todas'
          ? 'Todas las Camisetas'
          : `Camisetas ${categoriaSeleccionada}`}
      </h3>

      <section id="productos">
        {productosFiltrados.map((producto) => (
          <div className="producto" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio.toLocaleString('es-CL')}</p>
            <label htmlFor={`talla-${producto.id}`}>Talla:</label>
            <select
              id={`talla-${producto.id}`}
              value={tallasSeleccionadas[producto.id] || 'S'}
              onChange={(e) =>
                setTallasSeleccionadas({
                  ...tallasSeleccionadas,
                  [producto.id]: e.target.value,
                })
              }
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button
              onClick={() =>
                agregarAlCarrito(producto, tallasSeleccionadas[producto.id] || 'S')
              }
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Catalogo;
