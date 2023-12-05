import { useRef, useState } from 'react'
import { Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Label, Segment, Step, Transition } from 'semantic-ui-react'
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';

const PA13CrearEjercicio = () => {

  const { register, control, watch, handleSubmit, formState: { errors }, reset } = useForm()

  const time = useRef(moment().format('YYYY-MM-DDTHH:mm'))
  const preguntas = useRef([])
  const [status, setStatus] = useState(1)
  const [visible, setVisible] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })

  const GuardarPregunta = () => {
    const { pregunta, multimedia, consejo, URL, raiz1, raiz2, tCuadratico, tIndependiente, tLineal } = watch()
    const preguntaActual = {
      pregunta: pregunta,
      multimedia: multimedia,
      consejo: consejo,
      claveVideo: URL,
      opciones: {
        a: tCuadratico,
        b: tLineal,
        c: tIndependiente,
        raiz1: raiz1,
        raiz2: raiz2
      }
    }
    preguntas.current.push(preguntaActual)
    console.log(preguntas.current);
  }

  return (
    <>
      {/* <Step.Group attached='top' fluid unstackable >
        <Step active={status == 1 ? true : false} disabled={status == 1 ? false : true}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Datos de la Actividad</Step.Title>
          </Step.Content>
        </Step>

        <Step active={status == 2 ? true : false} disabled={status == 2 ? false : true}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Datos del ejercicio</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group> */}

      <Form style={{ margin: "2% 15% 0% 15%" }} onSubmit={onSubmit}>
        <Controller name="nombre" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input required label="Nombre de la actividad" placeholder="Ingrese el nombre de la actividad"
            onChange={onChange} selected={value} />)}
        />
        <Controller name="descripcion" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input label="Descripción (Opcional)" placeholder="Ingrese una descripción a la actividad"
            onChange={onChange} selected={value} />)}
        />
        <Controller name="fechaLimite" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input type='datetime-local' min={time.current} label="Fecha Limite (Opcional)" placeholder="Ingrese una descripción a la actividad"
            onChange={onChange} selected={value} />)}
        />
        {/* <Button content="Siguiente" onClick={() => { setStatus(2) }} /> */}
        <Divider style={{ margin: "0% 10% 2% 10%" }} horizontal>Pregunta</Divider>
        <Controller name="pregunta" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input required label="Texto de la pregunta" placeholder='Explica de que trata esta pregunta'
            onChange={onChange} selected={value} />)}
        />
        <Controller name="consejo" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input label='Consejo (Opcional)' placeholder='Agrega un consejo para tus alumnos'
            onChange={onChange} selected={value} />)}
        />
        <Form.Group inline widths='equal' >
          <Controller name="multimedia" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='file' disabled={disabled} label='Multimedia de Apoyo (Opcional)' placeholder='Agrega un consejo para tus alumnos'
              onChange={onChange} selected={value} />)}
          />
          <Form.Field>
            <Checkbox onChange={() => {
              setVisible(!visible)
              setDisabled(!disabled)
            }} label='Deseo agregar un video de Youtube como apoyo' />
          </Form.Field>
        </Form.Group>
        <Transition visible={visible} animation='scale' duration={500}>
          <Form.Field>
            <label>URL</label>
            <input id="URL" placeholder='Inserte aqui la URL del video de Youtube' {...register("URL")} />
          </Form.Field>
        </Transition>
        <Divider style={{ margin: "5% 10% 5% 10%" }} horizontal>Respuesta a la pregunta</Divider>
        <Form.Group widths="equal" >
          <Controller name="tCuadratico" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input label='Termino Cuadratico' placeholder='Termino Cuadratico'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="tLineal" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input label='Termino Lineal' placeholder='Termino Lineal'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="tIndependiente" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input label='Termino Independiente' placeholder='Termino Independiente'
              onChange={onChange} selected={value} />)}
          />
        </Form.Group>
        <Divider style={{ margin: "1% 35% 1% 35%" }} horizontal>O</Divider>
        <Form.Group widths="equal" >
          <Controller name="raiz1" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input label='Raiz 1'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="raiz2" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input label='Raiz 2'
              onChange={onChange} selected={value} />)}
          />
        </Form.Group>
        <Button type="button" onClick={GuardarPregunta} content="Agregar otra pregunta a la actividad" />

        {/* <Button type='submit' content="Terminar la creacion de la actividad" /> */}

      </Form>

    </>
  )
}

export default PA13CrearEjercicio