import { PreguntaCuestionarioModel } from "../models/preguntacuesModel.js";

export class PreguntaCuestionarioController {
  static async create(req, res) {
    try {
      const actividadId = parseInt(req.params.actividadId);
      const { pregunta, multimedia, fechaLimite, opciones } = req.body;

      // Obtener las opciones de la pregunta
      const opcionesValidas = opciones.map((opcion) => ({
        textOpcion: opcion.textOpcion,
        multimedia: opcion.multimedia,
        correcta: opcion.correcta,
      }));

      // Validar las opciones de la pregunta
      if (!opcionesValidas.length) {
        throw new Error('Debe haber al menos una opción');
      }

      // Crear la pregunta de cuestionario
      const preguntaCuestionario = await PreguntaCuestionarioModel.create(
        actividadId,
        pregunta,
        multimedia,
        fechaLimite,
        opcionesValidas
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

      // Obtener la pregunta de cuestionario
      const preguntaCuestionario = await PreguntaCuestionarioModel.findOne({
        where: { id: preguntaCuestionarioId },
        include: {
          OpcionCuestionario: true,
          Actividad: true,
        },
      });

      if (!preguntaCuestionario) {
        return res.status(404).json({
          mensaje: 'La pregunta de cuestionario no existe',
        });
      }

      res.json(preguntaCuestionario);
    } catch (error) {
      console.error('Error al obtener la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }


  static async update(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);
      const { pregunta, multimedia, fechaLimite, opciones } = req.body;

      // Obtener las opciones de la pregunta
      const opcionesActualizadas = opciones.map((opcion) => ({
        id: opcion.id || -1,
        textOpcion: opcion.textOpcion,
        multimedia: opcion.multimedia,
        correcta: opcion.correcta,
      }));

      // Validar las opciones de la pregunta
      if (!opcionesActualizadas.length) {
        throw new Error('Debe haber al menos una opción');
      }

      // Actualizar la pregunta de cuestionario
      const preguntaCuestionarioActualizada = await PreguntaCuestionarioModel.update(
        preguntaCuestionarioId,
        {
          pregunta,
          multimedia,
          fechaLimite,
          opciones: {
            upsert: opcionesActualizadas,
          },
        }
      );

      res.json({
        mensaje: 'Pregunta de cuestionario actualizada con éxito',
        preguntaCuestionarioActualizada,
      });
    } catch (error) {
      console.error('Error al actualizar la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  // Eliminar
  static async delete(req, res) {
    try {
      const preguntaCuestionarioId = parseInt(req.params.idPreguntaCuestionario);

      // Antes de eliminar, obtenemos la pregunta de cuestionario para poder retornarla
      const preguntaCuestionarioEliminada = await PreguntaCuestionarioModel.delete(
        preguntaCuestionarioId
      );

      res.json(preguntaCuestionarioEliminada);
    } catch (error) {
      console.error('Error al eliminar la pregunta de cuestionario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}