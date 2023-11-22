import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const GrupoNavBarAlumno = ({ stateActivo, stateSetActivo }) => {
  return (
    <Menu pointing secondary size='massive'>
      <Menu.Item>
        <Link to="/Grupos">
          <Icon link name='arrow left' circular />
        </Link>
      </Menu.Item>
      <Menu.Item position='right'
        name='Novedades'
        active={stateActivo === 'Novedades'}
        onClick={() => { stateSetActivo('Novedades') }}
      />
      <Menu.Item
        name='Ejercicios'
        active={stateActivo === 'Ejercicios'}
        onClick={() => { stateSetActivo('Ejercicios') }}
      />
      <Menu.Menu position='right'>
        <Dropdown item icon='wrench' simple>
          <Dropdown.Menu>
            <Dropdown.Item>Salir de grupo</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default GrupoNavBarAlumno