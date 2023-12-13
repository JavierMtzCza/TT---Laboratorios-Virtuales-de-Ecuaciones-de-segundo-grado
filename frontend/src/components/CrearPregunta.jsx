// Pregunta.js
import React, { useState } from 'react';
import Opcion from './CrearOpcion';

const Pregunta = ({ index, pregunta, setPreguntas, eliminarPregunta, handleCrearOpcion }) => {
  const [nuevaOpcion, setNuevaOpcion] = useState({ texto: '', imagen: null, correcta: false });

  const agregarOpcion = async () => {
    try {
      // Llamada a la función para crear la opción y relacionarla con la pregunta
      const opcionCreada = await handleCrearOpcion(nuevaOpcion, pregunta.id);

      // Actualizar el estado con la nueva opción
      const nuevasPreguntas = [...preguntas];
      nuevasPreguntas[index].opciones.push(opcionCreada);
      setPreguntas(nuevasPreguntas);

      // Limpiar el formulario de la nueva opción
      setNuevaOpcion({ texto: '', imagen: null, correcta: false });
    } catch (error) {
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      console.error('Error al agregar opción:', error.message);
    }
  };

  const eliminarOpcion = async (opcionIndex) => {
    try {
      const opcionId = pregunta.opciones[opcionIndex].id; // Ajusta según la estructura de tu opción
      // Lógica para eliminar opción de la base de datos
      const response = await fetch(`URL_DEL_BACKEND/opciones/${opcionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la opción');
      }

      // Actualizar el estado sin la opción eliminada
      const nuevasPreguntas = [...preguntas];
      nuevasPreguntas[index].opciones.splice(opcionIndex, 1);
      setPreguntas(nuevasPreguntas);
    } catch (error) {
      console.error('Error al eliminar opción:', error.message);
    }
  };

  const manejarTextoNuevaOpcion = (valor) => {
    setNuevaOpcion((opcion) => ({ ...opcion, texto: valor }));
  };

  const manejarImagenNuevaOpcion = (event) => {
    const imagen = event.target.files[0];
    setNuevaOpcion((opcion) => ({ ...opcion, imagen }));
  };

  const manejarSeleccionCorrecta = (opcionIndex) => {
    // Lógica para marcar la opción como correcta
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].opciones.forEach((opcion, i) => {
      opcion.correcta = i === opcionIndex;
    });
    setPreguntas(nuevasPreguntas);
  };

  // ... Otras funciones relacionadas con la pregunta

  return (
    <div>
      {/* Interfaz de usuario para mostrar la pregunta y opciones */}
      {pregunta.opciones.map((opcion, opcionIndex) => (
        <Opcion
          key={opcionIndex}
          preguntaIndex={index}
          opcionIndex={opcionIndex}
          opcion={opcion}
          eliminarOpcion={() => eliminarOpcion(opcionIndex)}
          manejarSeleccionCorrecta={() => manejarSeleccionCorrecta(opcionIndex)}
          // ... Pasa otras propiedades y funciones necesarias
        />
      ))}
      <div>
        <label>Texto Nueva Opción</label>
        <input type="text" value={nuevaOpcion.texto} onChange={(e) => manejarTextoNuevaOpcion(e.target.value)} />
      </div>
      <div>
        <label>Imagen Nueva Opción</label>
        <input type="file" onChange={manejarImagenNuevaOpcion} accept="image/*" />
      </div>
      <button onClick={agregarOpcion}>Agregar Nueva Opción</button>
      <button onClick={eliminarPregunta}>Eliminar Pregunta</button>
    </div>
  );
};

export default Pregunta;
