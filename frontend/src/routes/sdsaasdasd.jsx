import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useGrupoStore } from '../stores/UsuarioStore';

function TuComponente({ onCloseModal }) {
  const { grupo } = useGrupoStore();
  const idGrupo = grupo.id;

  const [modalOpen, setModalOpen] = useState(false);
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: '',
    descripcion: '',
    fechaLimite: '',
    tipo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/actividad/${idGrupo}/actividad`);
        await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idGrupo]);

  const handleInputChange = (e, { name, value }) => {
    setNuevaActividad((prevActividad) => ({ ...prevActividad, [name]: value }));
  };

  useEffect(() => {
    handleOpenModal();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    
    setModalOpen(false);
  };

  const handleCrearActividad = async () => {
    try {
      const response = await fetch(`http://localhost:3000/actividad/${idGrupo}/actividad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaActividad),
      });

      if (response.ok) {
        handleCloseModal();
      } else {
        console.error('Error al crear la actividad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  return (
    <div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Modal.Header>Crear Nueva Actividad</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Nombre"
              name="nombre"
              value={nuevaActividad.nombre}
              onChange={handleInputChange}
            />
            <Form.TextArea
              label="Descripción"
              name="descripcion"
              value={nuevaActividad.descripcion}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Fecha Límite"
              name="fechaLimite"
              type="date"
              value={nuevaActividad.fechaLimite}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Tipo"
              name="tipo"
              value={nuevaActividad.tipo}
              onChange={handleInputChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            content="Crear Actividad"
            labelPosition="right"
            icon="checkmark"
            onClick={handleCrearActividad}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default TuComponente;




// CrearPregunta.js
import React, { useState } from 'react';
import { Form, Button, Segment, Icon } from 'semantic-ui-react';
import { useActividadStore } from '../stores/UsuarioStore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CrearPregunta = ({ onCreateQuestion }) => {
  const [contenido, setContenido] = useState('');
  const [multimedia, setMultimedia] = useState(null);

  const { actividad } = useActividadStore();

  const formats = [
    'header', 'font', 'size',
     'script',
  ];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      
      [{ 'script': 'sub' }, { 'script': 'super' }], // Script para subíndice y superíndice
    ],
  };
  

  const handleCrearPregunta = async () => {
    try {
      const formData = new FormData();
      formData.append('pregunta', contenido);
      formData.append('multimedia', multimedia);

      const response = await fetch(`http://localhost:3000/preguntacues/${actividad.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const questionData = await response.json();
        onCreateQuestion(questionData);
        ('');
        setMultimedia(null)setContenido;
      } else {
        console.error('Fallo al crear la pregunta:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
    }
  };

  const handleMultimediaChange = (e) => {
    // Actualizar el estado de la multimedia al seleccionar un archivo
    setMultimedia(e.target.files[0]);
  };

  return (
    <Segment>
      <Form>
        <Form.Field
          control={ReactQuill}
          label="Contenido"
          placeholder="Escribe tu pregunta aquí"
          value={contenido}
          onChange={(value) => setContenido(value)}
          formats={formats}
          modules={modules}
        />

        <Form.Field>
          <label>Multimedia (imagen)</label>
          <input type="file" onChange={handleMultimediaChange} />
        </Form.Field>

        <Button primary onClick={handleCrearPregunta}>
          Crear Pregunta
        </Button>

        <Button icon labelPosition="right" onClick={() => onCreateQuestion({ pregunta: '', multimedia: null })}>
          Nueva Pregunta
          <Icon name="add" />
        </Button>
      </Form>
    </Segment>
  );
};

export default CrearPregunta;





import { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import CrearPregunta from '../components/CrearPregunta';

const MainComponent = () => {
  const [preguntas, setPreguntas] = useState([{ pregunta: '', multimedia: null }]);

  const handleCreateQuestion = (questionData) => {
    setPreguntas((prevPreguntas) => {
      if (questionData) {
        // Actualiza la última pregunta creada con la información recibida
        const updatedPreguntas = [...prevPreguntas];
        updatedPreguntas[prevPreguntas.length - 1] = questionData;
        return updatedPreguntas;
      } else {
        // Agrega una nueva pregunta
        return [...prevPreguntas, { pregunta: '', multimedia: null }];
      }
    });
  };

  return (
    <div>
      {preguntas.map((pregunta, index) => (
        <div key={index}>
          {/* Renderiza tus preguntas según la estructura de tus datos */}
          {pregunta.pregunta}
          {/* Puedes mostrar la multimedia según tus necesidades */}
        </div>
      ))}

      <CrearPregunta onCreateQuestion={handleCreateQuestion} />
    </div>
  );
};

export default MainComponent;


//Este si jala 

import React, { useState } from 'react';
import { Button, Input, Form, TextArea, Segment, Header, Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useActividadStore } from '../stores/UsuarioStore';



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
  const { actividad } = useActividadStore();


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

      const response = await fetch(`http://localhost:3000/preguntacues/${actividad.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const questionData = await response.json();
        setContenido('');
        setMultimedia(null);

        console.log('Pregunta creada con éxito:', questionData);
      } else {
        console.error('Fallo al crear la pregunta:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
    }
  };

  const handleCrearCuestionario = async () => {
    // Guardar cada pregunta en la base de datos
    for (let i = 0; i < preguntas.length; i++) {
      await handleCrearPregunta(preguntas[i]);
    }
    // Lógica adicional después de crear todas las preguntas, si es necesario
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






//Este si jala version 2

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
  
      const response = await fetch(`http://localhost:3000/preguntacues/${actividad.id}`, {
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

    const response = await fetch(`http://localhost:3000/opcioncues/${pregunta.id}`, {
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