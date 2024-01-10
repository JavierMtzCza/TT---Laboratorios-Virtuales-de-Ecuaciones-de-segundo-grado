import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react"
import { useUsuarioStore } from "../stores/UsuarioStore"

const GrupoModalPerfil = ({ propShow, propSetShow }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [showPortal, setShowPortal] = useState(false)
  const [noCoinicide, setNoCoinicide] = useState(false)   //Se usa para saber si las contrsenas coinciden
  const [noPass, setNoPass] = useState(false)             //Se usa para saber si el usuario puso la contrasena actual
  //Datos del usaurio
  const usuario = useUsuarioStore(state => state.usuario)
  const setUsuario = useUsuarioStore(state => state.setUsuario)


  const actualizarDatos = (dataUsuario) => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/usuario/${usuario.token}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: dataUsuario.nombre,
        apellido_paterno: dataUsuario.ap_paterno,
        apellido_materno: dataUsuario.ap_materno,
        contrasenaNueva: dataUsuario.contrasena,
        contrasenaActual: dataUsuario.contra_actual
      })
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          setUsuario(data)
          setShowPortal(true)
        }
      })
      .catch((error) => console.log(error))
  }



  const onSubmit = handleSubmit((formData) => {

    const { nombre, ap_paterno, ap_materno, correo, contrasena, confir_contrasena, contra_actual } = formData
    if (nombre == "" && ap_paterno == "" && ap_materno == "" && correo == "" && contrasena == "" && confir_contrasena == "") {
      alert("No hay modificaiones que hacer")
    } else if (contra_actual == "") {
      setNoPass(true)
    } else if (contrasena != confir_contrasena) {
      setNoCoinicide(true)
    } else {
      actualizarDatos(formData)
      setNoPass(false)
      setNoCoinicide(false)
      reset({
        ap_materno: "",
        ap_paterno: "",
        confir_contrasena: "",
        contra_actual: "",
        contrasena: "",
        nombre: "",
      })
    }
  })

  const closeModal = () => {
    reset({ nombre: "", ap_paterno: "", ap_materno: "", correo: "", contrasena: "", confir_contrasena: "", contra_actual: "" })
    setNoPass(false)
    setNoCoinicide(false)
    propSetShow(false)
  }

  return (
    <>
      <Modal
        closeIcon
        dimmer="blurring"
        onClose={closeModal}
        onOpen={() => propSetShow(true)}
        open={propShow}
      >
        <Modal.Header>Datos del usuario</Modal.Header>
        <Modal.Content>
          <Form error onSubmit={onSubmit} >
            <Form.Group widths='equal'>
              <Form.Input placeholder={usuario.perfil.nombre} label="Nombre" children={<input {...register("nombre", {
                minLength: { value: 2, message: "El `Nombre` debe tener por lo menos 2 caractres" },
                maxLength: { value: 20, message: "El `Nombre` debe tener menos de 20 caractres" },
              })} />}
              />
              <Form.Input placeholder={usuario.perfil.apellido_paterno} label="Apellido Paterno" children={<input {...register("ap_paterno", {
                minLength: { value: 2, message: "El `Apellido Paterno` debe tener por lo menos 2 caractres" },
                maxLength: { value: 25, message: "El `Apellido Paterno` debe tener menos de 25 caractres" },
              })} />} />
              <Form.Input placeholder={usuario.perfil.apellido_materno} label="Apellido Materno" children={<input {...register("ap_materno")} />} />
            </Form.Group>
            {errors.nombre && <Message size='tiny' error content={errors.nombre.message} />}
            {errors.ap_materno && <Message size='tiny' error content={errors.ap_materno.message} />}

            <Form.Input iconPosition='left' type='password' label="Cambiar contraseña" placeholder='Ingrese su nueva contraseña'>
              <Icon name='user secret' inverted circular />
              <input {...register("contrasena", {
                minLength: { value: 4, message: "La `Contrasena` debe tener por lo menos 4 caractres" },
                maxLength: { value: 25, message: "La `Contrasena` debe tener menos de 25 caractres" },
                pattern: { value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{4,24}$/, message: "La contrasena debe tener por lo menos 1 caracter especial (?<>+=!@#$%&*()\"\'), una mayuscula y un numero" }
              })
              } />
            </Form.Input>
            {errors.contrasena && <Message size='tiny' error content={errors.contrasena.message} />}

            <Form.Input iconPosition='left' type='password' placeholder='Verifique su nueva contraseña'>
              <Icon name='user secret' inverted circular />
              <input {...register("confir_contrasena")} />
            </Form.Input>
            <Form.Input iconPosition='left' type='password' label="Contraseña actual" placeholder='Escriba su contraseña actual para aplicar guardar los cambios'>
              <Icon name='key' inverted circular />
              <input {...register("contra_actual")} />
            </Form.Input>
            {errors.confir_contrasena && <Message size='tiny' error content={errors.confir_contrasena.message} />}
            {noCoinicide && <Message size='tiny' error content="Las contraseñas no coinciden" />}
            {noPass && <Message size='tiny' error content="Debe escribir su contraseña actual para cualquier cambio" />}

            <Button type='submit' icon='right arrow' labelPosition='right' content="Editar mis datos" />
          </Form>
        </Modal.Content>
      </Modal>
      <Modal
        centered={false}
        size='tiny'
        content={<Message style={{ textAlign: "center", fontSize: "18px" }} positive header="Datos modificados con éxito" />}
        open={showPortal}
        onClose={() => {
          propSetShow(false)
          setShowPortal(false)
        }}
      />
    </>
  )
}

export default GrupoModalPerfil