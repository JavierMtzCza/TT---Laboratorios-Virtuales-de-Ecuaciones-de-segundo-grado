// Opcion.js
import React from 'react';

const Opcion = ({ preguntaIndex, opcionIndex, opcion, eliminarOpcion, manejarSeleccionCorrecta }) => {
  return (
    <div>
      {/* Interfaz de usuario para mostrar la opción */}
      <p>{opcion.texto}</p>
      {opcion.imagen && <img src={URL.createObjectURL(opcion.imagen)} alt={`Imagen para Opción ${opcionIndex + 1}`} />}
      <input
        type="checkbox"
        checked={opcion.correcta}
        onChange={manejarSeleccionCorrecta}
      />
      <label>Correcta</label>
      <button onClick={eliminarOpcion}>Eliminar Opción</button>
    </div>
  );
};

export default Opcion;
