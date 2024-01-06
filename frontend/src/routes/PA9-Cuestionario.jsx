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
    <Grid centered columns={2}>
      <Grid.Column>
        <Form>
          <Form.Field>
            <label>Pregunta:</label>
            <Input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Multimedia:</label>
            <Input type="file" onChange={handleFileChange} />
          </Form.Field>
          {/* Renderizar campos de opciones */}
          {options.map((option, index) => (
            <div key={index}>
              <Form.Field>
                <label>
                  Opción {index + 1}:
                  <Input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  />
                  <Radio
                    name={`correctOption${index}`}
                    checked={option.correcta}
                    onChange={() => handleSelectCorrectOption(index)}
                  />
                  <Label>Correcta</Label>
                  <Button type="button" onClick={() => handleDeleteOption(index)}>
                    Eliminar
                  </Button>
                </label>
              </Form.Field>
              <Form.Field>
                <label>Multimedia:</label>
                <Input
                  type="file"
                  onChange={(e) => handleOptionChange(index, 'image', e.target.files[0])}
                />
              </Form.Field>
            </div>
          ))}
          {options.length < 5 && (
            <Button type="button" onClick={handleAddOption}>
              Agregar Opción
            </Button>
          )}
          {selectedPreguntaIndex !== null ? (
            <div>
              <Button type="button" onClick={handleUpdatePregunta}>
                Actualizar Pregunta
              </Button>
              <Button type="button" onClick={() => setSelectedPreguntaIndex(null)}>
                Cancelar Edición
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={handleAddPregunta}>
              Agregar Pregunta
            </Button>
          )}
        </Form>
      </Grid.Column>
      <Grid.Column>
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
              <Button type="button" onClick={() => handleEditPregunta(index)}>
                Editar Pregunta
              </Button>
              <Button type="button" onClick={() => handleDeletePregunta(index)}>
                Eliminar Pregunta
              </Button>
            </div>
          ))}
        </div>
        {selectedOptionIndex !== null && (
          <div>
            <Button type="button" onClick={() => handleUpdateOption()}>
              Actualizar Opción
            </Button>
            <Button type="button" onClick={() => setSelectedOptionIndex(null)}>
              Cancelar Edición
            </Button>
          </div>
        )}
        <Button type="button" onClick={handleSaveCuestionario}>
          Guardar Cuestionario
        </Button>
      </Grid.Column>
    </Grid>
  );
};  

export default QuestionForm;
