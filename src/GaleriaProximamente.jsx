import React from 'react';

const GaleriaProximamente = () => {
  return (
    <section id="galeria">
      <h2>Próximamente</h2>
      <p>Estas camisetas estarán disponibles muy pronto:</p>

      <div className="galeria-proximamente">
        <div className="item-prox">
          <img src="/img/arsenal26.jpg" alt="Arsenal Proximamente" />
          <p>Arsenal Temporada 25/26</p>
        </div>
        <div className="item-prox">
          <img src="/img/barca26.jpg" alt="Barca 25/26" />
          <p>Barcelona Temporada 25/26</p>
        </div>
        <div className="item-prox">
          <img src="/img/madrid26.jpg" alt="Real Madrid 25/26" />
          <p>Real Madrid Temporada 25/26</p>
        </div>
      </div>
    </section>
  );
};

export default GaleriaProximamente;