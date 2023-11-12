import { useState } from 'react';
import { Button, Divider, Form, Grid, Header, Icon, Image, Message, Segment,Modal } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import imagen from "../images/undraw_login_re_4vu2 1.svg"
import { Link } from 'react-router-dom'

const PA12RecuperarContraseña = () => {
  const [showModal, setShowModal] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [verificationCode, setVerificationCode] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);


  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/resetpassword/${formData.correo}`);
      const data = await response.json();
      if (!data.error) {
        setIsRegistered(true);
        setShowModal(true);
      } else {
        alert('El correo electrónico no está registrado.');
      }
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
    }
  });

  const handleReenviarCodigo = async () => {
    setIsResending(true);
    // Lógica para reenviar el código de verificación
    // Puedes llamar a la misma API con un endpoint diferente para reenviar el código.
    try {
      // Simulación de reenvío exitoso después de 2 segundos (simular el proceso de envío)
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Se ha reenviado el código de verificación.');
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al reenviar el código.');
    } finally {
      setIsResending(false);
    }
  };

  const Verificarcodigo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/verificarcodigo/${verificationCode}`);
      const data = await response.json();
      if (!data.error) {
        // Continuar con el proceso para cambiar la contraseña
        // Redirigir a la página de cambio de contraseña, etc.
        alert('Código verificado, procede a cambiar la contraseña.');
      } else {
        alert('Código no válido, inténtalo de nuevo.');
      }
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al verificar el código.');
    }
  };

  return (
    <>
      <Grid columns={2} style={{ height: "103vh" }}>
        <Grid.Row>
          <Grid.Column style={{ background: "#E0DCDC" }} stretched>
            <Image src={imagen}></Image>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Header as='h1' style={{ margin: "5% 0 0 5%" }}> Bienvenido a MateLab</Header>
              <Header as='h1' style={{ margin: "2% 0 10% 5%" }}> Reestablecer contraseña</Header>
            </Grid.Row>
            <Grid.Row>

              <Form error style={{ margin: '0 10% 5% 10%' }} onSubmit={onSubmit}>
                  <Form.Input
                    required
                    iconPosition='left'
                    fluid
                    label='Correo'
                    placeholder='Ingrese su correo'
                    type='email'
                    error={errors.correo ? { content: errors.correo.message } : null}
                  >
                    <Icon name='at' />
                    <input
                      {...register('correo', {
                        required: 'El correo es requerido',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Correo no válido'
                        }
                      })}
                    />
                  </Form.Input>
                  <Button type='submit' fluid animated>
                      <Button.Content visible>Enviar código</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right' />
                   </Button.Content>
                  </Button>
                    <Button
                      type='button'
                      fluid
                      onClick={handleReenviarCodigo}
                      disabled={isResending}
                      style={{ marginTop: '10px' }}
                      >
                      {isResending ? 'Reenviando código...' : 'Reenviar código'}
                    </Button>
               </Form>
               <Modal open={showModal} onClose={() => setShowModal(false)} closeIcon>
                  <Modal.Header>Verificar código</Modal.Header>
                  <Modal.Content>
                    <Form>
                      <Form.Input
                        required
                        fluid
                        label='Código de verificación'
                        placeholder='Ingrese el código'
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <Button type='button' onClick={Verificarcodigo}>
                        Verificar código
                      </Button>
                    </Form>
                  </Modal.Content>
                </Modal>
            </Grid.Row>
            <Grid.Row>
              <Segment style={{ margin: "0 20% 0 20%" }} basic textAlign='center'>
                <Link to="/Registro">
                  <Header as='h4'>No tienes una cuenta?</Header>
                </Link>
                
                
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default PA12RecuperarContraseña