import { Button, Container, Grid, Header, Menu, Segment } from 'semantic-ui-react'
import ActividadModalCreacion from "./GrupoModalActividad";
import { useState } from 'react';


const GrupoMenuProfe = ({ nombre, descripcion, clave }) => {
  
  const [showActividadModal, setShowActividadModal] = useState(false);

  const handleCrearActividad = () => {
    setShowActividadModal(true);
  };

  return (
    <>
      <Segment style={{ borderRadius: "1rem", background: "#00C193", color: "#ffffff", margin: "1% 5% 1% 5%" }}>
        <Grid stackable>
          <Grid.Row columns={2} textAlign='left'>
            <Grid.Column width={12}>
              <Grid.Row>
                <Header style={{ color: "#ffffff" }} size='huge' content={nombre} />
              </Grid.Row>
              <Grid.Row>
                <Container textAlign='justified'>
                  <p style={{ margin: "2% 0% 0% 2%" }}>
                    {descripcion}
                  </p>
                </Container>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign='center' style={{ fontSize: "20px" }} width={4}>
              <Grid.Row>
                <p>Codigo de acceso: </p>
              </Grid.Row>
              <Grid.Row>
                <p>{clave}</p>
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
        <Button color='green' onClick={handleCrearActividad}>Crear Cuestionario</Button>
        </Menu.Item>
      </Menu>

      {/* Modal de creación de actividad */}
      <ActividadModalCreacion
        propShow={showActividadModal}
        propSetShow={setShowActividadModal}
        actualizarActividades={() => {
          /* Lógica para actualizar actividades */
        }}
      />
    </>
  )
}

export default GrupoMenuProfe