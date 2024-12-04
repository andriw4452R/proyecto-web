import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAlumno = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          border: '2px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#fff',
          width: '300px',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Bienvenido al Dashboard del Alumno
        </h2>
        <button
          onClick={() => navigate('/listado-trabajos')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Ver Listado de Trabajos
        </button>
        <button
          onClick={() => navigate('/registro-trabajos')}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Registrar Trabajo
        </button>
      </div>
    </div>
  );
};

export default DashboardAlumno;
