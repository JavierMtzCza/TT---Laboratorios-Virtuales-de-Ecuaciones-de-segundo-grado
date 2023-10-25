import React, { useState } from 'react';
import { Container, Header, Form, Button, Grid, Radio } from 'semantic-ui-react';

const TuComponente = () => {
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const opciones = [
    'Opción 1',
    'Opción 2',
    'Opción 3',
    'Opción 4',
    'Opción 5',
  ];

  const handleNombreChange = (e) => {
    setNombreAlumno(e.target.value);
  };

  const handleRespuestaChange = (e, { value }) => {
    setRespuestaSeleccionada(value);
  };

  const evaluarRespuesta = () => {
    if (respuestaSeleccionada !== null) {
      // Aquí puedes agregar lógica para evaluar la respuesta seleccionada.
      console.log('Respuesta seleccionada:', opciones[respuestaSeleccionada]);
    }
  };

  return (
    <Container text>
      <Header as="h1">Cuestionario</Header>
      <Form>
        <Form.Field>
          <label>Nombre del Alumno</label>
          <input
            placeholder="Escribe tu nombre"
            value={nombreAlumno}
            onChange={handleNombreChange}
          />
        </Form.Field>
        <Header as="h2">Pregunta</Header>
        <p>Aquí iría la pregunta</p>
        <Header as="h3">Opciones</Header>
        {opciones.map((opcion, index) => (
          <Form.Field key={index}>
            <Radio
              label={opcion}
              value={index}
              checked={respuestaSeleccionada === index}
              onChange={handleRespuestaChange}
            />
          </Form.Field>
        ))}
        <Button primary onClick={evaluarRespuesta}>
          Evaluar
        </Button>
      </Form>
    </Container>
  );
};

export default TuComponente;
