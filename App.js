// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardAlumno from './components/DashboardAlumno';
import GestionTrabajos from './components/GestionTrabajos';
import Index from './components/Index';
import ListadoTrabajos from './components/ListadoTrabajos';
import RegistroTrabajos from './components/RegistroTrabajos';
import RegistroUsuario from './components/RegistroUsuario';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/dashboard-alumno" element={<DashboardAlumno />} />
        <Route path="/gestion-trabajos" element={<GestionTrabajos />} />
        <Route path="/listado-trabajos" element={<ListadoTrabajos />} />
        <Route path="/registro-trabajos" element={<RegistroTrabajos />} />
      </Routes>
    </Router>
  );
}

export default App;
