import { Button, Divider, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import imagen from "../images/undraw_login_re_4vu2 1.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useUsuarioStore } from "../stores/UsuarioStore";
import { useMediaQuery } from 'react-responsive';

const PA2InicioSesion = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [noUser, setNoUser] = useState(false)
  const navigate = useNavigate();
  //Estado global
  const logearUsuario = useUsuarioStore(state => state.setUsuario)

  const isDesktopOrTablet = useMediaQuery({ query: "(min-width:768px)" })


  const onSubmit = handleSubmit((formData) => {

    fetch(`${import.meta.env.VITE_URL_BACKEND}/usuario/${formData.correo}/${formData.contrasena}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setNoUser(true)
          console.log(data)
        } else {
          setNoUser(false)
          logearUsuario(data)
          navigate("/Grupos", { replace: true });
        }
      })
      .finally(() => {
        reset({
          correo: '',
          contrasena: ''
        })
      })

  })

  return (
    <>
      <Grid columns={isDesktopOrTablet ? 2 : 1} style={{ height: "103vh" }}>
        <Grid.Row>
          {
            isDesktopOrTablet ?
              <Grid.Column style={{ background: "#E0DCDC" }} stretched>
                <Image src={imagen}></Image>
              </Grid.Column>
              :
              <></>
          }

          <Grid.Column>
            <Grid.Row >
              <Header as='h1' style={{ margin: "5% 0 10% 5%", color:"#55ACEE" }} content="Bienvenido a Chicharronera Lab" subheader="Inicio de Sesión"/>
            </Grid.Row>
            <Grid.Row>
              <Form error style={{ margin: "0 10% 5% 10%" }} onSubmit={onSubmit}>
                <Form.Input required iconPosition='left' fluid label="Correo" placeholder="Ingrese su correo" type='email'>
                  <Icon name='at' />
                  <input {...register("correo", { pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Correo no valido" } })} />
                </Form.Input>
                {errors.correo && <Message size='tiny' error content={errors.correo.message} />}

                <Form.Input required iconPosition='left' fluid label="Contraseña" placeholder="Ingrese su contraseña" type='password'>
                  <Icon name='key' />
                  <input {...register("contrasena")} />
                </Form.Input>
                {noUser && <Message size='tiny' error content="Usuario o contraseña incorrectos" />}

                <Button type='submit' color='twitter' fluid animated>
                  <Button.Content visible>Iniciar Sesion</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
              </Form>

            </Grid.Row>
            <Grid.Row>
              <Segment style={{ margin: "0 20% 0 20%" }} basic textAlign='center'>
                <Link to="/Registro">
                  <Header as='h4'>¿No tienes una cuenta?</Header>
                </Link>
                <Divider horizontal>O</Divider>
                <Link to="/SingUp">
                  <Header as='h4'>¿Se te olvido tu contraseña?</Header>
                </Link>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default PA2InicioSesion