// Importa las bibliotecas necesarias
import React from 'react';
import { Segment, Header, Checkbox, Button, Modal } from 'semantic-ui-react';

// Define tu componente de términos y condiciones
const TermsAndConditionsModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} closeIcon>
      <Segment>
        <Header as="h2">Términos y Condiciones</Header>
        <p>
          ¡Bienvenido a nuestra aplicación! Al usar nuestra aplicación, aceptas los siguientes términos y condiciones.
        </p>
        {/* Agrega aquí tus términos y condiciones */}
        <p>1. ...</p>
        <p>2. ...</p>
        {/* Fin de los términos y condiciones */}
        <Checkbox label="Acepto los términos y condiciones" />
        <Button primary onClick={onClose}>
          Aceptar
        </Button>
      </Segment>
    </Modal>
  );
};

export default TermsAndConditionsModal;
