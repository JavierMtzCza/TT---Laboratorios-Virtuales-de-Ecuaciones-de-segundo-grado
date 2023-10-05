import { useState } from 'react'
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function HamIcon() {
    return (<i className=" bars icon" />)
}

function CloseIcon() {
    return (<i className="close red icon" />)
}

const NavbarMb = ({ imagen }) => {

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
                        <Button size='medium' basic color='olive' content='Registrarse' />
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
        </>
    )
}

export default NavbarMb