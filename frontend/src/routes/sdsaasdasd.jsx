import React, { useState } from 'react';
import {
  Form,
  Input,Container,Header,Segment,Icon,Image,Button,Select} from 'semantic-ui-react';

const TuComponente = () => {
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

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagenActual(file);
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
    <Container text>
      <Header as="h1">Cuestionario</Header>
      <Icon name="check" size="large" color="blue" onClick={evaluarRespuestas} />
      {preguntas.map((pregunta, index) => (
        <Segment key={index}>
          <Form>
            <Form.Field>
              <label>Pregunta {index + 1}</label>
              {editandoIndex === index && editandoPregunta ? (
                <div>
                  <Input
                    placeholder="Edita la pregunta"
                    value={pregunta.pregunta}
                    onChange={(e) => {
                      const nuevasPreguntas = [...preguntas];
                      nuevasPreguntas[index].pregunta = e.target.value;
                      setPreguntas(nuevasPreguntas);
                    }}
                  />
                  <Button primary onClick={guardarEdicion}>Guardar</Button>
                  <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
                </div>
              ) : (
                <p>{pregunta.pregunta}</p>
              )}
              {pregunta.imagen && (
                <Image src={URL.createObjectURL(pregunta.imagen)} size="medium" />
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
                name="add"
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
                <div key={i}>
                  {editandoIndex === index && !editandoPregunta && editandoOpcionIndex === i ? (
                    <div>
                      <Input
                        placeholder="Edita la opción"
                        value={opcion.respuesta}
                        onChange={(e) => {
                          const nuevasPreguntas = [...preguntas];
                          nuevasPreguntas[index].opciones[i].respuesta = e.target.value;
                          setPreguntas(nuevasPreguntas);
                        }}
                      />
                      <Button primary onClick={guardarEdicion}>Guardar</Button>
                      <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
                    </div>
                  ) : (
                    <Input
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
                  )}
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
                    <Image src={URL.createObjectURL(opcion.imagen)} size="medium" />
                  )}
                  <Icon
                    name="trash"
                    size="large"
                    color="red"
                    onClick={() => eliminarOpcion(index, i)}
                  />
                  <Icon
                    name="edit"
                    size="large"
                    color="blue"
                    onClick={() => activarModoEdicion(index, false, i)}
                  />
                </div>
              ))}
              <Button primary onClick={() => activarModoEdicion(index, true)}>
                Editar Pregunta
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      ))}
      <Form>
        <Form.Field>
          <label>Nueva Pregunta</label>
          <Input
            placeholder="Escribe tu pregunta aquí"
            value={preguntaActual}
            onChange={handlePreguntaChange}
          />
          <Input
            type="file"
            onChange={handleImagenChange}
          />
          {imagenActual && (
            <Image src={URL.createObjectURL(imagenActual)} size="medium" />
          )}
          <Button primary onClick={handleNuevaPregunta}>
            <Icon name="plus" /> Nueva Pregunta
          </Button>
          <Select
            placeholder="Elige la opción correcta"
            options={options}
            value={opcionCorrecta}
            onChange={(e, { value }) => setOpcionCorrecta(value)}
          />
        </Form.Field>
      </Form>
    </Container>
  );
};

export default TuComponente;








import React, { useState } from 'react';
import {
  Form,
  Input,Container,Header,Segment,Icon,Image,Button,Select} from 'semantic-ui-react';

const TuComponente = () => {
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
    <Container text>
      <Header as="h1">Cuestionario</Header>
      <Icon name="check" size="large" color="blue" onClick={evaluarRespuestas} />
      {preguntas.map((pregunta, index) => (
        <Segment key={index}>
          <Form>
            <Form.Field>
              <label>Pregunta {index + 1}</label>
              {editandoIndex === index && editandoPregunta ? (
                <div>
                  <Input
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
                    <div>
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
                name="add"
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
                <div key={i}>
                  {editandoIndex === index && !editandoPregunta && editandoOpcionIndex === i ? (
                    <div>
                      <Input
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
                    <Input
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
                    
                  )}
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
                    <div>
                    <Image src={URL.createObjectURL(opcion.imagen)} size="medium" />
                    <Button
                      negative
                      onClick={() => handleImagenChange({ target: { files: [] } }, index, i)}
                    >
                      Eliminar Imagen
                    </Button>
                  </div>
                  
                  )}
                  <Icon
                    name="trash"
                    size="large"
                    color="red"
                    onClick={() => eliminarOpcion(index, i)}
                  />
                  <Icon
                    name="edit"
                    size="large"
                    color="blue"
                    onClick={() => activarModoEdicion(index, false, i)}
                  />
                </div>
              ))}
              <Button primary onClick={() => activarModoEdicion(index, true)}>
                Editar Pregunta
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      ))}
      <Form>
        <Form.Field>
          <label>Nueva Pregunta</label>
          <Input
            placeholder="Escribe tu pregunta aquí"
            value={preguntaActual}
            onChange={handlePreguntaChange}
          />
          <Input
            type="file"
            onChange={(e) => handleImagenChange(e, null)}
          />
          {imagenActual && (
            <Image src={URL.createObjectURL(imagenActual)} size="medium" />
          )}
          <Button primary onClick={handleNuevaPregunta}>
            <Icon name="plus" /> Nueva Pregunta
          </Button>
          <Select
            placeholder="Elige la opción correcta"
            options={options}
            value={opcionCorrecta}
            onChange={(e, { value }) => setOpcionCorrecta(value)}
          />
        </Form.Field>
      </Form>
    </Container>
  );
};

