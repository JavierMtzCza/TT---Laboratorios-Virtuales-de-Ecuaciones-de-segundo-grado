import { Button, Container, Grid, Header, Menu, Segment } from 'semantic-ui-react'

const GrupoMenuProfe = () => {
  return (
    <>
      <Segment style={{ borderRadius: "1rem", background: "#00C193", color: "#ffffff", margin: "1% 5% 1% 5%" }}>
        <Grid stackable>
          <Grid.Row columns={2} textAlign='left'>
            <Grid.Column width={12}>
              <Grid.Row>
                <Header style={{ color: "#ffffff" }} size='huge' content="Clase tercero B" />
              </Grid.Row>
              <Grid.Row>
                <Container textAlign='justified'>
                  <p style={{ margin: "2% 0% 0% 2%" }}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodoligula eget dolor. Aenean massa strong. Cum socinatoque penatibus etmagnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massaquis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,arcu.
                  </p>
                </Container>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign='center' style={{ fontSize: "20px" }} width={4}>
              <Grid.Row>
                <p>Codigo de acceso: </p>
              </Grid.Row>
              <Grid.Row>
                <p>fdskfsdf</p>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Menu secondary style={{ margin: "1% 5% 1% 5%" }}>
        <Menu.Item position='right' >
          <Button color='green'>Crear Ejercicio</Button>
        </Menu.Item>
        <Menu.Item>
          <Button color='green'>Crear Cuestionaio</Button>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default GrupoMenuProfe