import { Button, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../estiloscss/pdf.css";
import { useUsuarioStore } from '../stores/UsuarioStore';


const NavbarLg = ({ imagen }) => {
  const openPdfInNewTab = (tipo) => {
    const pdfUrl =
      tipo === "Documentacion"
        ? "/src/images/ManualdeUsuarioTT2023-B120.pdf"
        : " ";
    window.open(pdfUrl, '_blank');
  }

  const usuario = useUsuarioStore(state => state.usuario)

  return (
    <Menu secondary>
      <Menu.Item name='logo'>
        <img src={imagen} alt="ChicharroneraLab" />
      </Menu.Item>

      <Menu.Menu position='right'>

        <Menu.Item name='Ayuda' >
          <Link className='link' to={"/Ayuda"}>Ayuda </Link>
        </Menu.Item>

        <Menu.Item
          name='Documentacion'
          onClick={() => openPdfInNewTab("Documentacion")}
        >
          Documentacion
        </Menu.Item>

        <Menu.Item name='Aviso de Privacidad'>
          <Link className='link' to={"/Aviso"}>Aviso de Privacidad</Link>
        </Menu.Item>

        <Menu.Item name='Condiciones'>
          <Link className='link' to={"/Condiciones"}>Terminos y Condiciones</Link>
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
      </Menu.Menu >
    </Menu >
  )
}

export default NavbarLg;
