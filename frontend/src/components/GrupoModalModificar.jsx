import { useForm } from "react-hook-form";
import { Button, Form, Message, Modal } from 'semantic-ui-react'
import { useGrupoStore } from "../stores/UsuarioStore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const GrupoModalModificar = ({ propShow, propSetShow }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [correcto, setCorrecto] = useState({ modificado: false, deshabilitado: false })
  const navigate = useNavigate();
  const grupo = useGrupoStore(state => state.grupo) //estado global del grupo
  const setGrupo = useGrupoStore(state => state.setGrupo)

  const editarGrupo = (data) => {

    fetch(`http://localhost:3000/grupo/${grupo.clave}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          setCorrecto({ modificado: true, deshabilitado: true })
          setGrupo({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ...grupo
          })
          reset({nombre:'',descripcion:''})
        }
      })
      .catch((error) => console.log(error))
  }


  const onSubmit = handleSubmit((formData) => {
    if (formData.nombre == "" && formData.descripcion == "") {
      alert("no se puede modificar le grupo")
    } else {
      const data = {
        nombre: formData.nombre == '' ? grupo.nombre : formData.nombre,
        descripcion: formData.descripcion == '' ? grupo.descripcion : formData.descripcion
      }
      editarGrupo(data)
    }
  })

  return (
    <Modal
      onClose={() => {
        propSetShow(false)
        setCorrecto({ modificado: false, deshabilitado: false })
        navigate('/Grupo')
      }}
      closeIcon
      onOpen={() => propSetShow(true)}
      open={propShow}
      size='tiny'
    >
      <Modal.Header>Editar datos del Grupo</Modal.Header>
      <Modal.Content>
        <Form style={{ margin: "0 1% 15% 1%" }} error onSubmit={onSubmit}>
          <Form.Input disabled={correcto.deshabilitado} fluid label="Nombre" placeholder="Nuevo nombre del grupo">
            <input {...register("nombre")} />
          </Form.Input>
          <Form.Input disabled={correcto.deshabilitado} fluid label="Descripción" placeholder="Nueva descripcion del grupo">
            <input {...register("descripcion")} />
          </Form.Input>
          {correcto.modificado ? <Message positive header="Grupo Modificado Correctamente" /> : <></>}
          <Button type="submit" disabled={correcto.deshabilitado} floated='right' content="Modificar Grupo" color='green' />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default GrupoModalModificar