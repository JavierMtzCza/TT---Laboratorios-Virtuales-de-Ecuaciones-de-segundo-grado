import { useRef, useState } from 'react'
import { Button, Checkbox, Divider, Form, Transition } from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form';
import Confirmacion from "../components/Confirmacion.jsx";
import { useActividadStore } from '../stores/UsuarioStore.js';

const PA13CrearEjercicio = () => {

  const { register, control, watch, handleSubmit, formState: { errors }, reset } = useForm()

  const preguntas = useRef([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [visible, setVisible] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const actividad = useActividadStore(state => state.actividad)

  const onSubmit = handleSubmit((data) => {

    guardarPregunta() //Guardamos la pregunta que actualmente tiene
    //Proceso de creacion de las preguntas

      for (let index = 0; index < preguntas.current.length; index++) {
        const { pregunta, multimedia, consejo, URL, raiz1, raiz2, tCuadratico, tIndependiente, tLineal } = preguntas.current[index]
        const formData = new FormData();
        formData.append("pregunta", pregunta == undefined ? "" : pregunta);
        formData.append("multimedia", multimedia == undefined ? null : multimedia);
        formData.append("consejo", consejo == undefined ? "" : consejo);
        formData.append("claveVideo", URL == undefined ? "" : URL.split("v=")[1]);
        formData.append("opciones[a]", tCuadratico == undefined ? 0 : tCuadratico);
        formData.append("opciones[b]", tLineal == undefined ? 0 : tLineal);
        formData.append("opciones[c]", tIndependiente == undefined ? 0 : tIndependiente);
        formData.append("opciones[raiz1]", raiz1 == undefined ? 0 : raiz1);
        formData.append("opciones[raiz2]", raiz2 == undefined ? 0 : raiz2);

        fetch(`http://localhost:3000/preguntaejercicio/${actividad.id}`, { method: "POST", body: formData }).then(response => response.json())
          .then(data => { console.log(data); }).catch(error => { console.error(error); });
      }
    
    console.log("acabo");
  })

  const guardarPregunta = () => {
    const { pregunta, multimedia, consejo, URL, raiz1, raiz2, tCuadratico, tIndependiente, tLineal } = watch()
    const preguntaActual = {
      pregunta: pregunta,
      multimedia: multimedia,
      consejo: consejo,
      claveVideo: URL,
      opciones: { a: tCuadratico, b: tLineal, c: tIndependiente, raiz1: raiz1, raiz2: raiz2 }
    }
    preguntas.current.push(preguntaActual)
    console.log(preguntas.current);
  }

  return (
    <>
      <Form style={{ margin: "2% 15% 0% 15%" }} onSubmit={onSubmit}>
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
              onChange={(e) => { onChange(e.target.files[0]) }} selected={value} />)}
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
            <Form.Input type='number' step="any" label='Termino Cuadratico' placeholder='Termino Cuadratico'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="tLineal" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='number' step="any" label='Termino Lineal' placeholder='Termino Lineal'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="tIndependiente" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='number' step="any" label='Termino Independiente' placeholder='Termino Independiente'
              onChange={onChange} selected={value} />)}
          />
        </Form.Group>
        <Divider style={{ margin: "1% 35% 1% 35%" }} horizontal>O</Divider>
        <Form.Group widths="equal" >
          <Controller name="raiz1" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='number' step="any" label='Raiz 1'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="raiz2" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input type='number' step="any" label='Raiz 2'
              onChange={onChange} selected={value} />)}
          />
        </Form.Group>
        <Button type="button" onClick={() => setShowConfirm(true)} content="Agregar otra pregunta a la actividad" />
        <Button type="submit" content="Terminar Actividad" />
      </Form>

      <Confirmacion
        textoPantalla="Esta seguro de agregar esta pregunta?"
        open={showConfirm}
        setOpen={setShowConfirm}
        funcion={guardarPregunta}
      />
    </>
  )
}

export default PA13CrearEjercicio