// calificacionesActividadModel.js
import { prisma } from "../conexion.js";

export class CalificacionesActividadModel {
  // Crear Calificación de Actividad
  static create = async (usuarioId, actividadId, calificacion) => {
    const calificacionActividad = await prisma.calificacionesActividad.create({
      data: {
        usuarioId: usuarioId,
        actividadId: actividadId,
        calificacion: calificacion,
      },
      include: {
        Usuario: true,
        Actividad: true,
      },
    });
    return calificacionActividad;
  };

  // Obtener Calificación de Actividad por ID de Usuario y ID de Actividad
  static getByIds = async (usuarioId, actividadId) => {
    const calificacionActividad = await prisma.calificacionesActividad.findUnique({
      where: { usuarioId_actividadId: { usuarioId, actividadId } },
      include: {
        Usuario: true,
        Actividad: true,
      },
    });
    return calificacionActividad;
  };

  // Actualizar Calificación de Actividad
  static update = async (usuarioId, actividadId, nuevaCalificacion) => {
    const calificacionActividadActualizada = await prisma.calificacionesActividad.update({
      where: { usuarioId_actividadId: { usuarioId, actividadId } },
      data: { calificacion: nuevaCalificacion },
      include: {
        Usuario: true,
        Actividad: true,
      },
    });
    return calificacionActividadActualizada;
  };

  // Eliminar Calificación de Actividad
  static delete = async (usuarioId, actividadId) => {
    // Antes de eliminar, obtenemos la calificación de actividad para poder retornarla en la respuesta
    const calificacionActividadEliminada = await prisma.calificacionesActividad.delete({
      where: { usuarioId_actividadId: { usuarioId, actividadId } },
      include: {
        Usuario: true,
        Actividad: true,
      },
    });

    return calificacionActividadEliminada;
  };

  // Obtener todas las calificaciones de una actividad
  static getByActividadId = async (actividadId) => {
    const calificaciones = await prisma.calificacionesActividad.findMany({
      where: { actividadId: actividadId },
      include: {
        Usuario: true,
        Actividad: true,
      },
    });
    return calificaciones;
  };

  // Obtener todas las calificaciones de un usuario
  static getByUsuarioId = async (usuarioId) => {
    const calificaciones = await prisma.calificacionesActividad.findMany({
      where: { usuarioId: usuarioId },
      include: {
        Usuario: true,
        Actividad: true,
      },
    });
    return calificaciones;
  };
}
