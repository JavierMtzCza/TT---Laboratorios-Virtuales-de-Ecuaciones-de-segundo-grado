import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Segment,
  Form,
  Input,
  Icon,
  Image,
} from "semantic-ui-react";

const ExamenAlumno = ({ preguntas, idCuestionario }) => {
  const [respuestas, setRespuestas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  useEffect(() => {
    // Obtener el tiempo del cuestionario
    const getTiempoCuestionario = async () => {
      const res = await fetch(`/api/cuestionarios/${idCuestionario}`);
      const data = await res.json();
      setTiempoRestante(data.tiempo_cuestionario);
    };
    getTiempoCuestionario();

    // Actualizar el tiempo restante cada segundo
    const interval = setInterval(() => {
      setTiempoRestante(tiempoRestante - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [idCuestionario]);

  const evaluarRespuestas = () => {
    // Evaluar las respuestas del cuestionario
    // ...
  };

  return (
    <Container text className="container-background">
      <Header as="h1">Cuestionario</Header>
      <Segment key={0} style={{ color: "black" }} >
        <Form>
          <Form.Field>
            <label className="pregunta-label">Pregunta 1</label>
            <p>¿Cuál es la capital de España?</p>
            <Input
              type="radio"
              name="pregunta-1"
              value="Madrid"
              checked={respuestas[0] === "Madrid"}
              onChange={(e) => {
                setRespuestas([...respuestas, e.target.value]);
              }}
            />
            <label htmlFor="pregunta-1">Madrid</label>
            <Input
              type="radio"
              name="pregunta-1"
              value="Barcelona"
              checked={respuestas[0] === "Barcelona"}
              onChange={(e) => {
                setRespuestas([...respuestas, e.target.value]);
              }}
            />
            <label htmlFor="pregunta-1">Valencia</label>
          </Form.Field>
          </Form>
        </Segment>
      </Container>
    
  );
};

export default ExamenAlumno;