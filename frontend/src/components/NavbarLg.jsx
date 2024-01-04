import { Button, Icon, Menu, Modal, } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PdfViewer from './pdfviewer';
import React, { useState } from 'react';
import "../estiloscss/pdf.css";


const NavbarLg = ({ imagen }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [tipo, setTipo] = useState('Ayuda')

  const openPdfModal = () => {
    setModalOpen(true);
  };

  const closePdfModal = () => {
    setModalOpen(false);
  };

  return (
    <Menu secondary>
      <Menu.Item name='logo'>
        <img src={imagen} alt="ChicharroneraLab" />
      </Menu.Item>

      <Menu.Menu position='right'>
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

        <Menu.Item name='Aviso de Privacidad'>
          <Link to={"/Aviso"}>Aviso de Privacidad</Link>
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
      </Menu.Menu >

      {/* Modal para visualizar PDF */}
      <Modal open={modalOpen} onClose={closePdfModal} size='fullscreen' >
        <Modal.Header>Manual de Usuario</Modal.Header>
        <Modal.Content>
          <PdfViewer ruta={
            //tipo == "Documentacion" ? "/src/images/TT22023-B120.pdf" : 
            "./src/images/ManualDeUsuario.pdf"
            } />
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closePdfModal}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal >

    </Menu >
  )
}

export default NavbarLg
