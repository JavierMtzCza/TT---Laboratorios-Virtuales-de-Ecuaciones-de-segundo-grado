import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useGrupoStore } from '../stores/UsuarioStore';
import moment from 'moment';

const CrearActividad = ({ initialValues, onClose, showModal }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialValues });
  const grupoActual = useGrupoStore(state => state.grupo);
  const [mensaje, setMensaje] = useState('');

  const defaultValues = {
    tipo: '', // Establecer un valor inicial para que no lo tome como undefined
    ...initialValues,
  };

  const postActividad = async (data) => {
    try {
      const payload = {
        nombre: data.nombre,
        
        fechaLimite: data.fechaLimite,
        tipo: data.tipo || defaultValues.tipo,
        claveGrupo: grupoActual.clave,
      };

      if (data.descripcion) {
        payload.descripcion = data.descripcion;
      }
  
      const response = await fetch(`http://localhost:3000/actividad/${grupoActual.clave}/crearActividad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        // Mostrar mensaje de éxito en el mismo modal
        setMensaje('Actividad creada con éxito');
        reset({
          nombre: '',
          descripcion: '',
          fechaLimite: '',
          tipo: '',
        });
        onClose(); // Cierra el modal desde el componente padre si es necesario
      }
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  const onSubmit = handleSubmit((formData) => {
    postActividad(formData);
  });

  return (
    <div>
      <Modal onClose={onClose} open={showModal} size='tiny'>
        <Modal.Header>Crear Actividad</Modal.Header>
        <Modal.Content>
          <Form style={{ margin: '0 1% 15% 1%' }} onSubmit={onSubmit}>
            <Form.Input required fluid label='Nombre' placeholder='Ingrese el nombre de la Actividad'>
              <input {...register('nombre')} />
            </Form.Input>
            <Form.TextArea
              label='Descripción'
              placeholder='Descripción de la Actividad'
              {...register('descripcion')}
            />
            <Form.Input
              required
              type='datetime-local'
              label='Fecha Límite'
              {...register('fechaLimite')}
            />
            <Form.Input
              required
              fluid
              label='Tipo'
              placeholder='Ingrese el tipo de la Actividad'
              {...register('tipo')}
            />
            {mensaje && <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</p>}
            <Button floated='left' content='Cancelar' color='red' onClick={onClose} />
            <Button floated='right' content='Crear Actividad' color='green' type='submit' />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default CrearActividad;
