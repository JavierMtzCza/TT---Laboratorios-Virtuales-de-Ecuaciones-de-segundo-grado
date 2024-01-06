// PreguntaForm.js
import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

const Formulario = () => {
  const [pregunta, setPregunta] = useState("");
  const [imagen, setImagen] = useState(null);
  const [opciones, setOpciones] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar la pregunta y la imagen al backend
    const request = new Request("/api/preguntas", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pregunta, imagen }),
    });

    fetch(request)
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
      });
  };

  const handleCrearOpcion = () => {
    // Obtener la nueva opción del usuario
    const nuevaOpcion = prompt("Escribe la nueva opción");

    if (nuevaOpcion) {
      // Enviar la nueva opción al backend
      const request = new Request("/api/opciones", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preguntaId: datos.id,
          opcion: nuevaOpcion,
        }),
      });

      fetch(request)
        .then((response) => response.json())
        .then((datos) => {
          console.log(datos);
          setOpciones([...opciones, datos]);
        });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Escribe tu pregunta"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <FileInput
          label="Agrega una imagen"
          name="imagen"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />
        <Button type="submit">Enviar</Button>
        <Button onClick={handleCrearOpcion}>Crear opción</Button>
        <ul>
          {opciones.map((opcion, index) => (
            <li key={index}>{opcion.opcion}</li>
          ))}
        </ul>
      </Form>
    </div>
  );
};

export default Formulario;