import { useActividadStore } from '../stores/UsuarioStore';
import { useState } from 'react';
import PA8Pruebas from './PA7-Ejercicio';

const PA14ContestarActividad = () => {
  const actividad = useActividadStore((state) => s tate.actividad);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const preguntas = actividad.PreguntaCuestionario; // Ajusta el nombre según la estructura real de tu cuestionario
  const [respuestas, setRespuestas] = useState({});

  const handleRespuestasUsuario = (opcionId, respuestaSeleccionada) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [opcionId]: respuestaSeleccionada,
    }));
  };

  return (
    <>
      {preguntas && preguntas.length > 0 && preguntaActual < preguntas.length && (
        <PA8Pruebas
          multimedia={preguntas[preguntaActual].multimedia ? `data:${preguntas[preguntaActual].multimedia.type};base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(preguntas[preguntaActual].multimedia.data)))}` : ''}
          preguntaActual={preguntaActual}
          pregunta={preguntas[preguntaActual].pregunta}
          opciones={preguntas[preguntaActual].opciones}
          respuestasUsuario={respuestas}
          handleRespuestasUsuario={(respuestaSeleccionada) => handleRespuestasUsuario(preguntas[preguntaActual].opciones[opcionIndex].id, respuestaSeleccionada)}
          totalPreguntas={preguntas.length}
          avanzarActividad={() => {
            setRespuestas({}); // Limpiar las respuestas para la siguiente pregunta
            setPreguntaActual(preguntaActual + 1);
          }}
        />
      )}
    </>
  );
};

export default PA14ContestarActividad;
