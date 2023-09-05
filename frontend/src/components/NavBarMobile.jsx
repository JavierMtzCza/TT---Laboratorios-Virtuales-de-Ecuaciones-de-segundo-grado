import { useState } from 'react'
import { Button, Header, Menu, Sidebar, Icon, Segment } from 'semantic-ui-react'

const NavBarMobile = (props) => {

   const [visible, setVisible] =useState(false)

   return (
      <>
         <Menu secondary>
            <Menu.Item>
               <Header as='h2' image={props.image} subheader="JDJDJDJDJD" />
            </Menu.Item>
            <Menu.Menu position='right'>
               <Menu.Item>
                  <Button icon="bars" size='large' onClick={() => setVisible(true)} />
               </Menu.Item>
            </Menu.Menu>
         </Menu >

         <Sidebar.Pushable as={Segment}>
            <Sidebar
               as={Menu}
               animation='overlay'
               icon='labeled'
               inverted
               onHide={() => setVisible(false)}
               vertical
               visible={visible}
               width='thin'
            >
               <Menu.Item as='a'>
                  <Icon name='home' />
                  Home
               </Menu.Item>
               <Menu.Item as='a'>
                  <Icon name='gamepad' />
                  Games
               </Menu.Item>
               <Menu.Item as='a'>
                  <Icon name='camera' />
                  Channels
               </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={visible}>
            </Sidebar.Pusher>
         </Sidebar.Pushable>
      </>
   )
}

export default NavBarMobile