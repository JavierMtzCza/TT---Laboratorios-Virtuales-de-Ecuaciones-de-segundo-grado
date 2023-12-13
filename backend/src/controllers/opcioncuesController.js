// opcionCuestionarioController.js
import { OpcionCuestionarioModel } from "../models/opcioncuesModel.js";

export class OpcionCuestionarioController {
  static async create(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.preguntaCuestionarioId);
      const multimedia = req.file ? req.file.buffer : undefined; // Verificar si hay un nuevo archivo
      const { textOpcion, correcta } = req.body;

      // Convertir correcta a booleano
      const correctaBoolean = correcta === "true";

      const opcionCuestionario = await OpcionCuestionarioModel.create(
        preguntaCuestionarioId,
        textOpcion,
        multimedia,
        correctaBoolean
      );

      res.json({
        mensaje: 'Opción de cuestionario creada con éxito',
        opcionCuestionario,
      });
    } catch (error) {
      console.error('Error al crear la opción de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async getById(req, res) {
    try {
      const opcionCuestionarioId = parseInt(req.params.opcionCuestionarioId);
      const opcionCuestionario = await OpcionCuestionarioModel.getById(opcionCuestionarioId);
      res.json(opcionCuestionario);
    } catch (error) {
      console.error('Error al obtener la opción de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  // Obtener todas las opciones (correctas o no) asociadas a una pregunta por ID
  static async getAllByPregunta(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.preguntaCuestionarioId);
      const opciones = await OpcionCuestionarioModel.getAllByPregunta(preguntaCuestionarioId);
      res.json(opciones);
    } catch (error) {
      console.error('Error al obtener opciones por pregunta desde el controlador:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async update(req, res) {
    try {
      const opcionCuestionarioId = parseInt(req.params.opcionCuestionarioId);
      const { textOpcion, correcta } = req.body;
      const multimedia = req.file ? req.file.buffer : undefined;

      // Convertir correcta a booleano
      const correctaBoolean = correcta === "true";

      // Obtener la opción de cuestionario antes de la actualización
      const opcionCuestionarioExistente = await OpcionCuestionarioModel.getById(opcionCuestionarioId);

      // Construir un objeto con los campos proporcionados
      const datosActualizados = {};
      if (textOpcion !== undefined) datosActualizados.textOpcion = textOpcion;
      if (multimedia !== undefined) datosActualizados.multimedia = multimedia;
      if (correcta !== undefined) {
        // Cambiar el estado de correcta solo si se proporciona y si es diferente al estado actual
        datosActualizados.correcta = correctaBoolean !== opcionCuestionarioExistente.correcta ? correctaBoolean : undefined;
      }

      const opcionCuestionarioActualizada = await OpcionCuestionarioModel.updateAndDeactivateOthers(
        opcionCuestionarioId,
        datosActualizados
      );

      res.json({
        mensaje: 'Opción de cuestionario actualizada con éxito',
        opcionCuestionario: opcionCuestionarioActualizada,
      });
    } catch (error) {
      console.error('Error al actualizar la opción de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async delete(req, res) {
    try {
      const opcionCuestionarioId = parseInt(req.params.opcionCuestionarioId);
      const opcionCuestionarioEliminada = await OpcionCuestionarioModel.delete(opcionCuestionarioId);

      res.json({
        mensaje: 'Opción de cuestionario eliminada con éxito',
        opcionCuestionario: opcionCuestionarioEliminada,
      });
    } catch (error) {
      console.error('Error al eliminar la opción de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }


  static async deleteAllByPregunta(preguntaCuestionarioId) {
    try {
      const opcionesEliminadas = await OpcionCuestionarioModel.deleteAllByPregunta(preguntaCuestionarioId);
      return opcionesEliminadas;
    } catch (error) {
      console.error('Error al eliminar opciones por pregunta:', error);
      throw error;
    }
  }
}
