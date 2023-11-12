import React, { useState } from 'react';
import { Form, Input, Container, Header, Segment, Icon, Image, Button, Select } from 'semantic-ui-react';
import '../estiloscss/estilocues.css';
const PA9Cuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState('');
  const [imagenActual, setImagenActual] = useState(null);
  const [opcionCorrecta, setOpcionCorrecta] = useState('');
  const [editandoPregunta, setEditandoPregunta] = useState(true); // Editar pregunta por defecto
  const [editandoIndex, setEditandoIndex] = useState(null); // Índice de la pregunta en edición
  const [editandoOpcionIndex, setEditandoOpcionIndex] = useState(null); // Índice de la opción en edición
  const [opcionesCorrectasPorPregunta, setOpcionesCorrectasPorPregunta] = useState([]);

  const options = [];

  for (let i = 0; i < 5; i++) {
    options.push({ key: i, text: `Opción ${i + 1}`, value: i });
  }

  const handlePreguntaChange = (e) => {
    setPreguntaActual(e.target.value);
  };

  const handleImagenChange = (e, indexPregunta, indexOpcion) => {
    const file = e.target.files[0];
    setImagenActual(file);

    const nuevasPreguntas = [...preguntas];

    if (indexOpcion !== undefined) {
      // Si se proporciona el índice de opción, estamos cambiando una imagen de opción.
      nuevasPreguntas[indexPregunta].opciones[indexOpcion].imagen = file;
    } else {
      // Si no se proporciona el índice de opción, estamos cambiando una imagen de pregunta.
      nuevasPreguntas[indexPregunta].imagen = file;
    }
    setPreguntas(nuevasPreguntas);
  };

  const handleNuevaPregunta = () => {
    const nuevaPregunta = {
      pregunta: preguntaActual,
      imagen: imagenActual,
      opciones: [],
      opcionCorrecta: opcionCorrecta,
    };

    setOpcionesCorrectasPorPregunta((prev) => [...prev, 0]);

    setPreguntas([...preguntas, nuevaPregunta]);
    setPreguntaActual('');
    setImagenActual(null);
    setOpcionCorrecta('');
  };

  const eliminarPregunta = (index) => {
    const nuevasPreguntas = [...preguntas];
    const nuevasOpcionesCorrectas = [...opcionesCorrectasPorPregunta];
    nuevasPreguntas.splice(index, 1);
    nuevasOpcionesCorrectas.splice(index, 1);
    setPreguntas(nuevasPreguntas);
    setOpcionesCorrectasPorPregunta(nuevasOpcionesCorrectas);
  };

  const agregarOpcion = (indexPregunta) => {
    const pregunta = preguntas[indexPregunta];

    if (pregunta.opciones.length < 5) {
      const nuevasOpciones = [...pregunta.opciones, { respuesta: '', imagen: null }];
      const nuevasPreguntas = [...preguntas];
      nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;

      setOpcionesCorrectasPorPregunta((prev) => {
        const nuevasOpcionesCorrectas = [...prev];
        nuevasOpcionesCorrectas[indexPregunta] = (prev[indexPregunta] || 0) + 1;
        return nuevasOpcionesCorrectas;
      });

      setPreguntas(nuevasPreguntas);
    }
  };

  const eliminarOpcion = (indexPregunta, indexOpcion) => {
    const pregunta = preguntas[indexPregunta];
    const nuevasOpciones = [...pregunta.opciones];
    nuevasOpciones.splice(indexOpcion, 1);
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;

    setOpcionesCorrectasPorPregunta((prev) => {
      const nuevasOpcionesCorrectas = [...prev];
      nuevasOpcionesCorrectas[indexPregunta] = Math.max((prev[indexPregunta] || 0) - 1, 0);
      return nuevasOpcionesCorrectas;
    });

    setPreguntas(nuevasPreguntas);
  };

  const evaluarRespuestas = () => {
    // Agregar lógica para evaluar respuestas aquí si es necesario.
  };

  const activarModoEdicion = (index, editandoPregunta, opcionIndex) => {
    setEditandoPregunta(editandoPregunta);
    setEditandoIndex(index);

    if (opcionIndex !== undefined) {
      setEditandoOpcionIndex(opcionIndex);
    } else {
      setEditandoOpcionIndex(null); // Restablece el índice de la opción en edición
    }
  };

  const guardarEdicion = () => {
    // Aquí puedes guardar la edición de la pregunta u opción en el estado.
    setEditandoPregunta(false);
    setEditandoIndex(null);
    setEditandoOpcionIndex(null);
  };

  const cancelarEdicion = () => {
    setEditandoPregunta(false);
    setEditandoIndex(null);
    setEditandoOpcionIndex(null);
  };

  return (
    <Container text className="container-background">
      <Header as="h1">Cuestionario</Header>
      <Icon name="check" size="large" color="blue" onClick={evaluarRespuestas} />
      {preguntas.map((pregunta, index) => (
        <Segment key={index} style={{ color: "black" }} >
          <Form>
            <Form.Field>
              <label className="pregunta-label">Pregunta {index + 1}</label>
              {editandoIndex === index && editandoPregunta ? (
                <div>
                  <Input
                    className="edit-input"
                    placeholder="Edita la pregunta"
                    value={pregunta.pregunta}
                    onChange={(e) => {
                      const nuevasPreguntas = [...preguntas];
                      nuevasPreguntas[index].pregunta = e.target.value;
                      setPreguntas(nuevasPreguntas);
                    }}
                  />
                  <Input
                    type="file"
                    onChange={(e) => handleImagenChange(e, index)}
                  />
                  <Button primary onClick={guardarEdicion}>Guardar</Button>
                  <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
                </div>
              ) : (
                <div>
                  <p>{pregunta.pregunta}</p>
                  {pregunta.imagen && (
                    <div className="image-container">
                      <Image src={URL.createObjectURL(pregunta.imagen)} size="medium" />
                      <Button
                        negative
                        onClick={() => handleImagenChange({ target: { files: [] } }, index)}
                      >
                        Eliminar Imagen
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <Icon
                name="trash"
                size="large"
                color="red"
                onClick={() => eliminarPregunta(index)}
              />
              <Icon
                name="edit"
                size="large"
                color="blue"
                onClick={() => activarModoEdicion(index, true)}
              />
              <Icon
                name="calendar plus outline"
                size="large"
                color="green"
                onClick={() => agregarOpcion(index)}
              />
              <Select
                placeholder={`Elige la opción correcta (hasta ${opcionesCorrectasPorPregunta[index]})`}
                options={options.slice(0, opcionesCorrectasPorPregunta[index])}
                value={pregunta.opcionCorrecta}
                onChange={(e, { value }) => {
                  const nuevasPreguntas = [...preguntas];
                  nuevasPreguntas[index].opcionCorrecta = value;
                  setPreguntas(nuevasPreguntas);
                }}
              />
              {pregunta.opciones.map((opcion, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
                  <span style={{ marginRight: "30px" }}>{i + 1}. </span>
                  {editandoIndex === index && !editandoPregunta && editandoOpcionIndex === i ? (
                    <div style={{ flex: 1, marginRight: "10px" }}>
                      <Input
                        className="edit-input"
                        placeholder="Edita la opción"
                        value={opcion.respuesta}
                        onChange={(e) => {
                          const nuevasPreguntas = [...preguntas];
                          nuevasPreguntas[index].opciones[i].respuesta = e.target.value;
                          setPreguntas(nuevasPreguntas);
                        }}
                      />
                      <Input
                        type="file"
                        onChange={(e) => handleImagenChange(e, index, i)}
                      />
                      <Button primary onClick={guardarEdicion}>Guardar</Button>
                      <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
                    </div>
                  ) : (
                    

                        <div style={{ flex: 1, marginRight: "20px" }}>
                        <p>{opcion.respuesta}</p>

                                <Input
                            className="opcion-input"
                            placeholder={`Opción ${i + 1}`}
                            value={opcion.respuesta}
                            onChange={(e) => {
                                const nuevasOpciones = [...preguntas[index].opciones];
                                nuevasOpciones[i].respuesta = e.target.value;
                                const nuevasPreguntas = [...preguntas];
                                nuevasPreguntas[index].opciones = nuevasOpciones;
                                setPreguntas(nuevasPreguntas);
                            }}
                            />
                                <Input
                                type="file"
                                onChange={(e) => {
                                const nuevasOpciones = [...preguntas[index].opciones];
                                nuevasOpciones[i].imagen = e.target.files[0];
                                const nuevasPreguntas = [...preguntas];
                                nuevasPreguntas[index].opciones = nuevasOpciones;
                                setPreguntas(nuevasPreguntas);
                                }}
                            />

                        {opcion.imagen && (
                            <div className="image-container">
                            <Image src={URL.createObjectURL(opcion.imagen)} size="medium" />
                            <Button
                                negative
                                onClick={() => handleImagenChange({ target: { files: [] } }, index, i)}
                            >
                                Eliminar Imagen
                            </Button>
                            </div>
                        )}
                        </div>
                  )}
                  <div>
                    
                    <Icon
                      name="trash alternate outline"
                      size="large"
                      color="grey"
                      onClick={() => eliminarOpcion(index, i)}
                    />
                    <Icon
                      name="edit outline"
                      size="large"
                      color="blue"
                      onClick={() => activarModoEdicion(index, false, i)}
                    />
                  </div>
                </div>
              ))}
            </Form.Field>
          </Form>
        </Segment>
      ))}
      <Form>
        <Form.Field>
          <label className="nueva-pregunta-label">Nueva Pregunta</label>
          <Input
            className="nueva-pregunta-input"
            placeholder="Escribe tu pregunta aquí"
            value={preguntaActual}
            onChange={handlePreguntaChange}
          />
          <Input
            type="file"
            onChange={(e) => handleImagenChange(e, null)}
          />
          {imagenActual && (
            <div className="image-container">
              <Image src={URL.createObjectURL(imagenActual)} size="medium" />
            </div>
          )}
          <Button primary onClick={handleNuevaPregunta}>
            <Icon name="pencil alternate" /> Nueva Pregunta
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
};

export default PA9Cuestionario;