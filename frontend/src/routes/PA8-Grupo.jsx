import { useEffect, useState } from 'react'
import { useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore.js';
import { Card } from 'semantic-ui-react'
import GrupoNavBarProfe from "../components/GrupoNavBarProfe.jsx";
import GrupoMenuProfe from "../components/GrupoMenuProfe.jsx";
import GrupoMenuAlumno from '../components/GrupoMenuAlumno.jsx';
import GrupoNavBarAlumno from '../components/GrupoNavBarAlumno.jsx';
import GrupoCardActividad from "../components/GrupoCardActividad.jsx";
import Confirmacion from '../components/Confirmacion.jsx';

const PA8Grupo = () => {

  const [salirGrupo, setSalirGrupo] = useState(false)
  const [activo, setActivo] = useState('Novedades')
  const [actividades, setActividades] = useState([])
  const [rol, setRol] = useState(1)// rol 1 es profesor, rol 2 es alumno
  // Estados globales
  const usuario = useUsuarioStore(state => state.usuario)
  const grupo = useGrupoStore(state => state.grupo)

  const obtenerActividades = () => {
    fetch(`http://localhost:3000/actividad/${grupo.id}/actividades`)
      .then((response) => response.json()).then((data) => setActividades(data)).catch((error) => console.log(error))
  }

  useEffect(() => {
    //Consultamos el Rol del usuario
    fetch(`http://localhost:3000/rol/${usuario.perfil.correo}/${grupo.clave}/`)
      .then((response) => response.json()).then((data) => setRol(data.rolId)).catch((error) => console.log(error))

    obtenerActividades()
  }, [])

  const funcion = () => {
    fetch(`http://localhost:3000/grupo/${grupo.clave}/${usuario.token}`, { method: 'DELETE' }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          console.log("Cambios realizados")
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      {rol == 1 ?
        <>
          <GrupoNavBarProfe stateActivo={activo} stateSetActivo={setActivo} />
          <GrupoMenuProfe nombre={grupo.nombre} descripcion={grupo.descripcion} clave={grupo.clave} />
        </>
        :
        <>
          <GrupoNavBarAlumno stateActivo={activo} stateSetActivo={setActivo} setSalirGrupo={setSalirGrupo} />
          <GrupoMenuAlumno nombre={grupo.nombre} descripcion={grupo.descripcion} />
        </>
      }
      {
        <Card.Group style={{ margin: "1% 15% 0% 15%" }} itemsPerRow={2} >
          {actividades.map((actividad) => (<GrupoCardActividad key={actividad.id} id={actividad.id} descripcion={actividad.descripcion} nombre={actividad.nombre} tipo={actividad.tipo} fechalimite={actividad.fechalimite} />))}
        </Card.Group >
      }
      <Confirmacion open={salirGrupo} setOpen={setSalirGrupo} textoPantalla="Esta seguro de salir de este grupo" funcion={funcion} />
    </>
  )
}

export default PA8Grupo