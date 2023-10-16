import React, { useState } from 'react';
import { Container, Header, Form, Button, Radio, Icon } from 'semantic-ui-react';
import '../estiloscss/estilocues.css';


const PA9Cuestionario = () => {
    const [preguntas, setPreguntas] = useState([]);

  const handleChangePregunta = (index, e) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].pregunta = e.target.value;
    setPreguntas(nuevasPreguntas);
  };

  const handleChangeOpcion = (indexPregunta, indexOpcion, e) => {
    const nuevasOpciones = [...preguntas[indexPregunta].opciones];
    nuevasOpciones[indexOpcion] = e.target.value;

    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;

    setPreguntas(nuevasPreguntas);
  };

  const handleChangeRespuesta = (indexPregunta, indexOpcion) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].respuestaCorrecta = indexOpcion;
    setPreguntas(nuevasPreguntas);
  };

  const agregarPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        pregunta: '',
        opciones: [''],
        respuestaCorrecta: null,
      },
    ]);
  };

  const agregarOpcion = (indexPregunta) => {
    const nuevasOpciones = [...preguntas[indexPregunta].opciones, ''];
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;
    setPreguntas(nuevasPreguntas);
  };

  const eliminarOpcion = (indexPregunta, indexOpcion) => {
    const nuevasOpciones = [...preguntas[indexPregunta].opciones];
    nuevasOpciones.splice(indexOpcion, 1);
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;
    setPreguntas(nuevasPreguntas);
  };

  const eliminarPregunta = (index) => {
    const nuevasPreguntas = preguntas.filter((_, i) => i !== index);
    setPreguntas(nuevasPreguntas);
  };

  const evaluarRespuestas = () => {
    let puntaje = 0;
    for (let i = 0; i < preguntas.length; i++) {
      if (
        preguntas[i].respuestaCorrecta !== null &&
        preguntas[i].opciones[preguntas[i].respuestaCorrecta] !== ''
      ) {
        puntaje++;
      }
    }
    alert(`Puntaje: ${puntaje}/${preguntas.length}`);
  };

  return (
    <Container text>
      <Header as="h1">Cuestionario</Header>
      {preguntas.map((pregunta, index) => (
        <Form key={index}>
          <Form.Input
            fluid
            label={`Pregunta ${index + 1}`}
            placeholder={`Pregunta ${index + 1}`}
            value={pregunta.pregunta}
            onChange={(e) => handleChangePregunta(index, e)}
          />
          {pregunta.opciones.map((opcion, i) => (
            <div key={i} className="form-group">
              <Form.Input
                fluid
                label={`Opción ${i + 1}`}
                placeholder={`Opción ${i + 1}`}
                value={opcion}
                onChange={(e) => handleChangeOpcion(index, i, e)}
              />
              <div className="radio-group">
                <Radio
                  label={`Respuesta ${i + 1}`}
                  name={`respuesta-${index}`}
                  checked={pregunta.respuestaCorrecta === i}
                  onChange={() => handleChangeRespuesta(index, i)}
                />
                {pregunta.opciones.length > 1 && ( // Muestra el ícono de eliminación si hay más de una opción
                  <Icon
                    className="delete-icon"
                    name="trash"
                    color="red"
                    onClick={() => eliminarOpcion(index, i)}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="button-group">
            <Button
              className="small-button" // Aplica la clase de estilo para los botones
              onClick={() => eliminarPregunta(index)}
            >
              Eliminar Pregunta
            </Button>
            <Button
              className="small-button" // Aplica la clase de estilo para los botones
              onClick={() => agregarOpcion(index)}
            >
              Agregar Opción
            </Button>
          </div>
        </Form>
      ))}
      <Button primary onClick={agregarPregunta}>
        Agregar Pregunta
      </Button>
      <Button primary onClick={evaluarRespuestas}>
        Evaluar
      </Button>
    </Container>
  );
}
    
    
export default  PA9Cuestionario;
