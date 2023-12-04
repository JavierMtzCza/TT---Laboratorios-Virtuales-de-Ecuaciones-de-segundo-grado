// src/components/CrearCuestionario.js
/*
import React, { useState } from 'react';

const CrearCuestionario = () => {
  const [actividadId, setActividadId] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [multimedia, setMultimedia] = useState(null);
  const [fechaLimite, setFechaLimite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('multimedia', multimedia);
      formData.append('pregunta', pregunta);
      formData.append('fechaLimite', fechaLimite);

      const response = await fetch(`http://localhost:3000/preguntacues/${actividadId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Pregunta de cuestionario creada con éxito');
        // Realizar cualquier acción necesaria después de la creación
      } else {
        console.error('Error al crear la pregunta de cuestionario');
        // Manejar errores
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Manejar errores
    }
  };

  return (
    // Renderizar el formulario y campos
  );
};

export default CrearCuestionario;

*/