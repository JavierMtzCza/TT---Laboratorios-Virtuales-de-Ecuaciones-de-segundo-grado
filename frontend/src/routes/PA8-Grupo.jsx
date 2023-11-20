import { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'
import GrupoNavBarProfe from "../components/GrupoNavBarProfe.jsx";
import GrupoMenuProfe from "../components/GrupoMenuProfe.jsx";
import GrupoMenuAlumno from '../components/GrupoMenuAlumno.jsx';
import GrupoNavBarAlumno from '../components/GrupoNavBarAlumno.jsx';
import GrupoCardActividad from "../components/GrupoCardActividad.jsx";
import { useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore.js';

const PA8Grupo = () => {

  const [activo, setActivo] = useState('Novedades')
  const [rol, setRol] = useState(1)// rol 1 es profesor, rol 2 es alumno
  // Estados globales
  const usuario = useUsuarioStore(state => state.usuario)
  const grupo = useGrupoStore(state => state.grupo)

  useEffect(() => {
    //AQUI CONSULTAMOS LAS ACTIVIDADES
    fetch(`http://localhost:3000/rol/${usuario.perfil.correo}/${grupo.clave}/`)
      .then((response) => response.json()).then((data) => setRol(data.rolId)).catch((error) => console.log(error))
  }, [])


  return (
    <>
      {rol == 1 ?
        <>
          <GrupoNavBarProfe stateActivo={activo} stateSetActivo={setActivo} />
          <GrupoMenuProfe nombre={grupo.nombre} descripcion={grupo.descripcion} clave={grupo.clave} />
        </>
        :
        <>
          <GrupoNavBarAlumno stateActivo={activo} stateSetActivo={setActivo} />
          <GrupoMenuAlumno/>
        </>
      }
      <Card.Group style={{ margin: "1% 15% 0% 15%" }} itemsPerRow={1}  >
        <GrupoCardActividad />
        <GrupoCardActividad />
        <GrupoCardActividad />
      </Card.Group >
    </>
  )
}

export default PA8Grupo