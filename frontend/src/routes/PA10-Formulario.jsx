import React, { useState } from 'react';

const RealizarCuestionario = ({ preguntas }) => {
  const [respuestas, setRespuestas] = useState(new Array(preguntas.length).fill(null));
  const [calificacion, setCalificacion] = useState(null);

  const seleccionarRespuesta = (indicePregunta, indiceOpcion) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indicePregunta] = indiceOpcion;
    setRespuestas(nuevasRespuestas);
  };

  const calcularCalificacion = () => {
    const totalPreguntas = preguntas.length;
    let respuestasCorrectas = 0;

    for (let i = 0; i < totalPreguntas; i++) {
      if (respuestas[i] === preguntas[i].opcionCorrecta) {
        respuestasCorrectas++;
      }
    }

    const porcentajeCalificacion = (respuestasCorrectas / totalPreguntas) * 100;
    setCalificacion(porcentajeCalificacion);
  };

  return (
    <div>
      <h1>Realizar Cuestionario</h1>

      {preguntas.map((pregunta, indice) => (
        <div key={indice}>
          <h3>Pregunta {indice + 1}</h3>
          <p>{pregunta.texto}</p>

          <ul>
            {pregunta.opciones.map((opcion, indiceOpcion) => (
              <li key={indiceOpcion}>
                <label>
                  <input
                    type="radio"
                    name={`pregunta${indice}`}
                    value={indiceOpcion}
                    onChange={() => seleccionarRespuesta(indice, indiceOpcion)}
                    checked={respuestas[indice] === indiceOpcion}
                  />
                  {opcion}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={calcularCalificacion}>Calcular Calificación</button>

      {calificacion !== null && (
        <div>
          <h2>Calificación: {calificacion}%</h2>
        </div>
      )}
    </div>
  );
};

export default RealizarCuestionario;