import { useState } from 'react'
import { Button, Icon, Menu, Modal, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PdfViewer from './pdfviewer'

function HamIcon() {
  return (<i className=" bars icon" />)
}

function CloseIcon() {
  return (<i className="close red icon" />)
}

const NavbarMb = ({ imagen }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [tipo, setTipo] = useState('Ayuda')
  const [visible, setVisible] = useState(false)
  const [icon, setIcon] = useState(HamIcon)

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

  const openPdfModal = () => {
    setModalOpen(true);
  };

  const closePdfModal = () => {
    setModalOpen(false);
  };

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
        <Menu.Item name='Ayuda' onClick={() => {
          setTipo("Ayuda")
          openPdfModal()
        }
        }>
          Ayuda
        </Menu.Item>
        <Menu.Item name='Documentacion' onClick={() => {
          setTipo("Documentacion")
          openPdfModal()
        }
        }>
          Documentacion
        </Menu.Item>
        <Menu.Item name='Aviso'>
          <Link to={"/Aviso"}>Aviso </Link>
        </Menu.Item>
        
        <Menu.Item name='Condiciones'>
          <Link to={"/Condiciones"}>Terminos y Condiciones</Link>
        </Menu.Item>

        {/* <Menu.Item name='Grafcar'>
          <Link to={"/Graficar"}>
            <Button size='medium' color='green' content="Graficar" />
          </Link>
        </Menu.Item> */}
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
      </Sidebar>
      <Modal open={modalOpen} onClose={closePdfModal} >
        <Modal.Header>Manual de Usuario</Modal.Header>
        <Modal.Content>
          <PdfViewer ruta={tipo == "Documentacion" ? "/src/images/TT22023-B120.pdf" : "/src/images/ManualDeUsuario.pdf"} />Z
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closePdfModal}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal >

    </>
  )
}

export default NavbarMb