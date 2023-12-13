import { useRef, useState } from 'react'
import { Button, Checkbox, Divider, Form, Message, Modal, Segment, Transition } from 'semantic-ui-react'
import { Controller, useForm } from 'react-hook-form';
import { useActividadStore } from '../stores/UsuarioStore.js';

import Confirmacion from "../components/Confirmacion.jsx";
import { useNavigate } from 'react-router-dom';

const PA13CrearEjercicio = () => {

  const { register, control, watch, handleSubmit, formState: { errors }, reset, setValue } = useForm()

  const preguntas = useRef([])
  const navigate = useNavigate();
  const [showConfirmPregunta, setShowConfirmPregunta] = useState(false)
  const [showConfirmEjercicio, setShowConfirmEjercicio] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const [error, setError] = useState({ show: false, mensaje: "" })
  const [checkURL, setCheckURL] = useState({ visible: false, deshabilitado: false })
  const [checkRaices, setCheckRaices] = useState({ visible: false, deshabilitado: false })
  const actividad = useActividadStore(state => state.actividad)

  const Submit = handleSubmit(() => {
    setShowConfirmEjercicio(false)
    if (preguntas.current.length < 1) {
      setError({ show: true, mensaje: "Se tiene que agregar por lo menos una pregunta" })
    } else {
      guardarPregunta()
      for (let index = 0; index < preguntas.current.length; index++) {
        const { pregunta, multimedia, consejo, claveVideo, opciones } = preguntas.current[index]
        const formData = new FormData();
        formData.append("pregunta", pregunta);
        formData.append("multimedia", multimedia);
        formData.append("consejo", consejo);
        formData.append("ClaveVideo", claveVideo);
        formData.append("OpcionEjercicio[a]", opciones.a);
        formData.append("OpcionEjercicio[b]", opciones.b);
        formData.append("OpcionEjercicio[c]", opciones.c);
        formData.append("OpcionEjercicio[r1]", opciones.r1);
        formData.append("OpcionEjercicio[r2]", opciones.r2);

        fetch(`http://localhost:3000/preguntaejercicio/${actividad.id}`, { method: "POST", body: formData })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              console.log(data);
            } else {
              setShowConfirmEjercicio(false)
              setShowPortal(true)
            }
          }).catch(error => { console.error(error); });
      }

      preguntas.current = []
      limpiar()
    }
  })

  const guardarPregunta = () => {
    // const { pregunta, multimedia, consejo, URL, raiz1, raiz2, tCuadratico, tIndependiente, tLineal } = watch()
    // const preguntaActual = {
    //   pregunta: pregunta == undefined ? "" : pregunta,
    //   multimedia: multimedia == undefined ? null : multimedia,
    //   consejo: (consejo == undefined) ? null : (consejo == "") ? null : consejo,
    //   claveVideo: (URL == undefined) ? null : (URL == "") ? null : URL.split("v=")[1],
    //   opciones: {
    //     a: (tCuadratico == undefined) ? 0 : (tCuadratico == '') ? 0 : tCuadratico,
    //     b: (tLineal == undefined) ? 0 : (tLineal == '') ? 0 : tLineal,
    //     c: (tIndependiente == undefined) ? 0 : (tIndependiente == '') ? 0 : tIndependiente,
    //     r1: (raiz1 == undefined) ? 0 : (raiz1 == '') ? 0 : raiz1,
    //     r2: (raiz2 == undefined) ? 0 : (raiz2 == undefined) ? 0 : raiz2
    //   }
    // }
    // preguntas.current.push(preguntaActual)
    // limpiar()
    console.log("dasdad");
  }

  const validarDatos = () => {
    setShowConfirmPregunta(false)
    const { pregunta, raiz1, raiz2, tCuadratico, tIndependiente, tLineal } = watch()

    const input = document.getElementById("pregunta")
    input.setAttribute("value", "Hola");

    // if (pregunta == undefined || pregunta == "" || pregunta.trim() == "") {
    //   setError({ show: true, mensaje: "La pregunta debe tener un valor" })
    // } else if (checkRaices.visible && ((raiz1 == "" || raiz1 == undefined || raiz1.trim() == "") || (raiz2 == "" || raiz2 == undefined || raiz2.trim() == ""))) {
    //   setError({ show: true, mensaje: "Debe poner un valor en ambas raices" })
    // } else if (!checkRaices.visible && ((tCuadratico == "" || tCuadratico == undefined || tCuadratico.trim() == "") || (tLineal == "" || tLineal == undefined || tLineal.trim() == "") || (tIndependiente == "" || tIndependiente == undefined || tIndependiente.trim() == ""))) {
    //   setError({ show: true, mensaje: "Debe llenar los campos para la respuesta a la pregunta" })
    // } else {
    //   guardarPregunta()
    // }
    // limpiar()
  }

  const limpiar = () => {
    reset({ pregunta: '', multimedia: null, consejo: "", URL: "", raiz1: 0, raiz2: 0, tCuadratico: 0, tIndependiente: 0, tLineal: 0 })
    document.getElementById("raiz1").value = ""
    document.getElementById("raiz2").value = ""
    document.getElementById("tCuadratico").value = ""
    document.getElementById("tLineal").value = ""
    document.getElementById("tIndependiente").value = ""
    document.getElementById("URL").value = ""
    document.getElementById("multimedia").value = ""
    document.getElementById("pregunta").value = ""
    document.getElementById("consejo").value = ""
  }

  return (
    <>
      <Form style={{ margin: "5% 17% 0% 17%" }}>
        <Divider style={{ margin: "0% 10% 6% 10%" }} horizontal>Datos de la Pregunta</Divider>
        <Controller name="pregunta" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input id="pregunta" required label="Texto de la pregunta" placeholder='Explica de que trata esta pregunta'
            onChange={onChange} selected={value} />)}
        />
        <Controller name="consejo" control={control} render={({ field: { onChange, value } }) => (
          <Form.Input id="consejo" label='Consejo (Opcional)' placeholder='Agrega un consejo para tus alumnos'
            onChange={onChange} selected={value} />)}
        />
        <Form.Group inline widths='equal' >
          <Controller name="multimedia" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input id="multimedia" type='file' disabled={checkURL.deshabilitado} label='Multimedia de Apoyo (Opcional)'
              onChange={(e) => { onChange(e.target.files[0]) }} selected={value} />)}
          />
          <Form.Field>
            <Checkbox onChange={() => {
              if (checkURL.visible) {
                setValue("URL", "")
                document.getElementById("URL").value = ""
              } else {
                setValue("multimedia", null)
                document.getElementById("multimedia").value = null
              }

              setCheckURL({ visible: !checkURL.visible, deshabilitado: !checkURL.deshabilitado })
            }}
              label='Deseo agregar un video de Youtube como apoyo'
            />
          </Form.Field>
        </Form.Group>
        <Transition visible={checkURL.visible} animation='scale' duration={500}>
          <Form.Field>
            <label>URL</label>
            <input id="URL" placeholder='Inserte aqui la URL del video de Youtube' {...register("URL")} />
          </Form.Field>
        </Transition>
        <Divider style={{ margin: "5% 10% 6% 10%" }} horizontal>Respuesta a la pregunta</Divider>
        <Form.Group widths="equal" >
          <Controller name="tCuadratico" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input id="tCuadratico" type='number' disabled={checkRaices.deshabilitado} step="any" label='Termino Cuadratico' placeholder='Termino Cuadratico'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="tLineal" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input id="tLineal" type='number' disabled={checkRaices.deshabilitado} step="any" label='Termino Lineal' placeholder='Termino Lineal'
              onChange={onChange} selected={value} />)}
          />
          <Controller name="tIndependiente" control={control} render={({ field: { onChange, value } }) => (
            <Form.Input id="tIndependiente" type='number' disabled={checkRaices.deshabilitado} step="any" label='Termino Independiente' placeholder='Termino Independiente'
              onChange={onChange} selected={value} />)}
          />
        </Form.Group>
        <Checkbox onChange={() => {
          if (checkRaices.visible) {
            document.getElementById("raiz1").value = ""
            document.getElementById("raiz2").value = ""
            setValue("raiz1", "")
            setValue("raiz2", "")
          } else {
            document.getElementById("tCuadratico").value = ""
            document.getElementById("tLineal").value = ""
            document.getElementById("tIndependiente").value = ""
            setValue("tCuadratico", "")
            setValue("tLineal", "")
            setValue("tIndependiente", "")
          }

          setCheckRaices({ visible: !checkRaices.visible, deshabilitado: !checkRaices.deshabilitado })
        }}
          label='En mi respuesta se necesitan obtener las raices'
        />
        <Transition visible={checkRaices.visible} animation='scale' duration={500}>
          <Segment textAlign='center' basic raised>
            <Form.Group inline widths='equal'>
              <Controller name="raiz1" control={control} render={({ field: { onChange, value } }) => (
                <Form.Input id="raiz1" fluid type='number' step="any" label='Raiz 1'
                  onChange={onChange} selected={value} />)}
              />
              <Controller name="raiz2" control={control} render={({ field: { onChange, value } }) => (
                <Form.Input id="raiz2" fluid type='number' step="any" label='Raiz 2'
                  onChange={onChange} selected={value} />)}
              />
            </Form.Group>
          </Segment>
        </Transition>
        <Form.Group widths="equal" >
        </Form.Group>
        <Button type="button" onClick={() => setShowConfirmPregunta(true)} content="Agregar otra pregunta a la actividad" />
        <Button type="button" onClick={() => setShowConfirmEjercicio(true)} content="Terminar Actividad" />
      </Form>

      <Confirmacion
        textoPantalla="Esta seguro de agregar esta pregunta?"
        open={showConfirmPregunta}
        setOpen={setShowConfirmPregunta}
        funcion={validarDatos}
      />
      <Confirmacion
        textoPantalla="Desea terminar la creación del ejercicio?"
        open={showConfirmEjercicio}
        setOpen={setShowConfirmEjercicio}
        funcion={Submit}
      />
      <Modal
        centered={false}
        size='tiny'
        content={<Message style={{ textAlign: "center", fontSize: "18px" }} positive header="Ejercicio creado satisfactoriamente" />}
        open={showPortal}
        onOpen={() => setShowPortal(true)}
        onClose={() => {
          setShowPortal(false)
          navigate('/Grupo')
        }}
      />
      <Modal
        centered={false}
        size='tiny'
        open={error.show}
        closeIcon
        onClose={() => setError({ show: false, mensaje: "" })}
        header={error.mensaje}
      />
    </>
  )
}

export default PA13CrearEjercicio