import { Link } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

const GrupoNavBarProfe = ({ stateActivo, stateSetActivo }) => {
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
        <Dropdown item icon='cog' simple>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=> alert("Editar datos del grupo")}>Editar datos del grupo</Dropdown.Item>
            <Dropdown.Item onClick={()=> alert("Eliminar grupo")}>Eliminar Grupo</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default GrupoNavBarProfe