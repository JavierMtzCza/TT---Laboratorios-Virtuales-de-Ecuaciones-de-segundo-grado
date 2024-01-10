import { useForm } from "react-hook-form";
import { Button, Form, Message, Modal, Segment } from 'semantic-ui-react'
import { useGrupoStore } from "../stores/UsuarioStore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const GrupoModalModificar = ({ propShow, propSetShow }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [status, setStatus] = useState({ error: false, mensaje: "" })
  const [showPortal, setShowPortal] = useState(false)
  const navigate = useNavigate();
  const grupo = useGrupoStore(state => state.grupo) //estado global del grupo
  const setGrupo = useGrupoStore(state => state.setGrupo)

  const editarGrupo = (data) => {

    fetch(`${import.meta.env.VITE_URL_BACKEND}/grupo/${grupo.clave}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          setShowPortal(true)
          setStatus({ error: false, mensaje: "" })
          setGrupo({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ...grupo
          })
        }
      })
      .catch((error) => console.log(error))
  }


  const onSubmit = handleSubmit((formData) => {
    if (formData.nombre == "" && formData.descripcion == "") {
      setStatus({ error: true, mensaje: "No se puede modificar el grupo sino hay datos nuevos" })
    } else {
      const data = {
        nombre: formData.nombre == '' ? grupo.nombre : formData.nombre,
        descripcion: formData.descripcion == '' ? grupo.descripcion : formData.descripcion
      }
      editarGrupo(data)
    }
  })

  return (
    <>
      <Modal
        onClose={() => { 
          propSetShow(false)
          setStatus({ error: false, mensaje: "" })
          reset({ nombre: '', descripcion: '' })
         }}
        open={propShow}
        size='tiny'
      >
        <Modal.Header>Editar datos del Grupo</Modal.Header>
        <Modal.Content>
          <Form style={{ margin: "0 1% 15% 1%" }} error onSubmit={onSubmit}>
            <Form.Input fluid label="Nombre" placeholder="Nuevo nombre del grupo">
              <input {...register("nombre")} />
            </Form.Input>
            <Form.Input fluid label="Descripción" placeholder="Nueva descripcion del grupo">
              <input {...register("descripcion")} />
            </Form.Input>
            {status.error ? <Segment basic textAlign="center"><Message size="mini" error content={status.mensaje} /></Segment> : <></>}
            <Button type="submit" floated='right' content="Modificar Grupo" color='green' />
            <Button type="button" floated='left' content="Cancelar" color='red' onClick={() => {
              propSetShow(false)
              setStatus({ error: false, mensaje: "" })
              reset({ nombre: '', descripcion: '' })
            }} />
          </Form>
        </Modal.Content>
      </Modal>
      <Modal
        centered={false}
        size='tiny'
        content={<Message style={{ textAlign: "center", fontSize: "18px" }} positive header="Grupo editado con con éxito" />}
        open={showPortal}
        onClose={() => {
          propSetShow(false)
          setShowPortal(false)
          navigate('/Grupos')
        }}
      />
    </>
  )
}

export default GrupoModalModificar