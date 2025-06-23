// src/GuiaTallas.jsx
import React from 'react';

const GuiaTallas = () => {
  return (
    <section id="guiaTallas">
      <h2>Guía de Tallas</h2>
      <p>Consulta esta tabla para saber qué talla te conviene según tus medidas:</p>

      <table className="tabla-tallas">
        <thead>
          <tr>
            <th>Talla</th>
            <th>Pecho (cm)</th>
            <th>Altura (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>86 - 94</td>
            <td>165 - 170</td>
          </tr>
          <tr>
            <td>M</td>
            <td>95 - 102</td>
            <td>171 - 176</td>
          </tr>
          <tr>
            <td>L</td>
            <td>103 - 110</td>
            <td>177 - 182</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>111 - 118</td>
            <td>183 - 188</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default GuiaTallas;
