// OpcionForm.js
import React, { useState } from 'react';

const CrearOpcion = ({ textOpcion, multimedia, correcta, onChange, onSubmit }) => {
  const [imagen, setImagen] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  return (
    <div>
      <h3>Agregar Opción</h3>
      <input type="text" placeholder="Opción" value={textOpcion} onChange={(e) => onChange({ textOpcion: e.target.value, multimedia, correcta })} />
      <input type="file" accept="image/*" onChange={handleImagenChange} />
      {/* Agregar lógica para manejar multimedia y cargar la imagen al backend */}
      <button onClick={() => onSubmit(imagen)}>Agregar Opción</button>
    </div>
  );
};

export default CrearOpcion;
