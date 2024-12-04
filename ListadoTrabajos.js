import React, { useEffect, useState } from 'react';

const ListadoTrabajos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [trabajoEditado, setTrabajoEditado] = useState(null);

  // Cargar trabajos del localStorage al inicio
  useEffect(() => {
    const trabajosRegistrados = JSON.parse(localStorage.getItem('trabajos')) || [];
    setTrabajos(trabajosRegistrados);
  }, []);

  // Función para eliminar un trabajo
  const eliminarTrabajo = (index) => {
    const nuevosTrabajos = trabajos.filter((_, i) => i !== index);
    setTrabajos(nuevosTrabajos);
    localStorage.setItem('trabajos', JSON.stringify(nuevosTrabajos));
  };

  // Función para habilitar el modo de edición
  const habilitarEdicion = (index) => {
    setModoEdicion(true);
    setTrabajoEditado({ ...trabajos[index], index });
  };

  // Función para guardar los cambios en el trabajo editado
  const guardarEdicion = (e) => {
    e.preventDefault();
    const { index, ...trabajoActualizado } = trabajoEditado;
    const nuevosTrabajos = [...trabajos];
    nuevosTrabajos[index] = trabajoActualizado;
    setTrabajos(nuevosTrabajos);
    localStorage.setItem('trabajos', JSON.stringify(nuevosTrabajos));
    setModoEdicion(false);
    setTrabajoEditado(null);
  };

  return (
    <div>
      <h2>Listado de Trabajos</h2>
      {modoEdicion ? (
        <div>
          <h3>Editar Trabajo</h3>
          <form onSubmit={guardarEdicion}>
            <label>Título:</label>
            <input
              type="text"
              value={trabajoEditado.titulo}
              onChange={(e) =>
                setTrabajoEditado({ ...trabajoEditado, titulo: e.target.value })
              }
              required
            />
            <label>Autor:</label>
            <input
              type="text"
              value={trabajoEditado.autor}
              onChange={(e) =>
                setTrabajoEditado({ ...trabajoEditado, autor: e.target.value })
              }
              required
            />
            <label>Fecha:</label>
            <input
              type="date"
              value={trabajoEditado.fecha}
              onChange={(e) =>
                setTrabajoEditado({ ...trabajoEditado, fecha: e.target.value })
              }
              required
            />
            <label>Descripción:</label>
            <textarea
              value={trabajoEditado.descripcion}
              onChange={(e) =>
                setTrabajoEditado({ ...trabajoEditado, descripcion: e.target.value })
              }
              required
            />
            <label>Archivo:</label>
            <input
              type="text"
              value={trabajoEditado.archivo || ""}
              onChange={(e) =>
                setTrabajoEditado({ ...trabajoEditado, archivo: e.target.value })
              }
              placeholder="Nombre del archivo"
              disabled
            />
            <button type="submit">Guardar Cambios</button>
            <button onClick={() => setModoEdicion(false)}>Cancelar</button>
          </form>
        </div>
      ) : (
        <div>
          {trabajos.map((trabajo, index) => (
            <div key={index}>
              <p>Título: {trabajo.titulo}</p>
              <p>Autor: {trabajo.autor}</p>
              <p>Fecha: {trabajo.fecha}</p>
              <p>Descripción: {trabajo.descripcion}</p>
              <p>Estado: {trabajo.estado}</p>
              <p>Observaciones: {trabajo.observaciones}</p>
              {trabajo.archivo && (
                <p>
                  Archivo:{" "}
                  <a
                    href={trabajo.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar
                  </a>
                </p>
              )}
              <button onClick={() => eliminarTrabajo(index)}>Eliminar</button>
              <button onClick={() => habilitarEdicion(index)}>Editar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListadoTrabajos;
