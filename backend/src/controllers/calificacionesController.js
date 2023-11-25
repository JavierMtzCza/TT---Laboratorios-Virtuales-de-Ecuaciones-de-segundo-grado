// calificacionesActividadController.js
import { CalificacionesActividadModel } from "../models/calificacionesModel.js";

export class CalificacionesActividadController {
  static async create(req, res) {
    try {
      const { usuarioId, actividadId, calificacion } = req.body;
      const calificacionActividad = await CalificacionesActividadModel.create(
        usuarioId,
        actividadId,
        calificacion
      );
      res.json({
        mensaje: "Calificación de actividad creada con éxito",
        calificacionActividad,
      });
    } catch (error) {
      console.error("Error al crear la calificación de actividad:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  static async getByIds(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const actividadId = parseInt(req.params.actividadId);
      const calificacionActividad = await CalificacionesActividadModel.getByIds(
        usuarioId,
        actividadId
      );
      res.json(calificacionActividad);
    } catch (error) {
      console.error("Error al obtener la calificación de actividad:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  static async update(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const actividadId = parseInt(req.params.actividadId);
      const { calificacion } = req.body;
      const calificacionActividadActualizada = await CalificacionesActividadModel.update(
        usuarioId,
        actividadId,
        calificacion
      );
      res.json({
        mensaje: "Calificación de actividad actualizada con éxito",
        calificacionActividad: calificacionActividadActualizada,
      });
    } catch (error) {
      console.error("Error al actualizar la calificación de actividad:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  static async delete(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const actividadId = parseInt(req.params.actividadId);
      const calificacionActividadEliminada = await CalificacionesActividadModel.delete(
        usuarioId,
        actividadId
      );
      res.json({
        mensaje: "Calificación de actividad eliminada con éxito",
        calificacionActividad: calificacionActividadEliminada,
      });
    } catch (error) {
      console.error("Error al eliminar la calificación de actividad:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  static async getByActividadId(req, res) {
    try {
      const actividadId = parseInt(req.params.actividadId);
      const calificaciones = await CalificacionesActividadModel.getByActividadId(
        actividadId
      );
      res.json(calificaciones);
    } catch (error) {
      console.error(
        "Error al obtener las calificaciones de actividad por ID de actividad:",
        error
      );
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  static async getByUsuarioId(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId);
      const calificaciones = await CalificacionesActividadModel.getByUsuarioId(
        usuarioId
      );
      res.json(calificaciones);
    } catch (error) {
      console.error(
        "Error al obtener las calificaciones de actividad por ID de usuario:",
        error
      );
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
}
