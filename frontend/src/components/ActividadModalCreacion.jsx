import { useRef, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { useActividadStore, useGrupoStore } from '../stores/UsuarioStore';
import { Controller, useForm } from 'react-hook-form';

const ActividadModalCreacion = ({ propShow, propSetShow, tipo }) => {

  const { control, handleSubmit, formState: { errors }, reset } = useForm()
  const time = useRef(moment().format('YYYY-MM-DDTHH:mm'))
  const navigate = useNavigate();
  const grupo = useGrupoStore(state => state.grupo)
  const setActividad = useActividadStore(state => state.setActividad)


  const handleCrearActividad = handleSubmit((data) => {

    const fechaFormateada = moment(data.fechaLimite).toISOString();
    fetch(`http://localhost:3000/actividad/${grupo.id}/actividad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fechaLimite: fechaFormateada == undefined ? null : fechaFormateada,
        tipo: tipo.current,
        nombre: data.nombre,
        descripcion: data.descripcion == undefined ? null : data.descripcion
      }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(error)
        } else {
          if (tipo == "Ejercicio") {
            console.log(data);
            setActividad({
              id: data.actividad.id,
              nombre: data.actividad.nombre,
              descripcion: data.actividad.descripcion,
              fechaLimite: data.actividad.fechaLimite,
              tipo: data.actividad.tipo,
              PreguntaCuestionario: [],
              PreguntaEjercicio: []
            });
            navigate('/CrearEjercicio');
          } else {

            navigate('/Cuestionario');
             }
          }
        })
      .catch((error) => console.log(error))

  })
  return (
    <Modal
      onClose={() => propSetShow(false)}
      onOpen={() => propSetShow(true)}
      open={propShow}>
      <Modal.Header>Crear Nueva Actividad</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleCrearActividad} >
          <Controller name="nombre" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input required label="Nombre de la actividad" placeholder="Ingrese el nombre de la actividad"
              onChange={onChange} selected={value} />)}
          />
          <Controller name="descripcion" control={control} render={({ field: { onChange, value } }) => (
            <Form.TextArea label="Descripción (Opcional)" placeholder="Ingrese una descripción a la actividad"
              onChange={onChange} selected={value} />)}
          />
          <Controller name="fechaLimite" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='datetime-local' min={time.current} label="Fecha Limite (Opcional)" placeholder="Ingrese una descripción a la actividad"
              onChange={onChange} selected={value} />)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" type='button' content="Cancelar" onClick={() => propSetShow(false)} />
        <Button content="Crear Actividad" labelPosition="right" icon="checkmark" onClick={handleCrearActividad} positive />
      </Modal.Actions>
    </Modal>
  )
}

export default ActividadModalCreacion