import { Button, Embed, Image, Modal } from "semantic-ui-react"


const ModalEjercicio = ({ mostrar, setmostrar, imagen }) => {
  return (
    <Modal
      onClose={() => setmostrar(false)}
      onOpen={() => setmostrar(true)}
      open={mostrar}
      size='tiny'
    >
      <Modal.Content >
        <Image size='big' src={imagen} wrapped />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setmostrar(false)} negative>Cerrar</Button>
        <Button onClick={() => setmostrar(false)} positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalEjercicio