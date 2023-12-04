// ActividadModalCreacion.js
import { useGrupoStore } from '../stores/UsuarioStore';
import { useUsuarioStore } from '../stores/UsuarioStore';
import { useForm } from 'react-hook-form';
import { Button,  Modal,Form } from 'semantic-ui-react'


const ActividadModalCreacion = ({ propShow, propSetShow, actualizarActividades }) => {
  const usuario = useUsuarioStore(state => state.usuario);
  const grupoActual = useGrupoStore(state => state.grupo);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const postActividad = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/actividad/${grupoActual.clave}/actividad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcion: data.descripcion,
          fechaLimite: data.fechaLimite,
          tipo: data.tipo,
        }),
      });

      if (response.ok) {
        await alert('Actividad creada correctamente');

        // Restablece el estado global de grupo después de crear la actividad
        useGrupoStore.setState({ grupo: { ...grupoActual, clave: '' } });

        actualizarActividades();
        propSetShow(false);
        reset({
          descripcion: '',
          fechaLimite: '',
          tipo: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = handleSubmit((formData) => {
    postActividad({
      descripcion: formData.descripcion,
      fechaLimite: new Date(formData.fechaLimite).toISOString(),
      tipo: formData.tipo,
    });
  });

  return (
    <Modal
      onClose={() => propSetShow(false)}
      onOpen={() => propSetShow(true)}
      open={propShow}
      size='tiny'
    >
      <Modal.Header>Crear Actividad</Modal.Header>
      <Modal.Content>
        <Form error onSubmit={onSubmit}>
          <Form.Input required fluid label="Descripción" placeholder="Ingrese la descripción de la actividad" {...register("descripcion")} />
          <Form.Input required fluid label="Fecha Límite" placeholder="Ingrese la fecha límite" type="date" {...register("fechaLimite")} />
          <Form.Input required fluid label="Tipo" placeholder="Ingrese el tipo de actividad" {...register("tipo")} />
          <Button floated='left' content="Cancelar" color='red' onClick={() => propSetShow(false)} />
          <Button floated='right' content="Crear Actividad" color='green' type='submit' />
        </Form>
      </Modal.Content>
    </Modal>

    );
};

export default ActividadModalCreacion;
