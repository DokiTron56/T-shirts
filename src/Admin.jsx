import React, { useState, useEffect } from 'react';
import './styles.css';

const Admin = () => {
  const [camisetas, setCamisetas] = useState([]);
  const [form, setForm] = useState({ nombre: '', img: '', categoria: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('camisetas')) || [];
    setCamisetas(guardadas);
  }, []);

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('camisetas', JSON.stringify(camisetas));
  }, [camisetas]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.img || !form.categoria) return;

    if (editIndex !== null) {
      const copia = [...camisetas];
      copia[editIndex] = form;
      setCamisetas(copia);
      setEditIndex(null);
    } else {
      setCamisetas([...camisetas, form]);
    }

    setForm({ nombre: '', img: '', categoria: '' });
  };

  const handleEdit = (index) => {
    setForm(camisetas[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const copia = [...camisetas];
    copia.splice(index, 1);
    setCamisetas(copia);
  };

  return (
    <div className="admin">
      <h2>Panel de Administración</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de Camiseta"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="img"
          placeholder="URL de Imagen"
          value={form.img}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
        />
        <button type="submit">{editIndex !== null ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <div className="admin-lista">
        {camisetas.map((c, i) => (
          <div className="admin-item" key={i}>
            <img src={c.img} alt={c.nombre} />
            <p><strong>{c.nombre}</strong> ({c.categoria})</p>
            <button onClick={() => handleEdit(i)}>Editar</button>
            <button onClick={() => handleDelete(i)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
