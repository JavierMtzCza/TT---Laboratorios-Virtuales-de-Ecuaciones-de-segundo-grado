import { PreguntaCuestionarioModel } from "../models/preguntacuesModel.js";

export class PreguntaCuestionarioController {
  static async create(req, res) {
    try {
      const actividadId = parseInt(req.params.actividadId);
      const multimedia = req.file ? req.file.buffer : undefined; // Verificar si hay un nuevo archivo
      const { pregunta, fechaLimite } = req.body;

      const preguntaCuestionario = await PreguntaCuestionarioModel.create(
        actividadId,
        pregunta,
        multimedia,
        fechaLimite
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

  
  static async update(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);
      const { pregunta, multimedia, fechaLimite } = req.body;
  
      // Obtener la pregunta de cuestionario existente
      const preguntaCuestionarioExistente = await PreguntaCuestionarioModel.getById(preguntaCuestionarioId);
  
      // Verificar si se proporciona una nueva imagen o texto
      const nuevaMultimedia = multimedia !== undefined ? multimedia : preguntaCuestionarioExistente.multimedia;
      const nuevaPregunta = pregunta !== undefined ? pregunta : preguntaCuestionarioExistente.pregunta;
  
      // Actualizar la pregunta de cuestionario
      const preguntaCuestionarioActualizada = await PreguntaCuestionarioModel.update(
        preguntaCuestionarioId,
        { pregunta: nuevaPregunta, multimedia: nuevaMultimedia, fechaLimite }
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

  static async delete(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);
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

