import { useEffect, useState } from 'react'
import { Button, Card, Dropdown, Header, Icon, Image, Input, Menu } from 'semantic-ui-react'
import { Grupo } from '../components/Grupo'
import { useMediaQuery } from 'react-responsive'
import GrupoModalCreacion from "../components/GrupoModalCreacion";
import { useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore';
import logo from '../images/Logo.png'
import GrupoModalInscripcion from '../components/GrupoModalInscripcion';
import GrupoModalPerfil from '../components/GrupoModalPerfil';
import { useNavigate } from 'react-router-dom';

const PA5Grupos = () => {

  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ maxWidth: 1023, minWidth: 426 })
  const [data, setData] = useState([])    //Para la info que consultamos de los grupos del usuario
  const [showCrearGrupo, setShowCrearGrupo] = useState(false) //Para mostrar el modal de crear frupo
  const [showInscribir, setShowInscribir] = useState(false) //Para mostrar el modal de unirse a un grupo
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate();
  //Estado global
  const usuario = useUsuarioStore(state => state.usuario)
  const setUsuario = useUsuarioStore(state => state.setUsuario)
  const setGrupo = useGrupoStore(state => state.setGrupo)

  const obtenerGrupos = () => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/usuario/grupos/${usuario.perfil.correo}`)
      .then((response) => response.json()).then((data) => setData(data)).catch((error) => console.log(error))
  }

  const filtrarGrupos = (filtro) => {
    if (filtro == "")
      obtenerGrupos()
    else if (filtro.includes("/") || filtro.includes("\\"))
      obtenerGrupos()
    else
      fetch(`${import.meta.env.VITE_URL_BACKEND}/grupo/${usuario.token}/${filtro}`)
        .then((response) => response.json()).then((data) => setData(data)).catch((error) => console.log(error))
  }

  useEffect(() => {
    obtenerGrupos()
  }, [])

  return (
    <>
      <Menu secondary pointing widths={3} style={{ margin: "1% 0% 1% 0%" }}>
        <Menu.Item>
          <Image src={logo} size='mini' />
        </Menu.Item>
        <Menu.Item>
          <Button animated='vertical' color='teal' onClick={() => setShowInscribir(true)}>
            <Button.Content visible>Entrar a un grupo</Button.Content>
            <Button.Content hidden>
              <Icon name='plus' />
            </Button.Content>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Dropdown text={usuario.perfil.nombre} >
            <Dropdown.Menu>
              <Dropdown.Item text="Perfil" onClick={() => setShowProfile(true)} />
              <Dropdown.Item text="Cerrar Sesión" onClick={() => {
                setUsuario({ token: "", perfil: { id: 0, nombre: "", apellido_paterno: "", apellido_materno: "", correo: "" } })
                setGrupo({ id: 0, nombre: "", descripcion: "", clave: "" })
                navigate("/")
              }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
      <Menu stackable secondary style={{ margin: "3% 5% 3% 5%" }}>
        <Menu.Item>
          <Header as="h1">Grupos</Header>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button color='green' onClick={() => { setShowCrearGrupo(true) }} >Crear Grupo</Button>
          </Menu.Item>
          <Menu.Item  >
            <Input icon='search' transparent iconPosition='left' placeholder='Encontrar Grupo' onChange={(e) => {
              filtrarGrupos(e.target.value)
            }} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {
        <Card.Group style={{ margin: "1% 3% 0% 3%" }} itemsPerRow={isDesktop ? 4 : isTablet ? 2 : 1}>
          {data.map((grupo) => (<Grupo key={grupo.id} idGrupo={grupo.id} alumnos={4} nombreGrupo={grupo.nombre} descripcionGrupo={grupo.descripcion} claveGrupo={grupo.clave} />))}
        </Card.Group >
      }
      <GrupoModalCreacion propShow={showCrearGrupo} propSetShow={setShowCrearGrupo} actualizarGrupos={obtenerGrupos} />
      <GrupoModalInscripcion propOpen={showInscribir} propSetOpen={setShowInscribir} actualizarGrupos={obtenerGrupos} />
      <GrupoModalPerfil propSetShow={setShowProfile} propShow={showProfile} />
    </>
  )
}

export default PA5Grupos