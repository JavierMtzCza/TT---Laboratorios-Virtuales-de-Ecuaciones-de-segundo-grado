import { useEffect, useState } from 'react'
import { Button, Card, Dropdown, Input, Menu } from 'semantic-ui-react'
import { Grupo } from '../components/Grupo'
import { useMediaQuery } from 'react-responsive'

const PA5Grupos = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/usuario/grupo/4@gmail.com`)
      .then((response) => response.json()).then((data) => setData(data)).catch((error) => console.log(error))
  }, [])

  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ maxWidth: 1023, minWidth: 426 })


  return (
    <>
      <Menu stackable secondary widths={3} style={{ margin: "1% 0% 1% 0%" }}>
        <Menu.Item name='icono' />
        <Menu.Item>
          <Input className='icon' action={{ icon: 'search', content: 'buscar' }} placeholder='Buscar un grupo por codigo' />
        </Menu.Item>
        <Menu.Item>
          <Dropdown text='Nombre de usuario' as={Button} color='yellow' icon='user circle' button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Item icon='settings' text='Modificar perfil' />
              <Dropdown.Item icon='log out' text='Cerrar sesion' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
      <Menu stackable secondary style={{ margin: "3% 5% 3% 5%" }}>
        <Menu.Item >
          <Input className='icon' action={{ icon: 'search', content: 'buscar' }} placeholder='Buscar grupo' />
        </Menu.Item>
        <Menu.Item>
          <Button color='green'>Crear Grupo</Button>
        </Menu.Item>
      </Menu>
      {
        <Card.Group style={{ margin: "1% 3% 0% 3%" }} itemsPerRow={isDesktop ? 4 : isTablet ? 2 : 1}>
          {data.map((grupo) => (<Grupo key={grupo.id} alumnos={4} nombre={grupo.nombre} descripcion={grupo.descripcion} />))}
        </Card.Group >
      }

    </>
  )
}

export default PA5Grupos