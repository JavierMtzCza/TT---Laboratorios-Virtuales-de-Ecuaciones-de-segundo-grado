import { prisma } from "../conexion.js";

export class PreguntaCuestionarioModel {
  // Crear Pregunta de Cuestionario
  static create = async (actividadId, pregunta, multimedia, fechaLimite, opciones) => {
    // Obtener las opciones de la pregunta
    const opcionesValidas = opciones.map((opcion) => ({
      textOpcion: opcion.textOpcion,
      multimedia: opcion.multimedia,
      correcta: opcion.correcta,
    }));

    // Crear la pregunta de cuestionario
    const preguntaCuestionario = await prisma.preguntaCuestionario.create({
      data: {
        actividadId: actividadId,
        pregunta: pregunta,
        multimedia: multimedia,
        fechaLimite: new Date(fechaLimite),
        OpcionCuestionario: {
          create: opcionesValidas,
        },
      },
    });

    return preguntaCuestionario;
  };

  // Obtener Pregunta de Cuestionario por ID
  static getById = async (preguntaCuestionarioId) => {
    return await prisma.preguntaCuestionario.findOne({
      where: { id: preguntaCuestionarioId },
      include: {
        OpcionCuestionario: true,
        Actividad: true,
      },
    });
  };

  // Actualizar Pregunta de Cuestionario
  static update = async (preguntaCuestionarioId, nuevaInformacion) => {
    // Obtener la pregunta de cuestionario actual antes de la actualización
    const preguntaCuestionarioActual = await prisma.preguntaCuestionario.findOne({
      where: { id: preguntaCuestionarioId },
      include: { OpcionCuestionario: true },
    });

    // Obtener las opciones de la pregunta
    const opcionesActualizadas = nuevaInformacion.opciones.map((opcion) => ({
      id: opcion.id || -1,
      textOpcion: opcion.textOpcion,
      multimedia: opcion.multimedia,
      correcta: opcion.correcta,
    }));

    // Actualizar la pregunta de cuestionario
    const preguntaCuestionarioActualizada = await prisma.preguntaCuestionario.update({
      where: { id: preguntaCuestionarioId },
      data: {
        pregunta: nuevaInformacion.pregunta || preguntaCuestionarioActual.pregunta,
        multimedia: nuevaInformacion.multimedia || preguntaCuestionarioActual.multimedia,
        fechaLimite: nuevaInformacion.fechaLimite || preguntaCuestionarioActual.fechaLimite,
        OpcionCuestionario: {
          upsert: opcionesActualizadas,
        },
      },
    });

    return preguntaCuestionarioActualizada;
  };

  // Eliminar
  static delete = async (preguntaCuestionarioId) => {
    // Antes de eliminar, obtenemos la pregunta de cuestionario para poder retornarla
    const preguntaCuestionarioEliminada = await prisma.preguntaCuestionario.delete(
      preguntaCuestionarioId
    );

    // También eliminamos cualquier calificación asociada a esta pregunta
    await prisma.calificacionesActividad.deleteMany({
      where: { actividadId: preguntaCuestionarioEliminada.actividadId },
    });

    return preguntaCuestionarioEliminada;
  };
}