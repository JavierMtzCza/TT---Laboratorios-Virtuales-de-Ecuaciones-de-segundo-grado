import React, { useState } from 'react';
import { Form, Input, Container, Header, Segment, Icon, Image, Button, Select } from 'semantic-ui-react';
import '../estiloscss/estilocues.css';
const PA9Cuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState('');
  const [imagenActual, setImagenActual] = useState(null);
  const [opcionCorrecta, setOpcionCorrecta] = useState('');
  const [editandoPregunta, setEditandoPregunta] = useState(true); // Editar pregunta por defecto
  const [editandoIndex, setEditandoIndex] = useState(null); // Índice de la pregunta en edición
  const [editandoOpcionIndex, setEditandoOpcionIndex] = useState(null); // Índice de la opción en edición
  const [opcionesCorrectasPorPregunta, setOpcionesCorrectasPorPregunta] = useState([]);

  const options = [];

  for (let i = 0; i < 5; i++) {
    options.push({ key: i, text: `Opción ${i + 1}`, value: i });
  }

  const handlePreguntaChange = (e) => {
    setPreguntaActual(e.target.value);
  };

  const handleImagenChange = (e, indexPregunta, indexOpcion) => {
    const file = e.target.files[0];
    setImagenActual(file);

    const nuevasPreguntas = [...preguntas];

    if (indexOpcion !== undefined) {
      // Si se proporciona el índice de opción, estamos cambiando una imagen de opción.
      nuevasPreguntas[indexPregunta].opciones[indexOpcion].imagen = file;
    } else {
      // Si no se proporciona el índice de opción, estamos cambiando una imagen de pregunta.
      nuevasPreguntas[indexPregunta].imagen = file;
    }
    setPreguntas(nuevasPreguntas);
  };

  const handleNuevaPregunta = () => {
    const nuevaPregunta = {
      pregunta: preguntaActual,
      imagen: imagenActual,
      opciones: [],
      opcionCorrecta: opcionCorrecta,
    };

    setOpcionesCorrectasPorPregunta((prev) => [...prev, 0]);

    setPreguntas([...preguntas, nuevaPregunta]);
    setPreguntaActual('');
    setImagenActual(null);
    setOpcionCorrecta('');
  };

  const eliminarPregunta = (index) => {
    const nuevasPreguntas = [...preguntas];
    const nuevasOpcionesCorrectas = [...opcionesCorrectasPorPregunta];
    nuevasPreguntas.splice(index, 1);
    nuevasOpcionesCorrectas.splice(index, 1);
    setPreguntas(nuevasPreguntas);
    setOpcionesCorrectasPorPregunta(nuevasOpcionesCorrectas);
  };

  const agregarOpcion = (indexPregunta) => {
    const pregunta = preguntas[indexPregunta];

    if (pregunta.opciones.length < 5) {
      const nuevasOpciones = [...pregunta.opciones, { respuesta: '', imagen: null }];
      const nuevasPreguntas = [...preguntas];
      nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;

      setOpcionesCorrectasPorPregunta((prev) => {
        const nuevasOpcionesCorrectas = [...prev];
        nuevasOpcionesCorrectas[indexPregunta] = (prev[indexPregunta] || 0) + 1;
        return nuevasOpcionesCorrectas;
      });

      setPreguntas(nuevasPreguntas);
    }
  };

  const eliminarOpcion = (indexPregunta, indexOpcion) => {
    const pregunta = preguntas[indexPregunta];
    const nuevasOpciones = [...pregunta.opciones];
    nuevasOpciones.splice(indexOpcion, 1);
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;

    setOpcionesCorrectasPorPregunta((prev) => {
      const nuevasOpcionesCorrectas = [...prev];
      nuevasOpcionesCorrectas[indexPregunta] = Math.max((prev[indexPregunta] || 0) - 1, 0);
      return nuevasOpcionesCorrectas;
    });

    setPreguntas(nuevasPreguntas);
  };

  const evaluarRespuestas = () => {
    // Agregar lógica para evaluar respuestas aquí si es necesario.
  };

  const activarModoEdicion = (index, editandoPregunta, opcionIndex) => {
    setEditandoPregunta(editandoPregunta);
    setEditandoIndex(index);

    if (opcionIndex !== undefined) {
      setEditandoOpcionIndex(opcionIndex);
    } else {
      setEditandoOpcionIndex(null); // Restablece el índice de la opción en edición
    }
  };

  const guardarEdicion = () => {
    // Aquí puedes guardar la edición de la pregunta u opción en el estado.
    setEditandoPregunta(false);
    setEditandoIndex(null);
    setEditandoOpcionIndex(null);
  };

  const cancelarEdicion = () => {
    setEditandoPregunta(false);
    setEditandoIndex(null);
    setEditandoOpcionIndex(null);
  };

  return (
    <Container text className="container-background">
      <Header as="h1">Cuestionario</Header>
      <Icon name="check" size="large" color="blue" onClick={evaluarRespuestas} />
      {preguntas.map((pregunta, index) => (
        <Segment key={index} style={{ color: "black" }} >
          <Form>
            <Form.Field>
              <label className="pregunta-label">Pregunta {index + 1}</label>
              {editandoIndex === index && editandoPregunta ? (
                <div>
                  <Input
                    className="edit-input"
                    placeholder="Edita la pregunta"
                    value={pregunta.pregunta}
                    onChange={(e) => {
                      const nuevasPreguntas = [...preguntas];
                      nuevasPreguntas[index].pregunta = e.target.value;
                      setPreguntas(nuevasPreguntas);
                    }}
                  />
                  <Input
                    type="file"
                    onChange={(e) => handleImagenChange(e, index)}
                  />
                  <Button primary onClick={guardarEdicion}>Guardar</Button>
                  <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
                </div>
              ) : (
                <div>
                  <p>{pregunta.pregunta}</p>
                  {pregunta.imagen && (
                    <div className="image-container">
                      <Image src={URL.createObjectURL(pregunta.imagen)} size="medium" />
                      <Button
                        negative
                        onClick={() => handleImagenChange({ target: { files: [] } }, index)}
                      >
                        Eliminar Imagen
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <Icon
                name="trash"
                size="large"
                color="red"
                onClick={() => eliminarPregunta(index)}
              />
              <Icon
                name="edit"
                size="large"
                color="blue"
                onClick={() => activarModoEdicion(index, true)}
              />
              <Icon
                name="calendar plus outline"
                size="large"
                color="green"
                onClick={() => agregarOpcion(index)}
              />
              <Select
                placeholder={`Elige la opción correcta (hasta ${opcionesCorrectasPorPregunta[index]})`}
                options={options.slice(0, opcionesCorrectasPorPregunta[index])}
                value={pregunta.opcionCorrecta}
                onChange={(e, { value }) => {
                  const nuevasPreguntas = [...preguntas];
                  nuevasPreguntas[index].opcionCorrecta = value;
                  setPreguntas(nuevasPreguntas);
                }}
              />
              {pregunta.opciones.map((opcion, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
                  <span style={{ marginRight: "30px" }}>{i + 1}. </span>
                  {editandoIndex === index && !editandoPregunta && editandoOpcionIndex === i ? (
                    <div style={{ flex: 1, marginRight: "10px" }}>
                      <Input
                        className="edit-input"
                        placeholder="Edita la opción"
                        value={opcion.respuesta}
                        onChange={(e) => {
                          const nuevasPreguntas = [...preguntas];
                          nuevasPreguntas[index].opciones[i].respuesta = e.target.value;
                          setPreguntas(nuevasPreguntas);
                        }}
                      />
                      <Input
                        type="file"
                        onChange={(e) => handleImagenChange(e, index, i)}
                      />
                      <Button primary onClick={guardarEdicion}>Guardar</Button>
                      <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
                    </div>
                  ) : (
                    

                        <div style={{ flex: 1, marginRight: "20px" }}>
                        <p>{opcion.respuesta}</p>

                                <Input
                            className="opcion-input"
                            placeholder={`Opción ${i + 1}`}
                            value={opcion.respuesta}
                            onChange={(e) => {
                                const nuevasOpciones = [...preguntas[index].opciones];
                                nuevasOpciones[i].respuesta = e.target.value;
                                const nuevasPreguntas = [...preguntas];
                                nuevasPreguntas[index].opciones = nuevasOpciones;
                                setPreguntas(nuevasPreguntas);
                            }}
                            />
                                <Input
                                type="file"
                                onChange={(e) => {
                                const nuevasOpciones = [...preguntas[index].opciones];
                                nuevasOpciones[i].imagen = e.target.files[0];
                                const nuevasPreguntas = [...preguntas];
                                nuevasPreguntas[index].opciones = nuevasOpciones;
                                setPreguntas(nuevasPreguntas);
                                }}
                            />

                        {opcion.imagen && (
                            <div className="image-container">
                            <Image src={URL.createObjectURL(opcion.imagen)} size="medium" />
                            <Button
                                negative
                                onClick={() => handleImagenChange({ target: { files: [] } }, index, i)}
                            >
                                Eliminar Imagen
                            </Button>
                            </div>
                        )}
                        </div>
                  )}
                  <div>
                    
                    <Icon
                      name="trash alternate outline"
                      size="large"
                      color="grey"
                      onClick={() => eliminarOpcion(index, i)}
                    />
                    <Icon
                      name="edit outline"
                      size="large"
                      color="blue"
                      onClick={() => activarModoEdicion(index, false, i)}
                    />
                  </div>
                </div>
              ))}
            </Form.Field>
          </Form>
        </Segment>
      ))}
      <Form>
        <Form.Field>
          <label className="nueva-pregunta-label">Nueva Pregunta</label>
          <Input
            className="nueva-pregunta-input"
            placeholder="Escribe tu pregunta aquí"
            value={preguntaActual}
            onChange={handlePreguntaChange}
          />
          <Input
            type="file"
            onChange={(e) => handleImagenChange(e, null)}
          />
          {imagenActual && (
            <div className="image-container">
              <Image src={URL.createObjectURL(imagenActual)} size="medium" />
            </div>
          )}
          <Button primary onClick={handleNuevaPregunta}>
            <Icon name="pencil alternate" /> Nueva Pregunta
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
};

export default PA9Cuestionario;





//Codigo de resetpassword 1ra version 

//Routes, resetpassword.js 

import express from "express";
import { resetpasswordController } from "../controllers/resetpasswordController.js";

const router = express.Router();

router.post("/resetpassword", resetpasswordController);

export default router;


//model resetpasswordmodel.js
import { prisma } from "../conexion.js";
import bcrypt from 'bcrypt';

export class CambioContrasenaModel {
  // Consultar código de verificación por correo
  static getCode = async (correoUsuario) => {
    const cambioContrasena = await prisma.cambioContrasena.findUnique({
      where: { usuarioCorreo: correoUsuario },
    })
    return cambioContrasena;
  }

  // Crear solicitud de cambio de contraseña con código hasheado
  static create = async (datos) => {
    const codigo = generarCodigoVerificacion(); // Generar un código de verificación aleatorio
    const fechaCaducidad = new Date(Date.now() + (60 * 1000 * 10)); // Establecer la fecha de caducidad a 10 minutos

    const codigoHasheado = await bcrypt.hash(codigo, 10); // Hashear el código antes de guardarlo

    const cambioContrasena = prisma.cambioContrasena.create({
      data: {
        codigo: codigoHasheado,
        fechaCaducidad,
        estado: true, // Establecer el estado como verdadero
        usuarioCorreo: datos.correo,
      }
    })
    return cambioContrasena;
  }

  // Comprobar código de verificación y estado
  static verifyCode = async (correoUsuario, codigoVerificacion) => {
    const cambioContrasena = await prisma.cambioContrasena.findUnique({
      where: {
        usuarioCorreo: correoUsuario,
      },
    })

    if (!cambioContrasena || !cambioContrasena.estado) {
      return null; // Si el código no existe o el estado no es verdadero, retornar nulo
    }

    const codigoValido = await bcrypt.compare(codigoVerificacion, cambioContrasena.codigo); // Comparar el código ingresado con el hasheado

    if (codigoValido) {
      return cambioContrasena; // Retornar el registro si el código es válido
    }

    return null;
  }

  // Actualizar contraseña y establecer estado a falso
  static updatePassword = async (correoUsuario, nuevaContrasena) => {
    const saltGenerado = await bcrypt.genSalt(10); // Generar un salt aleatorio
    nuevaContrasena = await bcrypt.hash(nuevaContrasena, saltGenerado); // Hashear la nueva contraseña usando el salt

    const usuario = prisma.usuario.update({
      where: { correo: correoUsuario },
      data: { contrasena: nuevaContrasena },
    })

    // Invalidar el código de verificación una vez actualizada la contraseña
    await prisma.cambioContrasena.update({
      where: { usuarioCorreo: correoUsuario },
      data: { estado: false },
    })

    return usuario;
  }
}


//middleware 

import { CambioContrasenaModel } from "../models/resetpasswordModel.js";

function verifyResetPasswordCode(req, res, next) {
  const { correo, codigoVerificacion } = req.body;

  const cambioContrasena = CambioContrasenaModel.verifyCode(correo, codigoVerificacion);

  if (!cambioContrasena) {
    res.status(403).json({ error: "Código de verificación no válido" });
    return;
  }

  next();
}

module.exports = verifyResetPasswordCode;


//Controller 

import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import { CambioContrasenaModel } from "../models/resetpasswordModel.js";

export const resetpasswordController = async (req, res) => {
  const { correo } = req.body;

  const usuario = await usuarioModel.getByEmail(correo);
  if (!usuario) {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  const codigoVerificacion = Math.random().toString(36).slice(2, 5);
  const codigoVerificacionCifrado = await bcrypt.hash(codigoVerificacion, 10);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ikinnegameplays@gmail.com", // Cambiar por tu usuario de Gmail
      pass: "ldlcflgullvnzbvi", // Cambiar por tu contraseña de Gmail
    },
  });

  await transport.sendMail({
    to: correo,
    subject: "Código de verificación",
    text: `Su código de verificación es: ${codigoVerificacion}`,
  });

  await CambioContrasenaModel.create({ correo }); // Crear la solicitud de cambio de contraseña

  res.json({ message: "Se ha enviado un código de verificación a su correo electrónico." });
};




import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

const ResetPasswordForm = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const handleEnviarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:3000/cambiocontrasena/solicitar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCodigoEnviado(true);
        setMensaje('Código enviado exitosamente al correo del usuario.');
      } else {
        setMensaje(data.mensaje || 'Error al enviar el código.');
      }
    } catch (error) {
      console.error('Error al enviar el código:', error);
      setMensaje('Error interno del servidor.');
    }
  };

  return (
    <Form>
      <Form.Field>
        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </Form.Field>

      <Button primary onClick={handleEnviarCodigo}>
        Enviar Código
      </Button>

      {mensaje && (
        <Message positive={codigoEnviado} negative={!codigoEnviado}>
          <Message.Header>{mensaje}</Message.Header>
        </Message>
      )}
    </Form>
  );
};

