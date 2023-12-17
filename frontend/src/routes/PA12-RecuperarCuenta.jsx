import { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Icon, Image, Modal, Message, Divider, Segment } from 'semantic-ui-react';
import imagen from '../images/undraw_login_re_4vu2 1.svg';
import { Link } from 'react-router-dom';

const PA12RecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(600);

  const [erroresContrasena, setErroresContrasena] = useState({
    longitud: false,
    mayuscula: false,
    caracterEspecial: false,
    numero: false,
    coincidencia: false,
  });

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

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

  useEffect(() => {
    validarContrasena();
  }, [nuevaContrasena, confirmarContrasena]);

  const tiempoRestanteMinutos = Math.floor(tiempoRestante / 60);
  const tiempoRestanteSegundos = tiempoRestante % 60;

  const validarContrasena = () => {
    const regexMayuscula = /[A-Z]/;
    const regexCaracterEspecial = /[?<>+=!@#$%&*()\"']/;
    const regexNumero = /[0-9]/;

    const longitudValida = nuevaContrasena.length >= 4;
    const mayusculaValida = regexMayuscula.test(nuevaContrasena);
    const caracterEspecialValido = regexCaracterEspecial.test(nuevaContrasena);
    const numeroValido = regexNumero.test(nuevaContrasena);
    const coincidenciaValida = nuevaContrasena === confirmarContrasena;

    setErroresContrasena({
      longitud: !longitudValida,
      mayuscula: !mayusculaValida,
      caracterEspecial: !caracterEspecialValido,
      numero: !numeroValido,
      coincidencia: !coincidenciaValida,
    });
  };
  const handleEnviarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:3000/cambiocontrasena/solicitar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      const data = await response.json();

      if (response.ok) {
        setCodigoEnviado(true);
        setMensaje('Código enviado exitosamente al correo del usuario.');
        setOpenModal(true);
      } else {
        setMensaje(data.mensaje || 'Error al enviar el código.');
      }
    } catch (error) {
      console.error('Error al enviar el código:', error);
      setMensaje('Error interno del servidor.');
    }
  };

  const handleGuardarContrasena = async () => {
          // Validar nuevamente antes de intentar actualizar la contraseña
          validarContrasena();

      const hayErrores = Object.values(erroresContrasena).some((error) => error);

      if (hayErrores) {
        setMensaje('La contraseña debe tener al Menos una Mayúscula, un número y un caracter especial " [?<>+=!@#$%&*()] " .');
        return;
      }

      // Verificar si las contraseñas coinciden
      if (nuevaContrasena !== confirmarContrasena) {
        setMensaje('Las contraseñas no coinciden.');
        return;
      }

      // Resto del código para actualizar la contraseña

      try {
        const response = await fetch('http://localhost:3000/cambiocontrasena/verificar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo, codigo, nuevaContrasena, confirmarContrasena }),
        });

        const result = await response.json();

        if (response.ok) {
          setMensaje('Contraseña actualizada con éxito');
          setOpenModal(false);
        } else {
          setMensaje(result.mensaje || 'Error al actualizar la contraseña.');
        }
      } catch (error) {
        console.error('Error al verificar el código y actualizar la contraseña:', error);
        setMensaje('Error interno del servidor.');
      }
    };

    const handleMostrarContrasena = () => {
      setMostrarContrasena(!mostrarContrasena);

    };

    const handleConfirmarContrasena = () => {
      setMostrarConfirmar(!mostrarConfirmar);
    }

  const handleReenviarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:3000/cambiocontrasena/reenviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      const data = await response.json();

      if (response.ok) {
        setCodigoEnviado(true);
        setMensaje('Código reenviado exitosamente al correo del usuario.');
      } else {
        setMensaje(data.mensaje || 'Error al reenviar el código.');
      }
    } catch (error) {
      console.error('Error al reenviar el código:', error);
      setMensaje('Error interno del servidor.');
    }
  };

  return (
    <>
      <Grid columns={2} style={{ height: '104vh' }}>
        <Grid.Row>
          <Grid.Column style={{ background: '#E0DCDC' }} stretched>
            <Image src={imagen} alt="Imagen" />
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Header as='h1' style={{ margin: '5% 0 0 5%' }}> Bienvenido a Math Learn Lab</Header>
              <Header as='h1' style={{ margin: '0 0 10% 10%' }}> Restablecer Contraseña</Header>
            </Grid.Row>
            <Grid.Row>
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

                <Button onClick={handleEnviarCodigo} type='button' fluid animated>
                  <Button.Content visible>Enviar Código</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>

                {mensaje && (
                  <Message positive={codigoEnviado} negative={!codigoEnviado}>
                    <Message.Header>{mensaje}</Message.Header>
                  </Message>
                )}
              </Form>
            </Grid.Row>
            <Grid.Row>
              <Segment style={{ margin: "0 10% 0 10%" }} basic textAlign='center'>
                <Link to="/InicioSesion">
                  <Header as='h4' content="Iniciar Sesion" />
                </Link>
                <Divider horizontal> o </Divider>
                <Link to="/">
                  <Header as='h4' content="Regresar a Inicio" />
                </Link>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* Modal para ingresar código y nueva contraseña */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} size='tiny'>
        <Modal.Header>Restablecer Contraseña</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Código de Verificación</label>
              <input
                type="text"
                placeholder="Ingrese el código de verificación"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Nueva Contraseña</label>
              <Form.Input
                fluid
                iconPosition='right'
                placeholder='Ingrese la nueva contraseña'
                type={mostrarContrasena ? "text" : "password"}
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
              >
                <Icon name='lock' />
                <input />
                <Icon
                  name={mostrarContrasena ? "eye" : "eye slash"}
                  link
                  onClick={handleMostrarContrasena}
                />
              </Form.Input>
            </Form.Field>

            <Form.Field>
              <label>Confirmar Contraseña</label>
              <Form.Input
                fluid
                iconPosition='right'
                placeholder='Confirme la nueva contraseña'
                type={mostrarConfirmar ? "text" : "password"}
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              >
                <Icon name='lock' />
                <input />
                <Icon
                  name={mostrarConfirmar ? "eye" : "eye slash"}
                  link
                  onClick={handleConfirmarContrasena}
                />
              </Form.Input>
            </Form.Field>

            {tiempoRestante > 0 && (
              <Message>
                <Message.Header>
                  El código vencerá en {tiempoRestanteMinutos} minutos y {tiempoRestanteSegundos} segundos.
                </Message.Header>
              </Message>
            )}

            {mensaje && (
              <Message positive={codigoEnviado} negative={!codigoEnviado}>
                <Message.Header>{mensaje}</Message.Header>
              </Message>
            )}

            <Button onClick={handleGuardarContrasena} type='button' fluid animated>
              <Button.Content visible>Guardar Contraseña</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default PA12RecuperarContrasena;
