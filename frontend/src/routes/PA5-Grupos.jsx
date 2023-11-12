import { useEffect, useState } from 'react'
import { Button, Card, Dropdown, Header, Icon, Input, Menu } from 'semantic-ui-react'
import { Grupo } from '../components/Grupo'
import { useMediaQuery } from 'react-responsive'
import GrupoModalCreacion, { } from "../components/GrupoModalCreacion";
import { useUsuarioStore } from '../stores/UsuarioStore';

const PA5Grupos = () => {


  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ maxWidth: 1023, minWidth: 426 })
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  //Estado global
  const usuario = useUsuarioStore(state => state.usuario)

  const obtenerGrupos = () => {
    fetch(`http://localhost:3000/usuario/grupos/${usuario.perfil.correo}`)
      .then((response) => response.json()).then((data) => setData(data)).catch((error) => console.log(error))
  }

  useEffect(() => {
    obtenerGrupos()
  }, [])

  const trigger = (
    <span>
      <Icon name='user' /> Bienvenido, {usuario.perfil.nombre}
    </span>
  )

  const options = [
    { key: 'Perfil', text: 'Perfil' },
    { key: 'Logout', text: 'Cerrar sesión' },
  ]


  return (
    <>
      <Menu stackable secondary widths={3} style={{ margin: "1% 0% 1% 0%" }}>
        <Menu.Item name='icono' />
        <Menu.Item>
          <Input action={{ icon: 'search' }} placeholder='Buscar' />
        </Menu.Item>
        <Menu.Item>
          <Dropdown trigger={trigger} options={options} />
        </Menu.Item>
      </Menu>
      <Menu stackable secondary style={{ margin: "3% 5% 3% 5%" }}>
        <Menu.Item>
          <Header as="h1">Grupos</Header>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button color='green' onClick={() => { setShow(true) }} >Crear Grupo</Button>
          </Menu.Item>
          <Menu.Item  >
            <Input icon='search' transparent iconPosition='left' placeholder='Encontrar Grupo' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {
        <Card.Group style={{ margin: "1% 3% 0% 3%" }} itemsPerRow={isDesktop ? 4 : isTablet ? 2 : 1}>
          {data.map((grupo) => (<Grupo key={grupo.id} alumnos={4} nombreGrupo={grupo.nombre} descripcionGrupo={grupo.descripcion} claveGrupo={grupo.clave} />))}
        </Card.Group >
      }
      <GrupoModalCreacion propShow={show} propSetShow={setShow} actualizarGrupos={obtenerGrupos} />
    </>
  )
}

export default PA5Grupos