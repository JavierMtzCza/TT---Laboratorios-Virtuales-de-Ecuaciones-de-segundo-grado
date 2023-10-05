import { Button, Icon, Menu} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NavbarLg = ({imagen}) => {

    return (
        <Menu secondary>
            <Menu.Item name='logo'>
                <img src={imagen} alt="" />
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item name='Ayuda'>
                    <Link to={"/"}>Ayuda</Link>
                </Menu.Item>
                <Menu.Item name='JuegoMemo'>
                    <Link to={"/GamesMemo"}>
                        <Button size='medium' color='blue' content="Memorama" />
                    </Link>
                </Menu.Item>

                <Menu.Item name='Grafcar'>
                    <Link to={"/Graficar"}>
                        <Button size='medium' color='green' content="Graficar" />
                    </Link>
                </Menu.Item>
                <Menu.Item name='Documentacion'>
                    Documentacion
                </Menu.Item>
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
            </Menu.Menu>
        </Menu>
    )
}

export default NavbarLg
