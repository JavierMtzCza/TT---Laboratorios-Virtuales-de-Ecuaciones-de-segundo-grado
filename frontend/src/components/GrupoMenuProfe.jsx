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
          {/* ... (resto del código) */}
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
