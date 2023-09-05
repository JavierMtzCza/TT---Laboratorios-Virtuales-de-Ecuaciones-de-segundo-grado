import { Button, Divider, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import imagen from "../images/undraw_login_re_4vu2 1.svg"
import { Link } from 'react-router-dom'
import { useState } from 'react';


const PA2InicioSesion = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [noUser, setNoUser] = useState(false)

  const onSubmit = handleSubmit((formData) => {

    fetch(`api/usuario/login/${formData.correo}/${formData.contrasena}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setNoUser(true)
        }
        else {
          setNoUser(false)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        reset({
          correo: '',
          contrasena: ''
        })
      })

  })

  return (
    <>
      <Grid columns={2} style={{ height: "103vh" }}>
        <Grid.Row>
          <Grid.Column style={{ background: "#E0DCDC" }} stretched>
            <Image src={imagen}></Image>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Header as='h1' style={{ margin: "5% 0 0 5%" }}> Bienvenido a</Header>
              <Header as='h1' style={{ margin: "0 0 15% 10%" }}> Math Learn Lab</Header>
            </Grid.Row>
            <Grid.Row>

              <Form error style={{ margin: "0 10% 5% 10%" }} onSubmit={onSubmit}>

                <Form.Input required iconPosition='left' fluid label="Correo" placeholder="Ingrese su correo" type='email'>
                  <Icon name='at' />
                  <input {...register("correo", {
                    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Correo no valido" }
                  })} />
                </Form.Input>
                {errors.correo && <Message size='tiny' error content={errors.correo.message} />}

                <Form.Input required iconPosition='left' fluid label="Password" placeholder="Ingrese su contrasena" type='password'>
                  <Icon name='key' />
                  <input {...register("contrasena")} />
                </Form.Input>
                {noUser && <Message size='tiny' error content="Usuario o contrasena incorrectos" />}

                <Button type='submit' fluid animated>
                  <Button.Content visible>Iniciar Sesion</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
              </Form>

            </Grid.Row>
            <Grid.Row>
              <Segment style={{ margin: "0 20% 0 20%" }} basic textAlign='center'>
                <Link to="/SingUp">
                  <Header as='h4'>No tienes una cuenta?</Header>
                </Link>
                <Divider horizontal>O</Divider>
                <Link to="/SingUp">
                  <Header as='h4'>Se te olvido tu contrasena?</Header>
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