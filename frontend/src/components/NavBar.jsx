import { Button, Header, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
   return (
      <>
         <Menu secondary>
            <Menu.Item>
               <Header as='h2' image={props.image} subheader="JDJDJDJDJD" />
            </Menu.Item>
            <Menu.Menu position='right'>
               <Menu.Item name='Ayuda' >
                  <Link to={"/"}>Ayuda</Link>
               </Menu.Item>

               <Menu.Item name='JuegoMemo'>
                  <Link to={"/GamesMemo"}>
                     <Button size='medium' color='blue'>
                        Memorama
                     </Button>
                  </Link>
               </Menu.Item>

               <Menu.Item name='Grafcar'>
                  <Link to={"/Graficar"}>
                     <Button size='medium' color='green'>
                        Graficar
                     </Button>
                  </Link>
               </Menu.Item>

               <Menu.Item name='Documentacion'>
                  Documentacion
               </Menu.Item>

               <Menu.Item name='Registrarme' >
                  <Link to={"/SingUp"}>
                     <Button size='medium' basic color='black'>
                        Registrarse
                     </Button>
                  </Link>
               </Menu.Item>

               <Menu.Item name='Logearme'>
                  <Link to={"/SingIn"}>
                     <Button animated size='medium' color='black'>
                        <Button.Content visible>Iniciar Sesion</Button.Content>
                        <Button.Content hidden>
                           <Icon name='arrow right' />
                        </Button.Content>
                     </Button>
                  </Link>
               </Menu.Item
               >
            </Menu.Menu>
         </Menu >
      </>
   )
}

export default NavBar