export default ResetPasswordForm;






import { Button, Form, Grid, Header, Icon, Image, Modal, Message } from 'semantic-ui-react';
import imagen from '../images/undraw_login_re_4vu2 1.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const PA12RecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const handleEnviarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:3000/cambiocontrasena/solicitar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCodigoEnviado(true);
        setMensaje('Código enviado exitosamente al correo del usuario.');
      } else {
        setMensaje(data.mensaje || 'Error al enviar el código.');
      }
    } catch (error) {
      console.error('Error al enviar el código:', error);
      setMensaje('Error interno del servidor.');
    }
  };

  return (
    <>
      <Grid columns={2} style={{ height: '104vh' }}>
        <Grid.Row>
          <Grid.Column style={{ background: '#E0DCDC' }} stretched>
            <Image src={imagen} alt="Imagen" />
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Header as='h1' style={{ margin: '5% 0 0 5%' }}> Bienvenido a Math Learn Lab</Header>
              <Header as='h1' style={{ margin: '0 0 10% 10%' }}> Restablecer Contraseña</Header>
            </Grid.Row>
            <Grid.Row>
            <Form>
                <Form.Field>
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Form.Field>

                <Button primary onClick={handleEnviarCodigo}>
                  Enviar Código
                </Button>

                <Button type='submit' fluid animated>
                  <Button.Content visible>Iniciar Sesion</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>

                {mensaje && (
                  <Message positive={codigoEnviado} negative={!codigoEnviado}>
                    <Message.Header>{mensaje}</Message.Header>
                  </Message>
                )}
              </Form>
            </Grid.Row>
            <Grid.Row>
            <Segment style={{ margin: "0 10% 0 10%" }} basic textAlign='center'>
                <Link to="/InicioSesion">
                  <Header as='h4' content="Iniciar Sesion" />
                </Link>
                <Divider horizontal> o </Divider>
                <Link to="/">
                  <Header as='h4' content="Regresar a Inicio" />
                </Link>
              </Segment>
              
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default PA12RecuperarContrasena;
