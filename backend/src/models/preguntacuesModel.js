import { prisma } from "../conexion.js";


export class PreguntaCuestionarioModel {
  // Crear Pregunta de Cuestionario
  static create = async (actividadId, pregunta, multimedia) => {
    try {
      const preguntaCuestionario = await prisma.preguntaCuestionario.create({
        data: {
          actividadId: actividadId,
          pregunta: pregunta,
          multimedia: multimedia,
        },
        include: {
          Actividad: true,
        },
      });
      return preguntaCuestionario;
    } catch (error) {
      console.error('Error al crear pregunta de cuestionario:', error);
      throw error;
    }
  }

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

  //Obtener todas las preguntas de una actividad 
  static getAllByActividad = async (actividadId) => {
    try {
      const preguntas = await prisma.preguntaCuestionario.findMany({
        where: {
          actividadId: actividadId,
        },
        include: {
          OpcionCuestionario: true, // Incluye las opciones relacionadas
        },
      });
      return preguntas;
    } catch (error) {
      console.error('Error al obtener preguntas por actividad desde el modelo:', error);
      throw error;
    }
  };

  // Actualizar Pregunta de Cuestionario
  static update = async (preguntaCuestionarioId, nuevaInformacion) => {
    const preguntaCuestionarioActualizada = await prisma.preguntaCuestionario.update({
      where: { id: preguntaCuestionarioId },
      data: {
        pregunta: nuevaInformacion.pregunta,
        multimedia: nuevaInformacion.multimedia,
        // Otros campos que puedas tener...
      },
    });
    return preguntaCuestionarioActualizada;
  };



  //Eliminar pregunta con sus opciones asociadas
  static delete = async (preguntaCuestionarioId) => {
    try {
      const preguntaCuestionarioEliminada = await prisma.preguntaCuestionario.delete({
        where: { id: preguntaCuestionarioId },
        include: {
          Actividad: true,
        },
      });

      return preguntaCuestionarioEliminada;
    } catch (error) {
      console.error('Error al eliminar la pregunta de cuestionario:', error);
      throw error;
    }
  };
}