export default TuComponente;





















import React, { useState } from 'react';
import {Form,Input, Container, Header, Segment, Icon, Image, Button, Select} from 'semantic-ui-react';

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
    <Container text>
      <Header as="h1">Cuestionario</Header>
      <Icon name="check" size="large" color="blue" onClick={evaluarRespuestas} />
      {preguntas.map((pregunta, index) => (
        <Segment key={index}>
          <Form>
            <Form.Field>
              <label>Pregunta {index + 1}</label>
              {editandoIndex === index && editandoPregunta ? (
                <div>
                  <Input
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
                    <div>
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
                name="add"
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
                <div key={i}>
                  {editandoIndex === index && !editandoPregunta && editandoOpcionIndex === i ? (
                    <div>
                      <Input
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
                    <Input
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

                  )}
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
                    <div>
                      <Image src={URL.createObjectURL(opcion.imagen)} size="medium" />
                      <Button
                        negative
                        onClick={() => handleImagenChange({ target: { files: [] } }, index, i)}
                      >
                        Eliminar Imagen
                      </Button>
                    </div>

                  )}
                  <Icon
                    name="trash"
                    size="large"
                    color="red"
                    onClick={() => eliminarOpcion(index, i)}
                  />
                  <Icon
                    name="edit"
                    size="large"
                    color="blue"
                    onClick={() => activarModoEdicion(index, false, i)}
                  />
                </div>
              ))}
              <Button primary onClick={() => activarModoEdicion(index, true)}>
                Editar Pregunta
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      ))}
      <Form>
        <Form.Field>
          <label>Nueva Pregunta</label>
          <Input
            placeholder="Escribe tu pregunta aquí"
            value={preguntaActual}
            onChange={handlePreguntaChange}
          />
          <Input
            type="file"
            onChange={(e) => handleImagenChange(e, null)}
          />
          {imagenActual && (
            <Image src={URL.createObjectURL(imagenActual)} size="medium" />
          )}
          <Button primary onClick={handleNuevaPregunta}>
            <Icon name="plus" /> Nueva Pregunta
          </Button>
          <Select
            placeholder="Elige la opción correcta"
            options={options}
            value={opcionCorrecta}
            onChange={(e, { value }) => setOpcionCorrecta(value)}
          />
        </Form.Field>
      </Form>
    </Container>
  );
};

export default PA9Cuestionario;












































