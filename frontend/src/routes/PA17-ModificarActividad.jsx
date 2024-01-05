import { Controller, useForm } from 'react-hook-form'
import { useActividadStore } from '../stores/UsuarioStore'
import { Checkbox, Divider, Form, Message } from 'semantic-ui-react'

const PA17ModificarActividad = () => {

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm()
  const actividad = useActividadStore(state => state.actividad)
  const preguntas = actividad.PreguntaEjercicio


  const onSubmit = handleSubmit((data) => {
    console.log(data)
  });

  return (
    <>
      <Form onSubmit={onSubmit} >
        <Form.Input label="Nombre de la actividad" placeholder="">
          <input id='nombreActividad' {...register("nombreActividad")} />
        </Form.Input>
        <Form.Input label="Descripcion actividad" placeholder="">
          <input id='descripcionActividad' {...register("descripcionActividad")} />
        </Form.Input>
        {
          preguntas.map((pregunta) => (
            <>
              <Form.Group key={pregunta.id}>
                <Form.Input required label="Texto de la pregunta" placeholder="Explica de que trata esta pregunta">
                  <input id='pregunta' {...register("pregunta")} />
                </Form.Input>
                <Form.Input label="Consejo (Opcional)" placeholder="Agrega un consejo para tus alumnos">
                  <input id='consejo' {...register("consejo")} />
                </Form.Input>
                <Controller name="multimedia" control={control} render={({ field: { onChange, value } }) => (
                  <Form.Input id="multimedia" type='file' label='Multimedia de Apoyo (Opcional)'
                    onChange={(e) => { onChange(e.target.files[0]) }} selected={value} />)}
                />
                <Form.Field>
                  <Checkbox label='Deseo agregar un video de Youtube como apoyo' />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>URL</label>
                <input id="URL" placeholder='Inserte aqui la URL del video de Youtube' {...register("URL")} />
              </Form.Field>
              <Divider style={{ margin: "5% 10% 6% 10%" }} horizontal>Respuesta a la pregunta</Divider>
              <Form.Group widths="equal" >
                <Form.Input label="Termino Cuadratico" type='number' step="any">
                  <input id='tCuadratico' {...register("tCuadratico")} />
                </Form.Input>
                <Form.Input label="Termino Lineal" type='number' step="any">
                  <input id='tLineal' {...register("tLineal")} />
                </Form.Input>
                <Form.Input label="Termino Independiente" type='number' step="any">
                  <input id='tIndependiente' {...register("tIndependiente")} />
                </Form.Input>
              </Form.Group>
              <Message info
                content='En caso de que su ecuación solo tenga el término cuadrático, no hace falta poner algún valor en los demás campos de la ecuación.'
              />
            </>
          ))
        }
      </Form>
    </>
  )
}

export default PA17ModificarActividad