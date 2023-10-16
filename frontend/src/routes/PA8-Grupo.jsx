import { useState } from 'react'
import NavBarActividad from "../components/NavBarActividad.jsx";
import Card from 'semantic-ui-react'
import Actividad from "../components/Actividad.jsx";
import GrupoMenu from "../components/GrupoMenu.jsx";

const PA8Grupo = () => {

  const [activo, setActivo] = useState('Novedades')

  return (
    <>
      <NavBarActividad stateActivo={activo} stateSetActivo={setActivo} />
      <GrupoMenu />
      <Card.Group style={{ margin: "1% 15% 0% 15%" }} itemsPerRow={1}  >
        <Actividad />
        <Actividad />
        <Actividad />
      </Card.Group >
    </>
  )
}

export default PA8Grupo