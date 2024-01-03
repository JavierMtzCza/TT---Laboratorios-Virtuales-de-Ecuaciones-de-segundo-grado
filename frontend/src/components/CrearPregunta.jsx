// PreguntaForm.js
import React, { useState } from 'react';

const CrearPregunta = ({ pregunta, multimedia, onChange, onSubmit }) => {
  const [imagen, setImagen] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  return (
    <div>
      <h3>Agregar Pregunta</h3>
      <input type="text" placeholder="Pregunta" value={pregunta} onChange={(e) => onChange({ pregunta: e.target.value, multimedia })} />
      <input type="file" accept="image/*" onChange={handleImagenChange} />
      {/* Agregar lógica para manejar multimedia y cargar la imagen al backend */}
      <button onClick={() => onSubmit(imagen)}>Agregar Pregunta</button>
    </div>
  );
};

export default CrearPregunta;
