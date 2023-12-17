import { useState, useEffect } from 'react';
import { Button, Form, Icon, Modal, Message } from 'semantic-ui-react';

const VerificarCorreo = () => {
  const [mensaje, setMensaje] = useState('');
  const [openModal, setOpenModal] = useState(true);
  const [codigo, setCodigo] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(600);
  const [correo, setCorreo] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    let temporizador;

    if (openModal) {
      temporizador = setTimeout(() => {
        setTiempoRestante((prevTiempo) => Math.max(prevTiempo - 1, 0));
      }, 1000); // Actualiza cada segundo

      // Limpiar el temporizador cuando se desmonta el componente o se cierra el modal
      return () => clearTimeout(temporizador);
    }

    // Si el modal está cerrado, reinicia el tiempo restante
    setTiempoRestante(600);
  }, [openModal, tiempoRestante]);

  const tiempoRestanteMinutos = Math.floor(tiempoRestante / 60);
  const tiempoRestanteSegundos = tiempoRestante % 60;

  const handleVerificarCorreo = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario/verificar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, codigo }),
      });

      const result = await response.json();

      if (response.ok) {
        setMensajeExito('Su correo fue validado exitosamente. ¡Ya puede iniciar sesión!');
      } else {
        setMensaje(result.mensaje || 'Error al verificar la cuenta.');
      }
    } catch (error) {
      console.error('Error al verificar la cuenta:', error);
      setMensaje('Error interno del servidor.');
    }
  };

  const handleCerrarModal = () => {
    setOpenModal(false);
  };

  return (
    <Modal open={openModal} onClose={handleCerrarModal} size='tiny'>
      <Modal.Header>Código enviado , Ingrese su código de verificación para finalizar el registro</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Código de Verificación</label>
            <input
              type="text"
              placeholder="Ingrese el código de verificación"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </Form.Field>

          {tiempoRestante > 0 && (
            <Message>
              <Message.Header>
                El código vencerá en {tiempoRestanteMinutos} minutos y {tiempoRestanteSegundos} segundos.
              </Message.Header>
            </Message>
          )}

          {mensaje && (
            <Message negative>
              <Message.Header>{mensaje}</Message.Header>
            </Message>
          )}

          {mensajeExito && (
            <Message positive>
              <Message.Header>{mensajeExito}</Message.Header>
            </Message>
          )}

          <Button onClick={handleVerificarCorreo} type='button' fluid animated>
            <Button.Content visible>Verificar Correo</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={handleCerrarModal}>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VerificarCorreo;
