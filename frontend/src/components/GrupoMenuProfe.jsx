// GrupoMenuProfe.jsx
import React, { useState } from 'react';
import { Button, Container, Grid, Header, Menu, Segment, Modal } from 'semantic-ui-react';
import CrearActividad from './GrupoModalActividad';
import { useGrupoStore } from '../stores/UsuarioStore';

const GrupoMenuProfe = ({ nombre, descripcion, clave }) => {
  const [showCrearActividadModal, setShowCrearActividadModal] = useState(false);
  const grupoActual = useGrupoStore(state => state.grupo);
  
  const handleCrearCuestionarioClick = () => {
    setShowCrearActividadModal(true);
  };

  const handleCloseCrearActividadModal = () => {
    setShowCrearActividadModal(false);
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
        <Menu.Item position='right'>
          <Button color='green'>Crear Ejercicio</Button>
        </Menu.Item>
        <Menu.Item>
          <Button color='green' onClick={handleCrearCuestionarioClick}>Crear Cuestionario</Button>
        </Menu.Item>
      </Menu>

      {/* Modal para crear actividad */}
      {showCrearActividadModal && (
        <CrearActividad claveGrupo={grupoActual.clave} onClose={handleCloseCrearActividadModal} showModal={showCrearActividadModal} />
      )}
    </>
  );
};

export default GrupoMenuProfe;
