import { prisma } from "../conexion.js";

export class PreguntaCuestionarioModel {
  // Crear Pregunta de Cuestionario
  static create = async (actividadId, pregunta, multimedia, fechaLimite) => {
    const preguntaCuestionario = await prisma.preguntaCuestionario.create({
      data: {
        actividadId: actividadId,
        pregunta: pregunta,
        multimedia: multimedia,
        fechaLimite: new Date(fechaLimite),
      },
      include: {
        Actividad: true,
      },
    });
    return preguntaCuestionario;
  };

  // Obtener Pregunta de Cuestionario por ID
  static getById = async (preguntaCuestionarioId) => {
    const preguntaCuestionario = await prisma.preguntaCuestionario.findUnique({
      where: { id: preguntaCuestionarioId },
      include: {
        Actividad: true,
      },
    });
    return preguntaCuestionario;
  };

  // Actualizar Pregunta de Cuestionario
  static update = async (preguntaCuestionarioId, nuevaInformacion) => {
    const preguntaCuestionarioActualizada = await prisma.preguntaCuestionario.update({
      where: { id: preguntaCuestionarioId },
      data: nuevaInformacion,
      include: {
        Actividad: true,
      },
    });
    return preguntaCuestionarioActualizada;
  };

  // Eliminar Pregunta de Cuestionario por ID
  static delete = async (preguntaCuestionarioId) => {
    const preguntaCuestionarioEliminada = await prisma.preguntaCuestionario.delete({
      where: { id: preguntaCuestionarioId },
      include: {
        Actividad: true,
      },
    });
    return preguntaCuestionarioEliminada;
  };
}
