// components/RegistroUsuario.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [instrucciones, setInstrucciones] = useState({ mensaje: '', recomendacion: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar instrucciones desde el archivo XML
    fetch('/instrucciones.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        const mensaje = xmlDoc.getElementsByTagName("mensaje")[0].textContent;
        const recomendacion = xmlDoc.getElementsByTagName("recomendacion")[0].textContent;
        setInstrucciones({ mensaje, recomendacion });
      })
      .catch(error => console.error("Error cargando instrucciones.xml:", error));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
      alert('El usuario ya existe.');
      return;
    }
    users.push({ username, password, userType });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario registrado exitosamente.');
    navigate('/');
  };

  return (
    <div
      className="container centralizado"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
        padding: '20px',
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Registro de Usuario</h1>
      
      {/* Mostrar instrucciones desde el archivo XML */}
      <div
        className="instrucciones"
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <p style={{ margin: 0, color: '#555' }}>{instrucciones.mensaje}</p>
        <p style={{ margin: 0, color: '#777' }}>{instrucciones.recomendacion}</p>
      </div>

      <form
        onSubmit={handleRegister}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
        }}
      >
        <label style={{ marginBottom: '10px', color: '#333' }}>Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <label style={{ marginBottom: '10px', color: '#333' }}>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
            <input
              type="radio"
              name="userType"
              value="Alumno"
              onChange={() => setUserType('Alumno')}
              required
              style={{ marginRight: '5px' }}
            />
            Alumno
          </label>
          <label style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
            <input
              type="radio"
              name="userType"
              value="Maestro"
              onChange={() => setUserType('Maestro')}
              required
              style={{ marginRight: '5px' }}
            />
            Maestro
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
