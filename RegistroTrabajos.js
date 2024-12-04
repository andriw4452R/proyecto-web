// components/RegistroTrabajos.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroTrabajos() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState(null); // Nuevo estado para el archivo
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    if (!archivo) {
      alert('Por favor, sube un archivo antes de registrar el trabajo.');
      return;
    }
    const nuevoTrabajo = { titulo, autor, fecha, descripcion, archivo: archivo.name };
    const trabajos = JSON.parse(localStorage.getItem('trabajos')) || [];
    trabajos.push(nuevoTrabajo);
    localStorage.setItem('trabajos', JSON.stringify(trabajos));
    alert('Trabajo registrado exitosamente.');
    navigate('/listado-trabajos');
  };

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  return (
    <div className="registro-trabajos">
      <h1>Registro de Trabajo de Titulación</h1>
      <form onSubmit={handleRegistro}>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <label>Autor:</label>
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required />
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <label>Archivo:</label>
        <input type="file" onChange={handleArchivoChange} required />
        <button type="submit">Registrar Trabajo</button>
      </form>
    </div>
  );
}

export default RegistroTrabajos;
