import { Confirm } from 'semantic-ui-react'

const Confirmacion = ({ textoPantalla, textoCancel, textoAcept, open, setOpen, funcion }) => {
  return (
    <Confirm
      content={textoPantalla}
      size='mini'
      open={open}
      onCancel={() => setOpen(false)}
      onConfirm={() => funcion()}
      cancelButton={textoCancel == "" ? "Cancelar" : textoCancel}
      confirmButton={textoAcept == "" ? "Aceptar" : textoAcept}
    />
  )
}

export default Confirmacion