//Este si jala 

import React, { useState } from 'react';
import { Button, Input, Form, TextArea, Segment, Header, Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useActividadStore,usePreguntaStore  } from '../stores/UsuarioStore';



const CrearPregunta = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState({
    texto: '',
    opciones: [],
    imagen: null,
    opcionCorrecta: null,
  });
  const [editandoIndice, setEditandoIndice] = useState(null);
  const [opcionActual, setOpcionActual] = useState('');
  const [contenido, setContenido] = useState('');
  const [multimedia, setMultimedia] = useState(null);
  const actividad = useActividadStore(state => state.actividad);
  const pregunta = usePreguntaStore(state => state.pregunta);


  const manejarTextoPregunta = (valor) => {
    setNuevaPregunta((pregunta) => ({ ...pregunta, texto: valor }));
  };

  const manejarOpcionChange = (index, valor) => {
    setNuevaPregunta((pregunta) => {
      const nuevasOpciones = [...pregunta.opciones];
      nuevasOpciones[index] = valor;
      return { ...pregunta, opciones: nuevasOpciones };
    });
  };

  const manejarImagenChange = (event) => {
    const imagen = event.target.files[0];
    setNuevaPregunta((pregunta) => ({ ...pregunta, imagen }));
  };

  const agregarPregunta = () => {
    if (editandoIndice !== null) {
      // Editar la pregunta existente
      const nuevasPreguntas = [...preguntas];
      nuevasPreguntas[editandoIndice] = nuevaPregunta;
      setPreguntas(nuevasPreguntas);
      setEditandoIndice(null);
    } else {
      // Agregar nueva pregunta
      setPreguntas((preguntasAnteriores) => [...preguntasAnteriores, nuevaPregunta]);
    }
    // Limpiar el formulario
    setNuevaPregunta({ texto: '', opciones: [], imagen: null, opcionCorrecta: null });
  };

  const editarPregunta = (index) => {
    const preguntaEditando = preguntas[index];
    setNuevaPregunta({ ...preguntaEditando });
    setEditandoIndice(index);
  };

  const eliminarPregunta = (index) => {
    const preguntasActualizadas = [...preguntas];
    preguntasActualizadas.splice(index, 1);
    setPreguntas(preguntasActualizadas);
  };

  const agregarOpcion = () => {
    if (nuevaPregunta.opciones.length < 5) {
      setNuevaPregunta((pregunta) => ({ ...pregunta, opciones: [...pregunta.opciones, opcionActual] }));
      setOpcionActual('');
    }
  };

  const eliminarOpcion = (index) => {
    const nuevasOpciones = [...nuevaPregunta.opciones];
    nuevasOpciones.splice(index, 1);
    setNuevaPregunta((pregunta) => ({ ...pregunta, opciones: nuevasOpciones }));
  };

  const manejarCheckboxChange = (index) => {
    setNuevaPregunta((pregunta) => ({ ...pregunta, opcionCorrecta: index }));
  };

  const handleCrearPregunta = async (pregunta) => {
    try {
      const formData = new FormData();
      formData.append('pregunta', pregunta.texto);
      formData.append('multimedia', pregunta.imagen);
  
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/preguntacues/${actividad.id}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const preguntaData = await response.json();
        console.log('Pregunta creada con éxito:', preguntaData);
  
        return preguntaData.id; // Devolver el ID de la pregunta creada
      } else {
        console.error('Fallo al crear la pregunta:', response.statusText);
        throw new Error('Error al crear la pregunta');
      }
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      throw error;
    }
  };

  const handleCrearOpcion = async (opcion, ) => {
    try {
    const formData = new FormData();
    formData.append('textOpcion', opcion.texto || ''); // Asignar cadena vacía si es undefined
    formData.append('correcta', opcion.correcta || false); // Asignar falso si es undefined
    formData.append('multimedia', opcion.multimedia || null); // Asignar null si es undefined

    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/opcioncues/${pregunta.id}`, {
      method: 'POST',
      body: formData,
    });
  
      if (response.ok) {
        const opcionData = await response.json();
        console.log('Opción agregada con éxito:', opcionData);
      } else {
        console.error('Fallo al agregar la opción:', response.statusText);
        throw new Error('Error al agregar la opción');
      }
    } catch (error) {
      console.error('Error al agregar la opción:', error);
      throw error;
    }
  };

  const handleCrearCuestionario = async () => {
    try {
      // Guardar cada pregunta en la base de datos
      for (let i = 0; i < preguntas.length; i++) {
        const preguntaId = await handleCrearPregunta(preguntas[i]);
  
        // Guardar opciones asociadas a la pregunta actual
        for (let j = 0; j < preguntas[i].opciones.length; j++) {
          await handleCrearOpcion(preguntas[i].opciones[j], preguntaId);
        }
      }
  
      // Lógica adicional después de crear todas las preguntas, si es necesario
    } catch (error) {
      console.error('Error al crear el cuestionario:', error);
    }
  };

  return (
    <Segment>
      <Header as="h2">Cuestionario-Examen</Header>
      {preguntas.map((pregunta, index) => (
        <Segment key={index}>
          <Header as="h3">Pregunta {index + 1}</Header>
          <p>{pregunta.texto}</p>
          {pregunta.imagen && <img src={URL.createObjectURL(pregunta.imagen)} alt={`Imagen para Pregunta ${index + 1}`} />}
          {pregunta.opciones.map((opcion, opcionIndex) => (
            <p key={opcionIndex}>
              <Checkbox
                label={`Opción ${opcionIndex + 1}`}
                checked={pregunta.opcionCorrecta === opcionIndex}
                onChange={() => manejarCheckboxChange(opcionIndex)}
              />
              {opcion}
              <Button color="red" onClick={() => eliminarOpcion(opcionIndex)}>
                Eliminar
              </Button>
            </p>
          ))}
          <Button color="blue" onClick={() => editarPregunta(index)}>
            Editar Pregunta
          </Button>
          <Button color="red" onClick={() => eliminarPregunta(index)}>
            Eliminar Pregunta
          </Button>
        </Segment>
      ))}
      <Form>
        <Form.Field
          control={TextArea}
          label="Pregunta"
          placeholder="Escribe la pregunta..."
          value={nuevaPregunta.texto}
          onChange={(e, { value }) => manejarTextoPregunta(value)}
        />
        <Form.Field>
          <label>Imagen</label>
          <Input type="file" onChange={manejarImagenChange} accept="image/*" />
          {nuevaPregunta.imagen && <img src={URL.createObjectURL(nuevaPregunta.imagen)} alt="Vista previa de la imagen" />}
        </Form.Field>
        <Form.Field>
          <label>Opciones</label>
          <Input
            placeholder="Escribe una opción..."
            value={opcionActual}
            onChange={(e, { value }) => setOpcionActual(value)}
          />
          <Button color="green" onClick={agregarOpcion}>
            Agregar Opción
          </Button>
        </Form.Field>
        <Header as="h4">Opciones</Header>
        {nuevaPregunta.opciones.map((opcion, index) => (
          <Form.Field key={index} control={Input} label={`Opción ${index + 1}`} value={opcion} disabled />
        ))}
        <Button color="green" onClick={agregarPregunta}>
          {editandoIndice !== null ? 'Guardar Cambios' : 'Agregar Pregunta'}
        </Button>
      </Form>
      <Button color="teal" onClick={handleCrearCuestionario}>
        Crear Cuestionario
      </Button>
    </Segment>
  );
};

export default CrearPregunta;