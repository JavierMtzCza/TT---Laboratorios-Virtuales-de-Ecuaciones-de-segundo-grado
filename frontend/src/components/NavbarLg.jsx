import { Button, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useUsuarioStore } from '../stores/UsuarioStore';

const NavbarLg = ({ imagen }) => {

  const DescargarPDF = () => {
    const pdfUrl = "./src/images/Manual.pdf";
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'ManualdeUsuario.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

        <Menu.Item name='Documentacion'>
          <Link onClick={DescargarPDF}>Documentación </Link>
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
