import { Container, Grid, Header, Segment } from 'semantic-ui-react'

const GrupoMenuAlumno = () => {
   return (
      <Segment style={{ borderRadius: "1rem", background: "#FFBF00", color: "#ffffff", margin: "1% 5% 1% 5%" }}>
         <Grid stackable>
            <Grid.Row columns={2} textAlign='left'>
               <Grid.Column width={12}>
                  <Grid.Row>
                     <Header style={{ color: "#ffffff" }} size='huge' content="Clase tercero B" />
                  </Grid.Row>
                  <Grid.Row>
                     <Container textAlign='justified'>
                        <p style={{ margin: "2% 0% 0% 2%" }}>
                           Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodoligula eget dolor. Aenean massa strong. Cum socinatoque penatibus etmagnis dis parturient montes, nascetur ridiculus mus.
                        </p>
                     </Container>
                  </Grid.Row>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </Segment>

   )
}

export default GrupoMenuAlumno