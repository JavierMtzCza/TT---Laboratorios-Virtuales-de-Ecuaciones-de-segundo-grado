import { useEffect, useState } from 'react'
import { useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore.js';
import { Card } from 'semantic-ui-react'
import GrupoNavBarProfe from "../components/GrupoNavBarProfe.jsx";
import GrupoMenuProfe from "../components/GrupoMenuProfe.jsx";
import GrupoMenuAlumno from '../components/GrupoMenuAlumno.jsx';
import GrupoNavBarAlumno from '../components/GrupoNavBarAlumno.jsx';
import GrupoCardActividad from "../components/GrupoCardActividad.jsx";
import Confirmacion from '../components/Confirmacion.jsx';
import CalificacionesGrupales from '../components/CalificacionesGrupales.jsx';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const PA8Grupo = () => {

  const [salirGrupo, setSalirGrupo] = useState(false)
  const [activo, setActivo] = useState('Novedades')
  const [actividades, setActividades] = useState([])
  const [rol, setRol] = useState(1)// rol 1 es profesor, rol 2 es alumno
  // Estados globales
  const usuario = useUsuarioStore(state => state.usuario)
  const grupo = useGrupoStore(state => state.grupo)
  const navigate = useNavigate();

  const isDesktopOrTablet = useMediaQuery({ query: "(min-width:768px)" })

  const obtenerActividades = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/${grupo.id}/actividades`)
      .then((response) => response.json()).then((data) => setActividades(data)).catch((error) => console.log(error))
  }

  useEffect(() => {
    //Consultamos el Rol del usuario
    fetch(`${import.meta.env.VITE_URL_BACKEND}/rol/${usuario.perfil.correo}/${grupo.clave}/`)
      .then((response) => response.json()).then((data) => setRol(data.rolId)).catch((error) => console.log(error))

    obtenerActividades()
  }, [])

  const salirDeGrupo = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/grupo/${grupo.clave}/${usuario.token}`, { method: 'DELETE' }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          navigate("/Grupos")
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
        activo == 'Calificaciones'
          ?
          <CalificacionesGrupales />
          :
          <Card.Group style={{ margin: "1% 15% 0% 15%" }} itemsPerRow={isDesktopOrTablet ? 2 : 1} >
            {actividades.map((actividad) => (<GrupoCardActividad key={actividad.id} id={actividad.id} descripcion={actividad.descripcion} nombre={actividad.nombre} tipo={actividad.tipo} fechalimite={actividad.fechalimite} rol={rol} refrescar={obtenerActividades}  />))}
          </Card.Group >
      }
      <Confirmacion open={salirGrupo} setOpen={setSalirGrupo} textoPantalla="Esta seguro de salir de este grupo" funcion={salirDeGrupo} />
    </>
  )
}

export default PA8Grupo