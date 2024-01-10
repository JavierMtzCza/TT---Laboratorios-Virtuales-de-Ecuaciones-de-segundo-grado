import React, { useState, useEffect } from 'react';
import { Button, Container, Header, Image, Radio, Modal, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useActividadStore, useUsuarioStore } from '../stores/UsuarioStore';

const PA10Formulario = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [preguntasCues, setPreguntasCues] = useState([]);
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [calificacionAsignada, setCalificacionAsignada] = useState(false);
  const [final, setFinal] = useState(false); // Nuevo estado para el modal final

  

  const actividad = useActividadStore((state) => state.actividad);
  const usuario = useUsuarioStore((state) => state.usuario);
  const preguntas = actividad.PreguntaCuestionario;

  const navigate = useNavigate();

  const handleSeleccionarOpcion = (opcionIndex) => {
    setOpcionSeleccionada(opcionIndex);
    // Verificar si la opción seleccionada es correcta y actualizar respuestasCorrectas
    if (preguntasCues[preguntaActual].OpcionCuestionario[opcionIndex].correcta) {
      setRespuestasCorrectas((prev) => prev + 1);
    }
  };

  const obtenerImagenURL = (multimedia) => {
    try {
      if (multimedia && multimedia.data) {
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(multimedia.data)));
        return `data:${multimedia.type};base64,${base64String}`;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/preguntacues/actividad/${actividad.id}/preguntas`);
        const data = await response.json();
  
        if (response.ok) {
          console.log('Data de preguntas:', data);
          setPreguntasCues(data);
        } else {
          console.error('Error al obtener preguntas:', data.mensaje);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };
    fetchPreguntas();
  }, [actividad.id]);

  
  const mostrarSiguientePregunta = () => {
    setPreguntaActual((prev) => Math.min(prev + 1, preguntasCues.length - 1));
    setOpcionSeleccionada([]);

    if (preguntaActual === preguntasCues.length - 1) {
      setMostrarCalificacion(true);
    }
  };

  const mostrarPreguntaAnterior = () => {
    setPreguntaActual((prev) => Math.max(prev - 1, 0));
    setOpcionSeleccionada([]);
    setMostrarCalificacion(false); // Asegúrate de ocultar la calificación al retroceder
  };


  const AsignarCalificacion = () => {
    // Verifica si la calificación ya ha sido asignada
    if (!calificacionAsignada) {
      const calificacion = (respuestasCorrectas / preguntasCues.length) * 10;
  
      setFinal(true);
  
      fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/calificacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idActividad: actividad.id,
          idUsuario: usuario.perfil.id,
          calificacion: parseFloat(calificacion.toFixed(2)),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Marca la calificación como asignada
          setCalificacionAsignada(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageSrc(null);
  };


  return (
    <Container text textAlign="center">
      <Header as="h1">Preguntas del Cuestionario</Header>
      {preguntas && preguntas.length > 0 ? (
        <div>
          <div>
            <Header as="h2">{preguntas[preguntaActual]?.pregunta || ''}</Header>
            {preguntas[preguntaActual]?.multimedia && (
              <div onClick={() => openModal(obtenerImagenURL(preguntas[preguntaActual].multimedia))}>
                <Image
                  src={obtenerImagenURL(preguntas[preguntaActual].multimedia)}
                  alt="Imagen de la pregunta"
                  style={{ cursor: 'pointer', maxWidth: '50%', height: 'auto', margin: 'auto' }}
                />
              </div>
            )}
            {preguntas[preguntaActual]?.OpcionCuestionario && preguntas[preguntaActual]?.OpcionCuestionario.length > 0 ? (
              preguntas[preguntaActual].OpcionCuestionario.map((opcion, optionIndex) => (
                <div key={optionIndex} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                  <Radio
                    name={`opcion${preguntaActual}`}
                    checked={opcionSeleccionada === optionIndex}
                    onChange={() => handleSeleccionarOpcion(optionIndex)}
                    style={{ marginRight: '10px', fontSize: '20px' }}
                  />
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: opcionSeleccionada === optionIndex ? '#2185d0' : 'black' }}>
                    {`Opción ${optionIndex + 1}: ${opcion.textOpcion || ''}`}
                  </span>
                  {opcion.multimedia && (
                    <div onClick={() => openModal(obtenerImagenURL(opcion.multimedia))}>
                      <Image
                        src={obtenerImagenURL(opcion.multimedia)}
                        alt={`Imagen de la opción ${optionIndex + 1}`}
                        style={{ cursor: 'pointer', maxWidth: '40%', height: 'auto', margin: 'auto', marginTop: '10px' }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No hay opciones disponibles.</p>
            )}

            {mostrarCalificacion && !calificacionAsignada ? (
              <div>
                <Button onClick={AsignarCalificacion} positive>
                  Calificar Cuestionario
                </Button>
                <p style={{ fontSize: '18px' }}>Calificación obtenida: {((respuestasCorrectas / preguntasCues.length) * 10).toFixed(2)}</p>
              </div>
            ) : (
              <div>
                {preguntaActual > 0 && (
                  <Button onClick={mostrarPreguntaAnterior} primary>
                    Pregunta Anterior
                  </Button>
                )}
                <Button onClick={mostrarSiguientePregunta} primary>
                  Siguiente Pregunta
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No hay preguntas disponibles.</p>
      )}

      {/* Modal para la imagen */}
      <Modal open={modalOpen} onClose={closeModal} centered={false}>
        <Modal.Content image>
          <Image wrapped src={modalImageSrc} alt="Imagen" />
        </Modal.Content>
      </Modal>
      {/* Modal final */}
      <Modal
        centered={false}
        size='tiny'
        content={
          <Message style={{ textAlign: "center", fontSize: "18px" }} positive
            header={`Haz finalizado el cuestionario, has obtenido ${respuestasCorrectas} aciertos, tu calificación es ${(respuestasCorrectas * 10) / preguntasCues.length.toFixed(2)}`}
          />
        }
        open={final}
        onClose={() => {
          setFinal(false);
          navigate('/Grupo');
        }}
      />
    </Container>
  );
};

export default PA10Formulario;