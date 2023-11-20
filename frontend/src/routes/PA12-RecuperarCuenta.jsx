import { Button, Form, Grid, Header, Icon, Image, Modal, Message } from 'semantic-ui-react';
import imagen from '../images/undraw_login_re_4vu2 1.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const PA12RecuperarContrasena = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/cambiocontrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message); // Mensaje desde el backend
        setOpen(true); // Abre el modal en caso de éxito
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error); // Mensaje de error desde el backend
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error:', error.message); // Error de red u otro tipo de error
      // Mostrar un mensaje si es necesario en caso de error 
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
              <Form error style={{ margin: '0 5% 5% 5%' }} onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                  required
                  fluid
                  iconPosition='left'
                  label="Correo"
                  type='email'
                  placeholder='Ingrese su correo'
                  {...register("correo", {
                    minLength: { value: 4, message: "El `Correo` debe tener por lo menos 4 caracteres" },
                    maxLength: { value: 50, message: "El `Correo` debe tener menos de 50 caracteres" },
                    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Correo no válido" }
                  })}
                >
                  <Icon name='mail' inverted circular />
                  <input />
                </Form.Input>
                {errors.correo && <Message size='tiny' error content={errors.correo.message} />}

                <Button type='submit' icon='right arrow' labelPosition='right' fluid content="Enviar Código" />
              </Form>
            </Grid.Row>
            <Grid.Row>
              <Modal
                centered={false}
                size='tiny'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={<div></div>}
              >
                <Modal.Header>Correo enviado!</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    Se ha enviado un correo con el código de verificación.
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>OK</Button>
                </Modal.Actions>
              </Modal>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default PA12RecuperarContrasena;
