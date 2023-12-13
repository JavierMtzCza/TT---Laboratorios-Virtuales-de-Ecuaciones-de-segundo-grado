import { useActividadStore } from '../stores/UsuarioStore';
import { Button } from 'semantic-ui-react';
import { useState } from 'react';
import PA8Pruebas from './PA7-Ejercicio';

const PA14ContestarActividad = () => {

  // Estado global del ejercicio
  const actividad = useActividadStore(state => state.actividad)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const preguntas = actividad.PreguntaEjercicio

  
  return (
    <>
      <PA8Pruebas
        claveVideo={preguntas[preguntaActual].ClaveVideo == null ? '' : preguntas[preguntaActual].ClaveVideo}
        multimedia={preguntas[preguntaActual].multimedia == null ? '' : `data:${preguntas[preguntaActual].multimedia.type};base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(preguntas[preguntaActual].multimedia.data)))}`}
        pregunta={preguntas[preguntaActual].pregunta}
        consejo={preguntas[preguntaActual].consejo == null ? '' : preguntas[preguntaActual].consejo}
        tipo={preguntas[preguntaActual].OpcionEjercicio[0].r1 == 0 && preguntas[preguntaActual].OpcionEjercicio[0].r2 == 0 ? true : false}
        respuestas={{
          a: preguntas[preguntaActual].OpcionEjercicio[0].a,
          b: preguntas[preguntaActual].OpcionEjercicio[0].b,
          c: preguntas[preguntaActual].OpcionEjercicio[0].c,
          r1: preguntas[preguntaActual].OpcionEjercicio[0].r1,
          r2: preguntas[preguntaActual].OpcionEjercicio[0].r2
        }}
        setPreguntaActual={setPreguntaActual}
        preguntaActual={preguntaActual}
        long={preguntas.length - 1}
      />
      <Button onClick={() => console.log(preguntas[preguntaActual])}></Button>
    </>
  )
}

export default PA14ContestarActividad