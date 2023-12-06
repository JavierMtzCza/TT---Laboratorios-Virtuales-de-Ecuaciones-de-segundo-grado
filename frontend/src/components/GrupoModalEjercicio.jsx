import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import moment from 'moment';
import {  useNavigate } from 'react-router-dom'
import { useGrupoStore } from '../stores/UsuarioStore';

function CrearEjercicio({ onCloseModal }) {
  
  const { grupo } = useGrupoStore();
  const idGrupo = grupo.id;
  const navigate = useNavigate();

  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: '',
    descripcion: '',
    fechaLimite: moment().toISOString(),
    tipo: 'Ejercicio',
  });

  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e, { name, value }) => {
    if (name !== 'tipo') {
      setNuevaActividad((prevActividad) => ({ ...prevActividad, [name]: value }));
    }
  };

  const handleCrearActividad = async () => {
    try {
      const fechaFormateada = moment(nuevaActividad.fechaLimite).toISOString();

      const response = await fetch(`http://localhost:3000/actividad/${idGrupo}/actividad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...nuevaActividad, fechaLimite: fechaFormateada }),
      });

      if (response.ok) {
        setMensaje('Actividad creada con éxito');
        // Redirige a la URL deseada después de crear la actividad
        navigate('/CrearEjercicio');
      } else {
        console.error('Error al crear la actividad:', response.statusText);
        setMensaje('Error al crear la actividad');
      }
    } catch (error) {
      console.error('Error al crear la actividad:', error);
      setMensaje('Error al crear la actividad');
    } finally {
      onCloseModal();
    }
  };

  return (
    <Modal open onClose={onCloseModal}>
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
            type="datetime-local"
            value={nuevaActividad.fechaLimite}
            onChange={handleInputChange}
          />
          <Form.Input
            label="Tipo"
            name="tipo"
            value={nuevaActividad.tipo}
            onChange={handleInputChange}
            disabled
            style={{ color: '#333' }}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onCloseModal}>
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
      {mensaje && (
        <div style={{ marginTop: '10px', color: mensaje.includes('éxito') ? 'green' : 'red' }}>
          {mensaje}
        </div>
      )}
    </Modal>
  );
}

export default  CrearEjercicio;
