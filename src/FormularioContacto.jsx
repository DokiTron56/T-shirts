import React, { useState } from 'react';


const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    edad: '',
    fecha: '',
    consultaTipo: '',
    mensajeConsulta: '',
    terminos: false
  });

  const [mensajeExito, setMensajeExito] = useState('');
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validar nombre: solo letras y espacios
    if (name === 'nombre' && /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(value)) {
      return; // Ignora caracteres inválidos
    }

    // Validar edad: solo números
    if (name === 'edad' && value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 letras.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      nuevosErrores.correo = 'Correo inválido.';
    }

    if (formData.edad < 10 || formData.edad > 100) {
      nuevosErrores.edad = 'Edad debe estar entre 10 y 100.';
    }

    if (!formData.consultaTipo) {
      nuevosErrores.consultaTipo = 'Selecciona un tipo de consulta.';
    }

    if (formData.mensajeConsulta.trim().length < 10) {
      nuevosErrores.mensajeConsulta = 'El mensaje debe tener al menos 10 caracteres.';
    }

    if (!formData.terminos) {
      nuevosErrores.terminos = 'Debes aceptar los términos.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    console.log('Formulario enviado:', formData);

    // Guardar en localStorage
    localStorage.setItem('datosContacto', JSON.stringify(formData));

    setMensajeExito('¡Gracias por tu consulta! Te responderemos pronto.');

    // Reiniciar el formulario
    setFormData({
      nombre: '',
      correo: '',
      edad: '',
      fecha: '',
      consultaTipo: '',
      mensajeConsulta: '',
      terminos: false
    });

    setErrores({});
  };

  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej: Felipe Silva"
          required
          minLength="3"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}

        <label htmlFor="correo">Correo electrónico:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="doki@correo.com"
          required
          value={formData.correo}
          onChange={handleChange}
        />
        {errores.correo && <p style={{ color: 'red' }}>{errores.correo}</p>}

        <label htmlFor="edad">Edad:</label>
        <input
          type="number"
          id="edad"
          name="edad"
          min="10"
          max="100"
          placeholder="Ej: 25"
          required
          value={formData.edad}
          onChange={handleChange}
        />
        {errores.edad && <p style={{ color: 'red' }}>{errores.edad}</p>}

        <label htmlFor="fecha">Fecha de consulta:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          required
          value={formData.fecha}
          onChange={handleChange}
        />

        <label htmlFor="consultaTipo">Tipo de consulta:</label>
        <select
          id="consultaTipo"
          name="consultaTipo"
          required
          value={formData.consultaTipo}
          onChange={handleChange}
        >
          <option value="" disabled>Selecciona el tema</option>
          <option value="tallas">Tallas y medidas</option>
          <option value="modelos">Modelos disponibles</option>
          <option value="colores">Colores y diseños</option>
          <option value="personalizacion">Personalización</option>
          <option value="stock">Disponibilidad y stock</option>
          <option value="otros">Otro</option>
        </select>
        {errores.consultaTipo && <p style={{ color: 'red' }}>{errores.consultaTipo}</p>}

        <label htmlFor="mensajeConsulta">Mensaje o pregunta:</label>
        <textarea
          id="mensajeConsulta"
          name="mensajeConsulta"
          placeholder="Escribe aquí tu consulta..."
          required
          minLength="10"
          rows="4"
          value={formData.mensajeConsulta}
          onChange={handleChange}
        ></textarea>
        {errores.mensajeConsulta && <p style={{ color: 'red' }}>{errores.mensajeConsulta}</p>}

        <label>
          <input
            type="checkbox"
            id="terminos"
            name="terminos"
            required
            checked={formData.terminos}
            onChange={handleChange}
          />
          Acepto los <span onClick={() => setMostrarModal(true)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>términos y condiciones</span>
        </label>
        {errores.terminos && <p style={{ color: 'red' }}>{errores.terminos}</p>}

        {/* 🪟 Ventana emergente de términos */}
        {mostrarModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
              textAlign: 'center',
              position: 'relative'
            }}>
              <button
                onClick={() => setMostrarModal(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  color: '#333',
                  cursor: 'pointer'
                }}
                aria-label="Cerrar"
                title="Cerrar"
              >
                &times;
              </button>

              <h3 style={{ marginTop: '20px' }}>Términos y Condiciones</h3>
              <p>
                Al aceptar estos términos, no tienes ninguna razon para demandarnos <br />
                Además, te conviertes en Madridista de corazon
              </p>
            </div>
          </div>
        )}

        {errores.terminos && <p style={{ color: 'red' }}>{errores.terminos}</p>}

        <button type="submit">Enviar consulta</button>
      </form>

      {mensajeExito && <p style={{ color: 'green', marginTop: '10px' }}>{mensajeExito}</p>}
    </section>
  );
};

export default FormularioContacto;
