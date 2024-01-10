import { useState } from 'react'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import doc from "../images/Manual.pdf"
import { useUsuarioStore } from '../stores/UsuarioStore'

function HamIcon() {
  return (<i className=" bars icon" />)
}

function CloseIcon() {
  return (<i className="close red icon" />)
}

const NavbarMb = ({ imagen }) => {

  const [visible, setVisible] = useState(false)
  const usuario = useUsuarioStore(state => state.usuario)
  const [icon, setIcon] = useState(HamIcon)

  const DescargarPDF = () => {
    const pdfUrl = { doc };
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Manual.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const hideSidebar = () => {
    setIcon(HamIcon)
    setVisible(false)
  }
  const showSidebar = () => {
    setIcon(CloseIcon)
    setVisible(true)
  }
  const toggleSidebar = () => {
    visible ? hideSidebar() : showSidebar()
  }

  return (
    <>
      <Menu secondary>
        <Menu.Item>
          <img src={imagen} width="35px" height="35px" alt="" />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item onClick={toggleSidebar}>
            {icon}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Sidebar as={Menu} animation='overlay' vertical visible={visible} icon='labeled'>
        <Menu.Item>
          <img src={imagen} width="35px" height="35px" style={{ margin: "0 auto" }} alt="" />
        </Menu.Item>
        <Menu.Item name='Ayuda' >
          <Link className='link' to={"/Ayuda"}>Ayuda </Link>
        </Menu.Item>
        <Menu.Item name='Documentacion'>
          <Link onClick={DescargarPDF}>Documentación </Link>
        </Menu.Item>
        <Menu.Item name='Aviso de Privacidad'>
          <Link to={"/Aviso"}>Aviso de Privacidad</Link>
        </Menu.Item>
        <Menu.Item name='Condiciones'>
          <Link to={"/Condiciones"}>Terminos y Condiciones</Link>
        </Menu.Item>
        {
          (usuario.token == "") ?
            <>
              <Menu.Item name='Registrarme'>
                <Link to={"/Registro"}>
                  <Button size='medium' basic color='black' content='Registrarse' />
                </Link>
              </Menu.Item>
              <Menu.Item name='login'>
                <Link to={"/InicioSesion"}>
                  <Button animated size='medium' color='black'>
                    <Button.Content visible>Iniciar Sesion</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                </Link>
              </Menu.Item>
            </>
            :
            <Menu.Item name='Grupos'>
              <Link to={"/Grupos"}>
                <Button size='medium' color='twitter' content='Mis grupos' />
              </Link>
            </Menu.Item>
        }
      </Sidebar>
    </>
  )
}

export default NavbarMb