import React, { useState } from 'react';
import { Form, Input, Container, Header, Segment, Icon, Image, Button, Select } from 'semantic-ui-react';

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
    <Container text>
      <Header as="h1">Cuestionario</Header>
      <Icon name="check" size="large" color="blue" onClick={evaluarRespuestas} />
      {preguntas.map((pregunta, index) => (
        <Segment key={index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>{index + 1}. Pregunta: </p>
              {editandoIndex === index && editandoPregunta ? (
                <div>
                  <Input
                    placeholder="Edita la pregunta"
                    value={pregunta.pregunta}
                    onChange={(e) => {
                      const nuevasPreguntas = [...preguntas];
                      nuevasPreguntas[index].pregunta = e.target.value;
                      setPreguntas(nuevasPreguntas);
                    }}
                    size="big" // Tamaño grande
                  />
                  <Input
                    type="file"
                    onChange={(e) => handleImagenChange(e, index)}
                    size="big" // Tamaño grande
                  />
                  <Button primary size="big" onClick={guardarEdicion}>
                    Guardar
                  </Button>
                  <Button secondary size="big" onClick={cancelarEdicion}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <div>
                  <p>{pregunta.pregunta}</p>
                  {pregunta.imagen && (
                    <div>
                      <Image src={URL.createObjectURL(pregunta.imagen)} size="medium" // Tamaño mediano
                      />
                      <Button
                        negative
                        onClick={() => handleImagenChange({ target: { files: [] } }, index)}
                        size="big" // Tamaño grande
                      >
                        Eliminar Imagen
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <Icon
                name="trash"
                size="big" // Tamaño grande
                color="red"
                onClick={() => eliminarPregunta(index)}
              />
              <Icon
                name="edit"
                size="big" // Tamaño grande
                color="blue"
                onClick={() => activarModoEdicion(index, true)}
              />
              <Icon
                name="add"
                size="big" // Tamaño grande
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
            </div>
          </div>
          {pregunta.opciones.map((opcion, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p>{i + 1}. Opción: </p>
                {editandoIndex === index && !editandoPregunta && editandoOpcionIndex === i ? (
                  <div>
                    <Input
                      placeholder="Edita la opción"
                      value={opcion.respuesta}
                      onChange={(e) => {
                        const nuevasPreguntas = [...preguntas];
                        nuevasPreguntas[index].opciones[i].respuesta = e.target.value;
                        setPreguntas(nuevasPreguntas);
                      }}
                      size="big" // Tamaño grande
                    />
                    <Input
                      type="file"
                      onChange={(e) => handleImagenChange(e, index, i)}
                      size="big" // Tamaño grande
                    />
                    <Button primary size="big" onClick={guardarEdicion}>
                      Guardar
                    </Button>
                    <Button secondary size="big" onClick={cancelarEdicion}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Input
                    placeholder={`Opción ${i + 1}`}
                    value={opcion.respuesta}
                    onChange={(e) => {
                      const nuevasOpciones = [...preguntas[index].opciones];
                      nuevasOpciones[i].respuesta = e.target.value;
                      const nuevasPreguntas = [...preguntas];
                      nuevasPreguntas[index].opciones = nuevasOpciones;
                      setPreguntas(nuevasPreguntas);
                    }}
                    size="big" // Tamaño grande
                  />
                )}
              </div>
              <div>
                <Input
                  type="file"
                  onChange={(e) => {
                    const nuevasOpciones = [...preguntas[index].opciones];
                    nuevasOpciones[i].imagen = e.target.files[0];
                    const nuevasPreguntas = [...preguntas];
                    nuevasPreguntas[index].opciones = nuevasOpciones;
                    setPreguntas(nuevasPreguntas);
                  }}
                  size="big" // Tamaño grande
                />
                {opcion.imagen && (
                  <div>
                    <Image src={URL.createObjectURL(opcion.imagen)} size="medium" // Tamaño mediano
                    />
                    <Button
                      negative
                      onClick={() => handleImagenChange({ target: { files: [] } }, index, i)}
                      size="big" // Tamaño grande
                    >
                      Eliminar Imagen
                    </Button>
                  </div>
                }
                <Icon
                  name="trash"
                  size="big" // Tamaño grande
                  color="red"
                  onClick={() => eliminarOpcion(index, i)}
                />
                <Icon
                  name="edit"
                  size="big" // Tamaño grande
                  color="blue"
                  onClick={() => activarModoEdicion(index, false, i)}
                />
              </div>
            </div>
          ))}
          <Button primary size="big" onClick={() => activarModoEdicion(index, true)}>
            Editar Pregunta
          </Button>
        </Segment>
      ))}
      <Form>
        <Form.Field>
          <label>Nueva Pregunta</label>
          <Input
            placeholder="Escribe tu pregunta aquí"
            value={preguntaActual}
            onChange={handlePreguntaChange}
            size="big" // Tamaño grande
          />
          <Input
            type="file"
            onChange={(e) => handleImagenChange(e, null)}
            size="big" // Tamaño grande
          />
          {imagenActual && (
            <Image src={URL.createObjectURL(imagenActual)} size="medium" // Tamaño mediano
            />
          )}
          <Button primary size="big" onClick={handleNuevaPregunta}>
            <Icon name="plus" /> Nueva Pregunta
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
};

export default PA9Cuestionario;














































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

  const cambiarOpcion = (pregunta, opcion) => {
    // Cambia la respuesta del alumno
    setRespuestas([...respuestas, opcion]);

    // Si la opción ya estaba seleccionada, desmárcala
    if (respuestas[pregunta.id] === opcion) {
      respuestas[pregunta.id] = null;
    }
  };

  return (
    <Container text className="container-background">
      <Header as="h1">Cuestionario</Header>
      {preguntas.map((pregunta, index) => (
        <Segment key={index} style={{ color: "black" }} >
          <Form>
            <Form.Field>
              <label className="pregunta-label">Pregunta {index + 1}</label>
              <p>{pregunta.pregunta}</p>
              {pregunta.opciones.map((opcion, i) => (
                <Input
                  type="radio"
                  name={pregunta.id}
                  value={opcion.respuesta}
                  checked={respuestas[pregunta.id] === opcion.respuesta}
                  onChange={(e) => cambiarOpcion(pregunta, e.target.value)}
                />
                <label htmlFor={pregunta.id} style={{ float: "left" }}>
                  {opcion.respuesta}
                </label>
              ))}
            </Form.Field>
            </Form>
          </Segment>
        ))}
      <Button
        type="submit"
        color="blue"
        disabled={tiempoRestante === 0}
        onClick={evaluarRespuestas}
      >
        Evaluar examen
      </Button>
    </Container>
  );
};

export default ExamenAlumno;
