import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useGrupoStore } from '../stores/UsuarioStore';

function TuComponente({ onCloseModal }) {
  const { grupo } = useGrupoStore();
  const idGrupo = grupo.id;

  const [modalOpen, setModalOpen] = useState(false);
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: '',
    descripcion: '',
    fechaLimite: '',
    tipo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/actividad/${idGrupo}/actividad`);
        await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idGrupo]);

  const handleInputChange = (e, { name, value }) => {
    setNuevaActividad((prevActividad) => ({ ...prevActividad, [name]: value }));
  };

  useEffect(() => {
    handleOpenModal();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    
    setModalOpen(false);
  };

  const handleCrearActividad = async () => {
    try {
      const response = await fetch(`http://localhost:3000/actividad/${idGrupo}/actividad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaActividad),
      });

      if (response.ok) {
        handleCloseModal();
      } else {
        console.error('Error al crear la actividad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  return (
    <div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Modal.Header>Crear Nueva Actividad</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Nombre"
              name="nombre"
              value={nuevaActividad.nombre}
              onChange={handleInputChange}
            />
            <Form.TextArea
              label="Descripción"
              name="descripcion"
              value={nuevaActividad.descripcion}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Fecha Límite"
              name="fechaLimite"
              type="date"
              value={nuevaActividad.fechaLimite}
              onChange={handleInputChange}
            />
            <Form.Input
              label="Tipo"
              name="tipo"
              value={nuevaActividad.tipo}
              onChange={handleInputChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            content="Crear Actividad"
            labelPosition="right"
            icon="checkmark"
            onClick={handleCrearActividad}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default TuComponente;
