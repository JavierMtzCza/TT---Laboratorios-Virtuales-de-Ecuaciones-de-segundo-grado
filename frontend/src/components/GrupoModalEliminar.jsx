import { Button, Modal } from 'semantic-ui-react'
import { useGrupoStore } from '../stores/UsuarioStore'
import { useNavigate } from 'react-router-dom'

const GrupoModalEliminar = ({ propShow, propSetShow }) => {

  const grupo = useGrupoStore(state => state.grupo) //estado global del grupo
  const setGrupo = useGrupoStore(state => state.setGrupo)
  const navigate = useNavigate(); //reac-couter-dom para navegar a otrs ruta

  const eliminarGrupo = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/grupo/${grupo.clave}`, { method: 'DELETE' }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          navigate('/Grupos')
          setGrupo({
            nombre: "",
            descripcion: "",
            clave: "",
          },)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Modal
      dimmer
      onClose={() => propSetShow(false)}
      onOpen={() => propSetShow(true)}
      open={propShow}
    >
      <Modal.Header content="¿Está de acuerdo con eliminar el grupo y todas las actividades de este?" />
      <Modal.Actions>
        <Button negative content="Cancelar" onClick={() => propSetShow(false)} />
        <Button positive content="Aceptar"
          onClick={() => {
            // propSetShow(false)
            eliminarGrupo()
          }} />
      </Modal.Actions>
    </Modal>
  )
}

export default GrupoModalEliminar