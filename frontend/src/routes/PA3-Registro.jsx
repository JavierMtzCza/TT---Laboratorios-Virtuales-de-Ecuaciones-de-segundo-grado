import { Button, Divider, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import imagen from "../images/undraw_login_re_4vu2 1.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import VerificarCorreo from "../components/ModalVerificación"


const PA3Registro = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [noCoinicide, setNoCoinicide] = useState(false)
  
  const [openVerificarCorreoModal, setOpenVerificarCorreoModal] = useState(false);

  const postData = (data) => {
    fetch('http://localhost:3000/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
           // Cambia el estado si el registro fue exitoso
          setOpen(true);
          setOpenVerificarCorreoModal(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = handleSubmit((data) => {
    if (data.confir_contrasena !== data.contrasena) {
      setNoCoinicide(true);
    } else {
      setNoCoinicide(false);
      postData({
        nombre: data.nombre,
        apellido_paterno: data.ap_paterno,
        apellido_materno: data.ap_materno,
        correo: data.correo,
        contrasena: data.contrasena,
      });
      reset({
        nombre: '',
        correo: '',
        ap_paterno: '',
        ap_materno: '',
        contrasena: '',
        confir_contrasena: '',
      });
    }
  });

  return (
    <>
      <Grid columns={2} style={{ height: "104vh" }}>
        <Grid.Row>
          <Grid.Column style={{ background: "#E0DCDC" }} stretched>
            <Image src={imagen}></Image>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Header as='h1' style={{ margin: "5% 0 0 5%" }}> Bienvenido a Chicharronera Lab</Header>
              <Header as='h1' style={{ margin: "0 0 10% 10%" }}> Registro</Header>
            </Grid.Row>
            <Grid.Row>

              <Form error style={{ margin: "0 5% 5% 5%" }} onSubmit={onSubmit} >

                <Form.Group widths='equal'>
                  <Form.Input required label="Nombre" children={<input {...register("nombre", {
                    minLength: { value: 2, message: "El `Nombre` debe tener por lo menos 2 caractres" },
                    maxLength: { value: 20, message: "El `Nombre` debe tener menos de 20 caractres" },
                  })} />}
                  />
                  <Form.Input required label="Apellido Paterno" children={<input {...register("ap_paterno")} />} />
                  <Form.Input label="Apellido Materno" children={<input {...register("ap_materno", {
                    minLength: { value: 2, message: "El `Apellido Materno` debe tener por lo menos 2 caractres" },
                    maxLength: { value: 25, message: "El `Apellido Materno` debe tener menos de 25 caractres" },
                  }
                  )} />}
                  />
                </Form.Group>
                {errors.nombre && <Message size='tiny' error content={errors.nombre.message} />}
                {errors.ap_materno && <Message size='tiny' error content={errors.ap_materno.message} />}

                <Form.Input required fluid iconPosition='left' label="Correo" type='email' placeholder='Ingrese su correo'>
                  <Icon name='mail' inverted circular />
                  <input {...register("correo", {
                    minLength: { value: 4, message: "El `Correo` debe tener por lo menos 4 caractres" },
                    maxLength: { value: 50, message: "El `Correo` debe tener menos de 50 caractres" },
                    pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Correo no valido" }
                  })
                  } />
                </Form.Input>
                {errors.correo && <Message size='tiny' error content={errors.correo.message} />}

                <Form.Input required fluid iconPosition='left' type='password' label="Contraseña" placeholder='Ingrese su contraseña'>
                  <Icon name='key' inverted circular />
                  <input {...register("contrasena", {
                    minLength: { value: 4, message: "La `Contraseña` debe tener por lo menos 4 caractres" },
                    maxLength: { value: 25, message: "La `Contraseña` debe tener menos de 25 caractres" },
                    pattern: { value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{4,24}$/, message: "La contrasena debe tener por lo menos 1 caracter especial (?<>+=!@#$%&*()\"\'), una mayuscula y un numero" }
                  })
                  } />
                </Form.Input>
                {errors.contrasena && <Message size='tiny' error content={errors.contrasena.message} />}

                <Form.Input required fluid iconPosition='left' type='password' placeholder='Verifique su contraseña'>
                  <Icon name='key' inverted circular />
                  <input {...register("confir_contrasena", {
                    required: { value: true, message: "El campo `Verificar contrasena` es requerido" }
                  })
                  } />
                </Form.Input>
                {errors.confir_contrasena && <Message size='tiny' error content={errors.confir_contrasena.message} />}
                {noCoinicide && <Message size='tiny' error content="Las contraseñas no coinciden" />}

                <Button type='submit' icon='right arrow' labelPosition='right' fluid content="Registrarme" />
              </Form>
            </Grid.Row>
            <Grid.Row>
              <Segment style={{ margin: "0 10% 0 10%" }} basic textAlign='center'>
                <Link to="/InicioSesion">
                  <Header as='h4' content="¿Ya tienes una cuenta?" />
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
      {openVerificarCorreoModal && <VerificarCorreo />}
    </>
  )
}

export default PA3Registro


/*              <Modal
                centered={false}
                size='tiny'
                open={open}
                closeIcon
                onOpen={() => setOpen(true)}
                onClose={() => {
                  setOpen(false)
                  navigate('/InicioSesion',{ replace: true })
                }}
                header="Usuario registrado exitosamente!"
                content="El usuario ha sido registrado correctamente"
              />
              <Modal
                centered={false}
                size='tiny'
                open={error}
                closeIcon
                onClose={() => { setError(false) }}
                onOpen={() => setError(true)}
                header="Ocurrio un error al crear el Usuario"
                content="El correo ya ha sido usado anteriormente"
              /> */