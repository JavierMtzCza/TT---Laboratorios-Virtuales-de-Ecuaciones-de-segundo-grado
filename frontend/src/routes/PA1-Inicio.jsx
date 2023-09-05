import { Grid, GridColumn, GridRow, Header, Icon, Image } from 'semantic-ui-react'
import NavBarMobile from '../components/NavBarMobile.jsx'
import NavBar from '../components/NavBar.jsx'

import imagen1 from "../images/matematicas.png"
import imagen2 from "../images/Group 1 (2).svg"

const PA1Inicio = () => {
   return (
      <>
         <Grid style={{ height: "105vh" }}>
            <Grid.Row only='computer'>
               <Grid.Column>
                  <NavBar image={imagen1} />
               </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet mobile'>
               <Grid.Column>
                  <NavBarMobile image={imagen1} />
               </Grid.Column>
            </Grid.Row>
            <GridRow  textAlign='center'>
               <GridColumn verticalAlign='middle' width={6}>
                  <Header as='h2' icon>
                     <Icon name='settings' />
                     Account Settings
                     <Header.Subheader>
                        Manage your account settings and set e-mail preferences.
                     </Header.Subheader>
                  </Header>
               </GridColumn>
               <Grid.Column width={10}>
                  <Image src={imagen2} fluid/>
               </Grid.Column>
            </GridRow>
         </Grid>
      </>
   )
}

export default PA1Inicio