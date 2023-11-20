import { Icon, Input, Message, Modal } from 'semantic-ui-react'
import { useUsuarioStore } from '../stores/UsuarioStore'
import { useRef, useState } from 'react'

const GrupoModalInscripcion = ({ propOpen, propSetOpen, actualizarGrupos }) => {

  const usuario = useUsuarioStore(state => state.usuario)
  const [status, setStatus] = useState({ estado: false, mensaje: "" })
  const [mensaje, setMensaje] = useState(false)
  const claveGrupo = useRef("")

  const inscribir = () => {
    fetch('http://localhost:3000/grupo/inscripcion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        claveGrupo: claveGrupo.current,
        token: usuario.token
      }),
    }).then((response) => response.json()).then((data) => {
      if (data.error) {
        setMensaje(true)
        setStatus({ estado: false, mensaje: data.error })
      } else {
        setMensaje(true)
        setStatus({ estado: true, mensaje: "Se ha inscrito el grupo correctamente" })
        actualizarGrupos()
      }

    })
      .catch((error) => console.log(error))
  }

  return (
    <Modal
      dimmer
      closeIcon
      centered={false}
      size='tiny'
      onClose={() => {
        setStatus({ estado: false, mensaje: "" })
        setMensaje(false)
        propSetOpen(false)
      }}
      onOpen={() => propSetOpen(true)}
      open={propOpen}
    >
      <Modal.Header content="Unirse a un grupos por codigo de acceso" />
      <Modal.Content>
        {
          mensaje ?
            <Message positive={status.estado ? true : false} negative={status.estado ? false : true}>
              <Message.Header>{status.mensaje}</Message.Header>
            </Message>
            :
            <Input
              fluid
              icon={<Icon name='search' inverted circular link color='teal' onClick={() => inscribir()} />}
              placeholder='Codigo de acceso...'
              onChange={(e) => claveGrupo.current = e.target.value}
            />
        }

      </Modal.Content>
    </Modal>
  )
}

export default GrupoModalInscripcion