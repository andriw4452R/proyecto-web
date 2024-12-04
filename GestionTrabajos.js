import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GestionTrabajos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const trabajosRegistrados = JSON.parse(localStorage.getItem('trabajos')) || [];
    setTrabajos(trabajosRegistrados);
  }, []);

  const handleUpdate = (index, campo, valor) => {
    const trabajosActualizados = [...trabajos];
    trabajosActualizados[index][campo] = valor;
    setTrabajos(trabajosActualizados);
    localStorage.setItem('trabajos', JSON.stringify(trabajosActualizados));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f7f9fc',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <h2 style={{ color: '#333' }}>Gestión de Trabajos</h2>
      {trabajos.map((trabajo, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '10px 0',
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p>
            <strong>Título:</strong> {trabajo.titulo}
          </p>
          <p>
            <strong>Autor:</strong> {trabajo.autor}
          </p>
          <p>
            <strong>Fecha:</strong> {trabajo.fecha}
          </p>
          <p>
            <strong>Descripción:</strong> {trabajo.descripcion}
          </p>
          <p>
            <strong>Estado:</strong> {trabajo.estado || 'pendiente'}
          </p>
          {trabajo.archivo && (
            <p>
              <strong>Archivo:</strong>{' '}
              <a
                href={trabajo.archivo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            </p>
          )}
          <label>
            <strong>Observaciones:</strong>
          </label>
          <input
            type="text"
            placeholder="Agregar observaciones"
            value={trabajo.observaciones || ''}
            onChange={(e) => handleUpdate(index, 'observaciones', e.target.value)}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
          <label>
            <strong>Cambiar Estado:</strong>
          </label>
          <select
            value={trabajo.estado || 'pendiente'}
            onChange={(e) => handleUpdate(index, 'estado', e.target.value)}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          >
            <option value="pendiente">Pendiente</option>
            <option value="aceptado">Aceptado</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>
      ))}
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          backgroundColor: '#FF4136',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default GestionTrabajos;
