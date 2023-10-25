import React from 'react'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

const GrupoNavBarAlumno = ({stateActivo, stateSetActivo}) => {
  return (
    <Menu pointing secondary size='massive'>
      <Menu.Item>
        <Icon link name='arrow left' circular />
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