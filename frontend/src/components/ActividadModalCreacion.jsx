import { useRef, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { useActividadStore, useGrupoStore } from '../stores/UsuarioStore';
import { Controller, useForm } from 'react-hook-form';
import Confirmacion from './Confirmacion';

const ActividadModalCreacion = ({ propShow, propSetShow, tipo }) => {

  const { control, handleSubmit, formState: { errors }, reset } = useForm()
  const [error, setError] = useState(false)
  const time = useRef(moment().format('YYYY-MM-DDTHH:mm'))
  const navigate = useNavigate();
  const grupo = useGrupoStore(state => state.grupo)
  const setActividad = useActividadStore(state => state.setActividad)

  const handleCrearActividad = handleSubmit((data) => {

    if (data.nombre == undefined || data.nombre == "" || data.nombre.trim() == "") {
      setError(true)
      reset({ nombre: "" })
    } else {
      const fechaFormateada = moment(data.fechaLimite).toISOString();
      fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/${grupo.id}/actividad`, {
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
            setError(true)
          } else {
            //if (tipo == "Ejercicio")
            setActividad({
              id: data.actividad.id,
              nombre: data.actividad.nombre,
              descripcion: data.actividad.descripcion,
              //fechaLimite: data.actividad.fechaLimite,
              tipo: data.actividad.tipo,
              PreguntaCuestionario: [],
              PreguntaEjercicio: []
            })
            reset({ nombre: "", descripcion: "" })
            navigate('/CrearEjercicio',{ replace: true });
            //else
            //navigate('/Formulario')
          }
        })
        .catch((error) => console.log(error))
    }
  })

  return (
    <>
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
            {/* <Controller name="fechaLimite" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='datetime-local' min={time.current} label="Fecha Limite (Opcional)" placeholder="Ingrese una descripción a la actividad"
              onChange={onChange} selected={value} />)}
          /> */}
            <Button color="black" type='button' content="Cancelar" onClick={() => propSetShow(false)} />
            <Button content="Crear Actividad" type='submit' labelPosition="right" icon="checkmark" onClick={handleCrearActividad} positive />
          </Form>
        </Modal.Content>
      </Modal>
      <Modal
        centered={false}
        size='tiny'
        open={error}
        closeIcon
        onClose={() => setError(false)}
        header="Debe llenar el campo nombre"
      />
    </>
  )
}

export default ActividadModalCreacion