import { useForm } from "react-hook-form";
import { Button, Form, Modal } from 'semantic-ui-react'
import { useGrupoStore } from "../stores/UsuarioStore";

const GrupoModalModificar = ({ propShow, propSetShow }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const grupo = useGrupoStore(state => state.grupo) //estado global del grupo
  const setGrupo = useGrupoStore(state => state.setGrupo)

  const editarGrupo = (formData) => {
    fetch(`http://localhost:3000/grupo/${grupo.clave}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: formData.nombre,
        descripcion: formData.descripcion
      })
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          console.log(data)
        }
      })
      .catch((error) => console.log(error))
  }


  const onSubmit = handleSubmit((formData) => {
    editarGrupo(formData)
  })

  return (
    <Modal
      onClose={() => propSetShow(false)}
      onOpen={() => propSetShow(true)}
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
          <Button floated='left' content="Cancelar" color='red' onClick={() => propSetShow(false)} />
          <Button floated='right' content="Modificar Grupo" color='green' type='submit' />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default GrupoModalModificar