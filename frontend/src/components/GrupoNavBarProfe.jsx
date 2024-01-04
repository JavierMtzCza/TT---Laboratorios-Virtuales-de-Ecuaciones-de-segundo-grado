import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import GrupoModalEliminar from './GrupoModalEliminar'
import GrupoModalModificar from './GrupoModalModificar'


const GrupoNavBarProfe = ({ stateActivo, stateSetActivo }) => {

  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  return (
    <>
      <Menu pointing secondary size='massive'>
        <Menu.Item>
          <Link to="/Grupos">
            <Icon link size='small' name='arrow left' circular />
          </Link>
        </Menu.Item>
        <Menu.Item position='right'
          name='Novedades'
          active={stateActivo === 'Novedades'}
          onClick={() => { stateSetActivo('Novedades') }}
        />
        <Menu.Item
          name='Calificaciones'
          active={stateActivo === 'Calificaciones'}
          onClick={() => { stateSetActivo('Calificaciones') }}
        />
        <Menu.Menu position='right'>
          <Dropdown item icon='cog' simple>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShow2(true)}>Editar datos del grupo</Dropdown.Item>
              <Dropdown.Item onClick={() => setShow(true)}>Eliminar Grupo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <GrupoModalEliminar propShow={show} propSetShow={setShow} />
      <GrupoModalModificar propShow={show2} propSetShow={setShow2} />
    </>
  )
}

export default GrupoNavBarProfe