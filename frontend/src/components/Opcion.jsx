import React from 'react';
import { Input, Image, Button, Icon } from 'semantic-ui-react';

const Opcion = ({
  pregunta,
  indexPregunta,
  indexOpcion,
  
  editandoIndex,
  editandoPregunta,
  editandoOpcionIndex,
  handleImagenChange,
  guardarEdicion,
  cancelarEdicion,
  eliminarOpcion,
  activarModoEdicion,
}) => {
  return (
    <div key={indexOpcion}>
      {editandoIndex === indexPregunta && !editandoPregunta && editandoOpcionIndex === indexOpcion ? (
        <div>
          <Input
            placeholder="Edita la opción"
            value={pregunta.opciones[indexOpcion].respuesta}
            onChange={(e) => {
              const nuevasPreguntas = [...preguntas];
              nuevasPreguntas[indexPregunta].opciones[indexOpcion].respuesta = e.target.value;
              setPreguntas(nuevasPreguntas);
            }}
          />
          <Input
            type="file"
            onChange={(e) => handleImagenChange(e, indexPregunta, indexOpcion)}
          />
          <Button primary onClick={guardarEdicion}>Guardar</Button>
          <Button secondary onClick={cancelarEdicion}>Cancelar</Button>
        </div>
      ) : (
        <Input
          placeholder={`Opción ${indexOpcion + 1}`}
          value={pregunta.opciones[indexOpcion].respuesta}
          onChange={(e) => {
            const nuevasOpciones = [...pregunta.opciones];
            nuevasOpciones[indexOpcion].respuesta = e.target.value;
            const nuevasPreguntas = [...preguntas];
            nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;
            setPreguntas(nuevasPreguntas);
          }}
        />
      )}
      <Input
        type="file"
        onChange={(e) => {
          const nuevasOpciones = [...pregunta.opciones];
          nuevasOpciones[indexOpcion].imagen = e.target.files[0];
          const nuevasPreguntas = [...preguntas];
          nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;
          setPreguntas(nuevasPreguntas);
        }}
      />
      {pregunta.opciones[indexOpcion].imagen && (
        <div>
          <Image src={URL.createObjectURL(pregunta.opciones[indexOpcion].imagen)} size="medium" />
          <Button
            negative
            onClick={() => handleImagenChange({ target: { files: [] } }, indexPregunta, indexOpcion)}
          >
            Eliminar Imagen
          </Button>
        </div>
      )}
      <Icon
        name="trash"
        size="large"
        color="red"
        onClick={() => eliminarOpcion(indexPregunta, indexOpcion)}
      />
      <Icon
        name="edit"
        size="large"
        color="blue"
        onClick={() => activarModoEdicion(indexPregunta, false, indexOpcion)}
      />
    </div>
  );
};

export default Opcion;
