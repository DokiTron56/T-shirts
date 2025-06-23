import React, { useState } from 'react';
import './styles.css';
import Header from './Header';
import BotonCarrito from './BotonCarrito';
import Catalogo from './Catalogo';
import GaleriaProximamente from './GaleriaProximamente';
import GuiaTallas from './GuiaTallas';
import FormularioContacto from './FormularioContacto';
import Footer from './Footer';

const HomePage = () => {
  const [seccion, setSeccion] = useState('home');

  return (
    <div className="main-content">
      <BotonCarrito />
      <Header onChangeSeccion={setSeccion} />

      {seccion === 'home' && (
        <>
          <div className="secciones-superiores">
            <section id="home">
              <h2>Bienvenido a DokiT-shirts</h2>
              <p>En DokiT-shirts ofrecemos camisetas calidad precio para todos los fanaticos del futbol, con envío rápido y pago seguro.</p>
              <p>Conoce lo que ofrecemos:</p>
              <ul id="beneficios">
                <li>Envíos a todo Chile</li>
                <li>Pago seguro</li>
                <li>Diseños exclusivos</li>
                <li>Camisetas Clásicas</li>
                <li>Sección para enviar consultas</li>
              </ul>
            </section>

            <section id="quienesSomos">
              <h2>Quiénes Somos</h2>
              <p>
                Somos un equipo apasionado por el deporte y la moda, dedicados a traer las mejores camisetas.
              </p>
              <h3>Porque somos diferentes</h3>
              <p>
                Muchas tiendas online ofrecen lo mismo que nosotros, pero nuestras camisetas son más baratas.
              </p>
            </section>
          </div>
  
          <Catalogo />
          <GaleriaProximamente />
          <GuiaTallas />
          <FormularioContacto />
        </>
      )}

      {seccion === 'catalogo' && <Catalogo />}
      {seccion === 'galeria' && <GaleriaProximamente />}
      {seccion === 'guiaTallas' && <GuiaTallas />}
      {seccion === 'contacto' && <FormularioContacto />}

      <Footer />
    </div>
  );
};

export default HomePage;
