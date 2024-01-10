import React, { useState } from 'react';
import { Grid, Form, Input, Button, Radio, Label,Modal, Message,Image,Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useActividadStore } from '../stores/UsuarioStore';
import { useNavigate } from 'react-router-dom';


const PA9CrearCuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [question, setQuestion] = useState('');
  const [multimedia, setMultimedia] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedPreguntaIndex, setSelectedPreguntaIndex] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showConfirmCuestionario, setShowConfirmCuestionario] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const actividad = useActividadStore(state => state.actividad);
  const navigate = useNavigate();

  const handleCargarImagen = (e) => {
    const file = e.target.files[0];
    setMultimedia(file);
  };

  const handleOpcionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAgregarOpcion = () => {
    if (options.length < 5) {
      setOptions([...options, { textOpcion: '', multimedia: null }]);
    }
  };

  const handleAgregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: question, multimedia: multimedia, opciones: options }]);
    setQuestion('');
    setMultimedia(null);
    setOptions([]);
  };

  const handleConfirmarGuardar = async () => {
    // Mostrar el modal de confirmación
    setShowConfirmCuestionario(true);
  };

  const handleGuardarCuestionario = async () => {
    try {

      if (preguntas.length === 0) {
        // Mostrar un mensaje indicando que no se puede guardar sin preguntas
        setShowPortal(true);  // Mostrar el mensaje de error en pantalla
        return;
      }
      // Lógica para guardar el cuestionario
      for (const preguntaData of preguntas) {
        const formData = new FormData();
        formData.append('pregunta', preguntaData.pregunta);
        formData.append('multimedia', preguntaData.multimedia);
  
        const responsePregunta = await fetch(`${import.meta.env.VITE_URL_BACKEND}/preguntacues/${actividad.id}`, {
          method: 'POST',
          body: formData,
        });
  
        const dataPregunta = await responsePregunta.json();
  
        if (responsePregunta.ok) {
          const preguntaCuestionarioId = dataPregunta.preguntaCuestionario.id;
  
          for (let index = 0; index < preguntaData.opciones.length; index++) {
            const opcion = preguntaData.opciones[index];
            const opcionFormData = new FormData();
            opcionFormData.append('textOpcion', opcion.textOpcion);
            opcionFormData.append('multimedia', opcion.multimedia);
            opcionFormData.append('correcta', opcion.correcta);
  
            const responseOpcion = await fetch(`${import.meta.env.VITE_URL_BACKEND}/opcioncues/${preguntaCuestionarioId}`, {
              method: 'POST',
              body: opcionFormData,
            });
  
            const dataOpcion = await responseOpcion.json();

          }
        } else {
          console.error('Error al agregar la pregunta:', dataPregunta.mensaje);
        }
      }
  
      // Marcar el cuestionario como guardado exitosamente
      setGuardadoExitoso(true);
      setShowPortal(true);
    } catch (error) {
      console.error('Error de red:', error);
    }
  
    // Limpiar el estado después de guardar
    setPreguntas([]);
    setSelectedPreguntaIndex(null);
    setSelectedOptionIndex(null);
  };

  const EditarPregunta = (index) => {
    const pregunta = preguntas[index];
    setQuestion(pregunta.pregunta);
    setMultimedia(pregunta.multimedia);
    setOptions(pregunta.opciones);
    setSelectedPreguntaIndex(index);
  };

  const EliminarPregunta = (index) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas.splice(index, 1);
    setPreguntas(updatedPreguntas);
    setSelectedPreguntaIndex(null);
    setSelectedOptionIndex(null);
  };

  const EliminarOpcion = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    setSelectedOptionIndex(null);
  };

  const ActualizarPregunta = () => {
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

  const OpcionCorrecta = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      correcta: i === index,
    }));
    setOptions(updatedOptions);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
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
            <Input type="file" onChange={handleCargarImagen} />
            {multimedia && (
              <div>
                <Image
                  src={URL.createObjectURL(multimedia)}
                  size="small"
                  onClick={() => handleImageClick(URL.createObjectURL(multimedia))}
                />
              </div>
            )}
          </Form.Field>
          {options.map((option, index) => (
            <div key={index}>
              <Form.Field>
                <label>
                  Opción {index + 1}:
                  <Input
                    type="text"
                    value={option.textOpcion}
                    onChange={(e) => handleOpcionChange(index, 'textOpcion', e.target.value)}
                  />
                  <Radio
                    name={`correctOption${index}`}
                    checked={option.correcta}
                    onChange={() => OpcionCorrecta(index)}
                  />
                  <Label>Correcta</Label>
                  <Button type="button" onClick={() => EliminarOpcion(index)}>
                    Eliminar
                  </Button>
                </label>
              </Form.Field>
              <Form.Field>
                <label>Multimedia:</label>
                <Input
                  type="file"
                  onChange={(e) => handleOpcionChange(index, 'multimedia', e.target.files[0])}
                />
                {option.multimedia && (
                  <div>
                    <Image
                      src={URL.createObjectURL(option.multimedia)}
                      size="small"
                      onClick={() => handleImageClick(URL.createObjectURL(option.multimedia))}
                    />
                  </div>
                )}
              </Form.Field>
            </div>
          ))}
          {options.length < 5 && (
            <Button type="button" onClick={handleAgregarOpcion}>
              Agregar Opción
            </Button>
          )}
          {selectedPreguntaIndex !== null ? (
            <div>
              <Button type="button" onClick={ActualizarPregunta}>
                Actualizar Pregunta
              </Button>
              <Button type="button" onClick={() => setSelectedPreguntaIndex(null)}>
                Cancelar Edición
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={handleAgregarPregunta}>
              Agregar Pregunta
            </Button>
          )}
        </Form>
      </Grid.Column>
      <Grid.Column>
        <div>
          <h2>Preguntas Agregadas:</h2>
          {preguntas.map((pregunta, index) => (
            <Segment key={index}>
              <p><strong>Pregunta:</strong> {pregunta.pregunta}</p>
              {pregunta.multimedia && (
                <p><strong>Multimedia:</strong> {pregunta.multimedia.name}</p>
              )}

              <p><strong>Opciones:</strong></p>
              {pregunta.opciones.map((opcion, optionIndex) => (
                <div key={optionIndex}>
                  <p>{`Opción ${optionIndex + 1}: ${opcion.textOpcion}`}</p>
                  {opcion.multimedia && (
                    <p><strong>Multimedia:</strong> {opcion.multimedia.name}</p>
                  )}
                  <p>{`Correcta: ${opcion.correcta ? 'Sí' : 'No'}`}</p>
                  <p></p>
                </div>
              ))}

              <Button.Group>
                <Button type="button" onClick={() => EditarPregunta(index)}>
                  Editar Pregunta
                </Button>
                <Button type="button" onClick={() => EliminarPregunta(index)}>
                  Eliminar Pregunta
                </Button>
              </Button.Group>
            </Segment>
          ))}
        </div>
        {selectedOptionIndex !== null && (
          {/* <div>
            <Button type="button" onClick={() => ActualizarOpcion()}>
              Actualizar Opción
            </Button>
            <Button type="button" onClick={() => setSelectedOptionIndex(null)}>
              Cancelar Edición
            </Button>
          </div> */}
        )}

        <Button type="button" onClick={handleConfirmarGuardar}>
          Guardar Cuestionario
        </Button>

        <Modal
          centered={false}
          size='tiny'
          content={<Message style={{ textAlign: "center", fontSize: "18px" }} negative header="Error" content="Debe agregar al menos una pregunta antes de guardar el cuestionario." />}
          open={showPortal && !guardadoExitoso}
          onClose={() => setShowPortal(false)}
        />

        <Modal open={showConfirmCuestionario} onClose={() => setShowConfirmCuestionario(false)}>
          <Modal.Header>Confirmación</Modal.Header>
          <Modal.Content>
            <p>¿Desea guardar el Cuestionario?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setShowConfirmCuestionario(false)}>
              Cancelar
            </Button>
            <Button positive onClick={handleGuardarCuestionario}>
              Confirmar
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          centered={false}
          size='tiny'
          content={<Message style={{ textAlign: "center", fontSize: "18px" }} positive header="Cuestionario creado satisfactoriamente" />}
          open={showPortal && guardadoExitoso}
          onClose={() => {
            setShowPortal(false);
            if (guardadoExitoso) {
              navigate('/Grupo');
            }
          }}
        />

        {showImageModal && (
          <Modal open={showImageModal} onClose={() => setShowImageModal(false)}>
            <Modal.Content>
              <Image src={selectedImage} size="large" centered />
            </Modal.Content>
          </Modal>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PA9CrearCuestionario;