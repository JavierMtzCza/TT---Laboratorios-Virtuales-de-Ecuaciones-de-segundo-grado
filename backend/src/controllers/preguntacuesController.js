import { PreguntaCuestionarioModel } from "../models/preguntacuesModel.js";
import {OpcionCuestionarioController} from "./opcioncuesController.js"


export class PreguntaCuestionarioController {
  static async create(req, res) {
    try {
      const actividadId = parseInt(req.params.actividadId);
      const multimedia = req.file ? req.file.buffer : undefined; // Verificar si hay un nuevo archivo
      const { pregunta } = req.body;

      const preguntaCuestionario = await PreguntaCuestionarioModel.create(
        actividadId,
        pregunta,
        multimedia,
        
      );

      res.json({
        mensaje: 'Pregunta de cuestionario creada con éxito',
        preguntaCuestionario,
      });
    } catch (error) {
      console.error('Error al crear la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }


  static async createBatch(req, res) {
    try {
      const actividadId = parseInt(req.params.actividadId);
      const preguntas = req.body.preguntas; // Asegúrate de que las preguntas se envíen como un array en el cuerpo de la solicitud

      const preguntasCreadas = await Promise.all(
        preguntas.map(async (pregunta) => {
          // Lógica para crear cada pregunta en el lote
          const preguntaCuestionario = await PreguntaCuestionarioModel.create(
            actividadId,
            pregunta.pregunta,
            pregunta.multimedia
          );
          return preguntaCuestionario;
        })
      );

      res.json({
        mensaje: 'Preguntas de cuestionario creadas con éxito en lote',
        preguntasCreadas,
      });
    } catch (error) {
      console.error('Error al crear preguntas de cuestionario en lote:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  //Obtener una pregunta de una actividad 
  static async getById(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);
      const preguntaCuestionario = await PreguntaCuestionarioModel.getById(
        preguntaCuestionarioId
      );
      res.json(preguntaCuestionario);
    } catch (error) {
      console.error('Error al obtener la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  //Obtener todas las Preguntas relacionadas a una Actividad 
  static async getAllByActividad(req, res) {
    try {
      const actividadId = parseInt(req.params.actividadId);
      const preguntas = await PreguntaCuestionarioModel.getAllByActividad(actividadId);
      res.json(preguntas);
    } catch (error) {
      console.error('Error al obtener preguntas por actividad:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }


  
  static async update(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);
      const { pregunta, multimedia  } = req.body;
  
      // Obtener la pregunta de cuestionario existente
      const preguntaCuestionarioExistente = await PreguntaCuestionarioModel.getById(preguntaCuestionarioId);
  
      // Verificar si se proporciona una nueva imagen o texto
      const nuevaMultimedia = multimedia !== undefined ? multimedia : preguntaCuestionarioExistente.multimedia;
      const nuevaPregunta = pregunta !== undefined ? pregunta : preguntaCuestionarioExistente.pregunta;
  
      // Actualizar la pregunta de cuestionario
      const preguntaCuestionarioActualizada = await PreguntaCuestionarioModel.update(
        preguntaCuestionarioId,
        { pregunta: nuevaPregunta, multimedia: nuevaMultimedia }
      );
  
      res.json({
        mensaje: 'Pregunta de cuestionario actualizada con éxito',
        preguntaCuestionario: preguntaCuestionarioActualizada,
      });
    } catch (error) {
      console.error('Error al actualizar la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  //Función para calificar el cuestionario 
  static async calificarRespuestas(alumnoRespuestas, preguntaCuestionarioId) {
    try {
      const opcionesCorrectas = await OpcionCuestionarioModel.getAllCorrectasByPregunta(
        preguntaCuestionarioId
      );

      // Comparar respuestas del alumno con opciones correctas
      const calificacion = calcularCalificacion(alumnoRespuestas, opcionesCorrectas);

      return calificacion;
    } catch (error) {
      console.error('Error al calificar respuestas:', error);
      throw error;
    }
  }


  
  static async delete(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);

      // Eliminar opciones asociadas a la pregunta
      await OpcionCuestionarioController.deleteAllByPregunta(preguntaCuestionarioId);

      // Eliminar la pregunta
      const preguntaCuestionarioEliminada = await PreguntaCuestionarioModel.delete(
        preguntaCuestionarioId
      );

      res.json({
        mensaje: 'Pregunta de cuestionario eliminada con éxito',
        preguntaCuestionario: preguntaCuestionarioEliminada,
      });
    } catch (error) {
      console.error('Error al eliminar la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  
  
}

