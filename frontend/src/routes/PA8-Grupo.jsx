import { useState } from 'react'
import { Card } from 'semantic-ui-react'
import GrupoNavBarProfe from "../components/GrupoNavBarProfe.jsx";
import GrupoMenuProfe from "../components/GrupoMenuProfe.jsx";
import GrupoMenuAlumno from '../components/GrupoMenuAlumno.jsx';
import GrupoNavBarAlumno from '../components/GrupoNavBarAlumno.jsx';
import GrupoCardActividad from "../components/GrupoCardActividad.jsx";

const PA8Grupo = () => {

  const [activo, setActivo] = useState('Novedades')

  return (
    <>
      <GrupoNavBarAlumno stateActivo={activo} stateSetActivo={setActivo} />
      <GrupoMenuProfe />
      <Card.Group style={{ margin: "1% 15% 0% 15%" }} itemsPerRow={1}  >
        <GrupoCardActividad />
        <GrupoCardActividad />
        <GrupoCardActividad />
      </Card.Group >
    </>
  )
}

export default PA8Grupo