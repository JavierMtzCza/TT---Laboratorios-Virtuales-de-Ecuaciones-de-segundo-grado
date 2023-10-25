// funciones.js
export function handlePreguntaChange(e, setPreguntaActual) {
    setPreguntaActual(e.target.value);
  }
  
  export function handleImagenChange(e, setImagenActual) {
    const file = e.target.files[0];
    setImagenActual(file);
  }
  
  export function handleNuevaPregunta(
    preguntaActual,
    imagenActual,
    opcionCorrecta,
    setPreguntas,
    setPreguntaActual,
    setImagenActual,
    setOpcionCorrecta,
    setCantidadOpciones
  ) {
    // Guardar la pregunta actual, la imagen (si existe) y la opción correcta en la lista de preguntas.
    const nuevaPregunta = {
      pregunta: preguntaActual,
      imagen: imagenActual,
      opciones: [],
      opcionCorrecta: opcionCorrecta,
    };
    setPreguntas([...setPreguntas, nuevaPregunta]);
  
    // Restablecer el formulario para una nueva pregunta.
    setPreguntaActual('');
    setImagenActual(null);
    setOpcionCorrecta('');
    setCantidadOpciones(0); // Reiniciar la cantidad de opciones disponibles a 0
  }
  
  export function eliminarPregunta(index, preguntas, setPreguntas) {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas.splice(index, 1);
    setPreguntas(nuevasPreguntas);
  }
  
  export function evaluarRespuestas() {
    // Agregar lógica para evaluar respuestas aquí si es necesario.
  }
  
  export function agregarOpcion(indexPregunta, preguntas, setPreguntas, setCantidadOpciones) {
    const pregunta = preguntas[indexPregunta];
  
    if (pregunta.opciones.length < 5) { // Verifica que no se exceda de 5 opciones
      const nuevasOpciones = [...pregunta.opciones, { respuesta: '', imagen: null }];
      const nuevasPreguntas = [...preguntas];
      nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;
  
      // Incrementar la cantidad de opciones disponibles, pero no más de 5
      setCantidadOpciones((prev) => (prev < 5 ? prev + 1 : prev));
  
      setPreguntas(nuevasPreguntas);
    }
  }
  
  export function eliminarOpcion(indexPregunta, indexOpcion, preguntas, setPreguntas, setCantidadOpciones) {
    const pregunta = preguntas[indexPregunta];
    const nuevasOpciones = [...pregunta.opciones];
    nuevasOpciones.splice(indexOpcion, 1);
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indexPregunta].opciones = nuevasOpciones;
  
    // Disminuir la cantidad de opciones disponibles al eliminar una opción, pero no menos de 0
    setCantidadOpciones((prev) => (prev > 0 ? prev - 1 : prev));
  
    setPreguntas(nuevasPreguntas);
  }
  
  export function activarModoEdicion(index, editandoPregunta, opcionIndex, setEditandoPregunta, setEditandoIndex, setEditandoOpcionIndex) {
    setEditandoPregunta(editandoPregunta);
    setEditandoIndex(index);
  
    if (opcionIndex !== undefined) {
      setEditandoOpcionIndex(opcionIndex);
    } else {
      setEditandoOpcionIndex(null); // Restablece el índice de la opción en edición
    }
  }
  
  export function guardarEdicion(setEditandoPregunta, setEditandoIndex, setEditandoOpcionIndex) {
    // Aquí podemos guardamos la edición de la pregunta u opción en el estado.
    setEditandoPregunta(false);
    setEditandoIndex(null);
    setEditandoOpcionIndex(null);
  }
  
  export function cancelarEdicion(setEditandoPregunta, setEditandoIndex, setEditandoOpcionIndex) {
    setEditandoPregunta(false);
    setEditandoIndex(null);
    setEditandoOpcionIndex(null);
  }
  