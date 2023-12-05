// CrearActividad.jsx
import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useGrupoStore } from '../stores/UsuarioStore';
import moment from 'moment';


const CrearActividad = ({ initialValues, onClose, showModal }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialValues });

  const defaultValues = {
    descripcion: 'Escribe', // Puedes cambiar este valor predeterminado según tus necesidades
    tipo: 'Tarea o Cuestionario', // Puedes cambiar este valor predeterminado según tus necesidades
    ...initialValues,
  };

  
  const grupoActual = useGrupoStore(state => state.grupo);

  const postActividad = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/actividad/${grupoActual.clave}/actividad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.nombre,
          descripcion: data.descripcion || defaultValues.descripcion,
          fechaLimite: moment(data.fechaLimite).toISOString(),
          tipo: data.tipo || defaultValues.tipo,
          claveGrupo: grupoActual.clave
        }),
      });

      if (response.ok) {
        await alert('Actividad creada correctamente');
        reset({
          nombre: '',
          descripcion: 'Breve descripción de la actividad',
          fechaLimite: '',
          tipo: 'Tipo de actividad',
        });
        onClose(); // Cierra el modal desde el componente padre si es necesario
      }
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    postActividad(formData);
  });

  return (
    <div>
      <Modal
        onClose={onClose}
        open={showModal}
        size='tiny'
      >
        <Modal.Header>Crear Actividad</Modal.Header>
        <Modal.Content>
          <Form style={{ margin: '0 1% 15% 1%' }} onSubmit={onSubmit}>
            <Form.Input required fluid label='Nombre' placeholder='Ingrese el nombre de la Actividad'>
              <input {...register('nombre')} />
            </Form.Input>
            <Form.TextArea
              required
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
            <Button floated='left' content='Cancelar' color='red' onClick={onClose} />
            <Button floated='right' content='Crear Actividad' color='green' type='submit' />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default CrearActividad;
