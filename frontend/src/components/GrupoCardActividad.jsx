import { Button, Card, Image, Modal } from 'semantic-ui-react'
import { useActividadStore, useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore'
import { useNavigate } from 'react-router-dom'
import Avatar from '../images/user_1144709.png'
import { useState } from 'react'
import Confirmacion from './Confirmacion'

const GrupoCardActividad = ({ id, nombre, descripcion, fechalimite, rol, tipo, refrescar }) => {

  const setActividad = useActividadStore(state => state.setActividad)
  const [actividadHecha, setActividadHecha] = useState({ show: false, calificacion: 0.0 })
  const [actividadEliminada, setActividadEliminada] = useState(false)
  const [confirmEliminar, setConfirmEliminar] = useState(false)
  const usuario = useUsuarioStore(state => state.usuario)
  const grupo = useGrupoStore(state => state.grupo)
  const navigate = useNavigate();

  const dataActividad = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/actividad/${id}/${usuario.perfil.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          if (data.Calificaciones.length == 0) {
            setActividad({
              id: data.id,
              nombre: data.nombre,
              descripcion: data.descripcion,
              fechaLimite: data.fechaLimite,
              tipo: data.tipo,
              PreguntaCuestionario: data.PreguntaCuestionario,
              PreguntaEjercicio: data.PreguntaEjercicio,
              prueba: false
            })
            if (data.tipo == "Cuestionario")
              navigate('/Formulario')
            else
              navigate('/ResolverActividad')
          } else {
            setActividadHecha({ show: true, calificacion: data.Calificaciones[0].calificacion })
          }
        }
      }).catch((error) => console.log(error))
  }

  const probarActividad = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/actividad/${id}/${usuario.perfil.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          setActividad({
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            fechaLimite: data.fechaLimite,
            tipo: data.tipo,
            PreguntaCuestionario: data.PreguntaCuestionario,
            PreguntaEjercicio: data.PreguntaEjercicio,
            prueba: true
          })
          if (data.tipo == "Cuestionario")
            navigate('/Formulario')
          else
            navigate('/ResolverActividad')
        }
      }).catch((error) => console.log(error))
  }

  const boton2 = () => {
    if (rol == 1) {
      navigate('/CalificacionActividad')
    } else {
      dataActividad(false)
    }
  }

  const eliminarActividad = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/${grupo.id}/actividad/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          setActividadEliminada(true)
        }
      }).catch((error) => console.log(error))
  }

  return (
    <>
      <Card>
        <Card.Content textAlign='center'>
          <Image floated='left' src={Avatar} avatar bordered />
          <Card.Header textAlign='left' content={nombre + ` (${tipo})`} />
          <Card.Description content={descripcion} />
          <Button onClick={probarActividad} style={{ borderRadius: "1rem", marginTop: "15px" }} color='teal' content="Probar" />
          <Button onClick={boton2} style={{ borderRadius: "1rem", marginTop: "15px" }} color={rol == 1 ? 'twitter' : 'yellow'} content={rol == 1 ? "Ver calificaciones" : "Resolver"} />
          {
            rol == 1 ?
              <Button onClick={() => { setConfirmEliminar(true) }} style={{ borderRadius: "1rem", marginTop: "15px" }} color='red' content="Eliminar" />
              :
              <></>
          }
        </Card.Content>
      </Card>
      <Modal
        centered={false}
        size='tiny'
        open={actividadHecha.show}
        closeIcon
        onClose={() => setActividadHecha({ show: false, calificacion: 0 })}
        onOpen={() => setActividadHecha({ show: true })}
        header={"Usted ya ha contestado esta actividad, su calificación es: " + actividadHecha.calificacion}
      />
      <Modal
        centered={false}
        size='tiny'
        open={actividadEliminada}
        closeIcon
        onClose={() => {
          setActividadEliminada(false)
          refrescar()
        }}
        header={"Actividad eliminada con éxito."}
      />
      <Confirmacion
        open={confirmEliminar}
        setOpen={setConfirmEliminar}
        funcion={eliminarActividad}
        textoPantalla="¿Está seguro de eliminar esta actividad? Una vez eliminada, no se podrá recuperar."
      />
    </>

  )
}

export default GrupoCardActividad