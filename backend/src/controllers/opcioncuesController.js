// opcionCuestionarioController.js
import { OpcionCuestionarioModel } from "../models/opcioncuesModel.js";

export class OpcionCuestionarioController {
  static async create(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.preguntaCuestionarioId);
      const multimedia = req.file.buffer;
      const { textOpcion, correcta,  } = req.body;
      const correctaBoolean = !!correcta;

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
      const opcionCuestionarioId = parseInt(req.params.opcionCuestionarioId);  // Aquí cambiamos a opcionCuestionarioId
      const opcionCuestionario = await OpcionCuestionarioModel.getById(opcionCuestionarioId);
      res.json(opcionCuestionario);
    } catch (error) {
      console.error('Error al obtener la opción de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async update(req, res) {
    try {
      const opcionCuestionarioId = parseInt(req.params.opcionCuestionarioId);
      const { textOpcion, correcta } = req.body;
      const multimedia = req.file ? req.file.buffer : undefined;

      // Convertir correcta a booleano
      const correctaBoolean = !!correcta;

      // Construir un objeto con los campos proporcionados
      const datosActualizados = {};
      if (textOpcion) datosActualizados.textOpcion = textOpcion;
      if (multimedia !== undefined) datosActualizados.multimedia = multimedia;
      if (correcta !== undefined) datosActualizados.correcta = correctaBoolean;

      const opcionCuestionarioActualizada = await OpcionCuestionarioModel.update(
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
}



