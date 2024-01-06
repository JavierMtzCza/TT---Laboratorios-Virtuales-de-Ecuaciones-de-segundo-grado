import React, { useEffect, useRef } from 'react';

const PacmanGame = () => {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);

  const oneBlockSize = 40;  // Cambiado a 3 veces el tamaño original
  const wallSpaceWidth = oneBlockSize / 3.2;  // Cambiado a 3 veces el tamaño original
  const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
  const wallInnerColor = 'black';

  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 1],
    [1, 2, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 0, 0, 0, 0, 1],
    [1, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1],
    [1, 2, 1, 1, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2,2, 2, 1, 2,2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1,  1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2,  1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 2, 1, 2,0, 2, 1, 2,0, 2, 1, 2,  2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 2, 2, 2,1, 2, 2, 2,1, 2, 2, 2,  1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 2,1, 2, 2, 2,1, 2, 2, 2,  2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1,  1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2,1, 2, 2, 2,1, 2, 2, 2,  2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2,2, 2, 1, 2,2, 2, 1, 2,  2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1,1, 1, 1, 1,1, 1, 1, 1,  1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2,  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1,1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   ];

  useEffect(() => {
    const initializeGame = () => {
      const canvasElement = canvasRef.current;
      const context = canvasElement.getContext('2d');
      canvasContextRef.current = context;
    };

    initializeGame();
  }, []);

  const createRect = (x, y, width, height, color) => {
    const context = canvasContextRef.current;
    if (context) {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    }
  };

  let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    "#342DCA"
                );
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }

                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
            }
        }
    }
};

  const drawCanvas = () => {
    const context = canvasContextRef.current;
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawWalls();
      // Otras funciones de dibujo van aquí
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={map[0].length * oneBlockSize}
        height={map.length * oneBlockSize}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default PacmanGame;



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

  
  const actividad = useActividadStore(state => state.actividad);



  const manejarTextoPregunta = (valor) => {
    setNuevaPregunta((pregunta) => ({ ...pregunta, texto: valor }));
  };

  const manejarOpcionChange = (index, valor) => {
    if (valor !== '') {
      nuevaPregunta.opciones[index] = valor;
    }
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

  const handleCrearOpcion = async (opcion, preguntaId) => {
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
        console.log('Opción creada con éxito:', opcionData);
      } else {
        console.error('Fallo al crear la opción:', response.statusText);
        throw new Error('Error al crear la opción');
      }
    } catch (error) {
      console.error('Error al crear la opción:', error);
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



//
import React, { useState } from 'react';
import { useActividadStore } from '../stores/UsuarioStore';

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [multimedia, setMultimedia] = useState(null);
  const [options, setOptions] = useState(['', '', '', '', '']);

  const actividad = useActividadStore(state => state.actividad);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMultimedia(file);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Crear un objeto con la pregunta y multimedia
    const questionData = {
      pregunta: question,
      multimedia: multimedia,
    };
  
    try {
      // Realizar la llamada al backend usando fetch para crear la pregunta
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/preguntacues/${actividad.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Obtener el ID de la pregunta recién creada
        const preguntaCuestionarioId = data.preguntaCuestionario.id;
  
        // Crear las opciones asociadas a la pregunta
        const opcionesCreadas = await Promise.all(
          options.map(async (opcion, index) => {
            const opcionResponse = await fetch(`${import.meta.env.VITE_URL_BACKEND}/opcioncues/${preguntaCuestionarioId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                textOpcion: opcion,
                correcta: index === 0,  // La primera opción es considerada como la correcta
              }),
            });
            const opcionData = await opcionResponse.json();
  
            return opcionData.opcionCuestionario;
          })
        );
  
        // Agregar las opciones al estado o realizar cualquier otra acción necesaria
        // ...
  
        // Actualizar el estado con la nueva pregunta y sus opciones
        onAddQuestion({ preguntaCuestionario: data.preguntaCuestionario, opciones: opcionesCreadas });
      } else {
        console.error('Error al agregar la pregunta:', data.mensaje);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  
    // Limpiar el formulario después de enviar la pregunta
    setQuestion('');
    setMultimedia(null);
    setOptions(['', '', '', '', '']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pregunta:
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label>
        Multimedia:
        <input type="file" onChange={handleFileChange} />
      </label>
      {/* Renderizar campos de opciones */}
      {options.map((option, index) => (
        <label key={index}>
          Opción {index + 1}:
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </label>
      ))}
      <button type="submit">Agregar Pregunta</button>
    </form>
  );
};

export default QuestionForm;




//Funcional Código CUestionario 
import React, { useState } from 'react';
import { Grid, Form, Input, Button, Radio, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useActividadStore } from '../stores/UsuarioStore';

const QuestionForm = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [question, setQuestion] = useState('');
  const [multimedia, setMultimedia] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedPreguntaIndex, setSelectedPreguntaIndex] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const actividad = useActividadStore(state => state.actividad);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMultimedia(file);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, { text: '', image: null }]);
    }
  };

  const handleAddPregunta = () => {
    setPreguntas([...preguntas, { pregunta: question, multimedia: multimedia, opciones: options }]);
    setQuestion('');
    setMultimedia(null);
    setOptions([]);
  };

  const handleSaveCuestionario = async (e) => {
    e.preventDefault();
  
    try {
      // Manejo de la creación de preguntas y opciones...
      for (const preguntaData of preguntas) {
        const formData = new FormData();
        formData.append('pregunta', preguntaData.pregunta);
        formData.append('multimedia', preguntaData.multimedia);
  
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/preguntacues/${actividad.id}`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const preguntaCuestionarioId = data.preguntaCuestionario.id;
  
          // Manejo de las opciones...
          for (let index = 0; index < preguntaData.opciones.length; index++) {
            const opcion = preguntaData.opciones[index];
            const opcionFormData = new FormData();
            opcionFormData.append('textOpcion', opcion.text);
            opcionFormData.append('multimedia', opcion.image);
            opcionFormData.append('correcta', opcion.correcta);
  
            const opcionResponse = await fetch(`${import.meta.env.VITE_URL_BACKEND}/opcioncues/${preguntaCuestionarioId}`, {
              method: 'POST',
              body: opcionFormData,
            });
  
            const opcionData = await opcionResponse.json();
  
            // Aquí puedes realizar cualquier acción necesaria con opcionData
          }
        } else {
          console.error('Error al agregar la pregunta:', data.mensaje);
        }
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  
    setPreguntas([]);
    setSelectedPreguntaIndex(null);
    setSelectedOptionIndex(null);
  };

  const handleEditPregunta = (index) => {
    const pregunta = preguntas[index];
    setQuestion(pregunta.pregunta);
    setMultimedia(pregunta.multimedia);
    setOptions(pregunta.opciones);
    setSelectedPreguntaIndex(index);
  };

  const handleDeletePregunta = (index) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas.splice(index, 1);
    setPreguntas(updatedPreguntas);
    setSelectedPreguntaIndex(null);
    setSelectedOptionIndex(null);
  };

  const handleEditOption = (index) => {
    const option = options[index];
    setSelectedOptionIndex(index);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    setSelectedOptionIndex(null);
  };

  const handleUpdatePregunta = () => {
    if (selectedPreguntaIndex !== null) {
      const updatedPreguntas = [...preguntas];
      updatedPreguntas[selectedPreguntaIndex] = {
        pregunta: question,
        multimedia: multimedia,
        opciones: options,
      };
      setPreguntas(updatedPreguntas);
      setQuestion('');
      setMultimedia(null);
      setOptions([]);
      setSelectedPreguntaIndex(null);
      setSelectedOptionIndex(null);
    }
  };

  const handleUpdateOption = () => {
    if (selectedOptionIndex !== null) {
      const updatedOptions = [...options];
      updatedOptions[selectedOptionIndex] = { text: '', image: null };
      setOptions(updatedOptions);
      setSelectedOptionIndex(null);
    }
  };

  const handleSelectCorrectOption = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      correcta: i === index,
    }));
    setOptions(updatedOptions);
  };

  return (
    <form>
      <label>
        Pregunta:
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label>
        Multimedia:
        <input type="file" onChange={handleFileChange} />
      </label>
      {/* Renderizar campos de opciones */}
      {options.map((option, index) => (
        <div key={index}>
          <label>
            Opción {index + 1}:
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
            />
            <input
              type="radio"
              name={`correctOption${index}`}
              checked={option.correcta}
              onChange={() => handleSelectCorrectOption(index)}
            />
            <label>Correcta</label>
            {/* <button type="button" onClick={() => handleEditOption(index)}>
              Editar
            </button>*/}
            <button type="button" onClick={() => handleDeleteOption(index)}>
              Eliminar
            </button>
          </label>
          <label>
            Multimedia:
            <input
              type="file"
              onChange={(e) => handleOptionChange(index, 'image', e.target.files[0])}
            />
          </label>
        </div>
      ))}
      {options.length < 5 && (
        <button type="button" onClick={handleAddOption}>
          Agregar Opción
        </button>
      )}
      {selectedPreguntaIndex !== null ? (
        <div>
          <button type="button" onClick={handleUpdatePregunta}>
            Actualizar Pregunta
          </button>
          <button type="button" onClick={() => setSelectedPreguntaIndex(null)}>
            Cancelar Edición
          </button>
        </div>
      ) : (
        <button type="button" onClick={handleAddPregunta}>
          Agregar Pregunta
        </button>
      )}
      {/* Visualizar preguntas agregadas */}
      <div>
        <h2>Preguntas Agregadas:</h2>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <p>{pregunta.pregunta}</p>
            <p>Multimedia: {pregunta.multimedia && pregunta.multimedia.name}</p>
            <p>Opciones:</p>
            {pregunta.opciones.map((opcion, optionIndex) => (
              <div key={optionIndex}>
                <p>{`Opción ${optionIndex + 1}: ${opcion.text}`}</p>
                <p>Multimedia: {opcion.image && opcion.image.name}</p>
                <p>{`Correcta: ${opcion.correcta ? 'Sí' : 'No'}`}</p>
              </div>
            ))}
            <button type="button" onClick={() => handleEditPregunta(index)}>
              Editar Pregunta
            </button>
            <button type="button" onClick={() => handleDeletePregunta(index)}>
              Eliminar Pregunta
            </button>
          </div>
        ))}
      </div>
      {selectedOptionIndex !== null && (
        {/*<div>
          <button type="button" onClick={handleUpdateOption}>
            Actualizar Opción
          </button>
          <button type="button" onClick={() => setSelectedOptionIndex(null)}>
            Cancelar Edición
          </button>
      </div> */}
      )}
      <button type="button" onClick={handleSaveCuestionario}>
        Guardar Cuestionario
      </button>
    </form>
  );
};

export default QuestionForm;
