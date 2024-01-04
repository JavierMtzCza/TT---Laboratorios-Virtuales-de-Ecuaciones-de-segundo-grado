// opcionCuestionarioModel.js
import { prisma } from "../conexion.js";

export class OpcionCuestionarioModel {
  // Crear Opción de Cuestionario
  static create = async (preguntaCuestionarioId, textOpcion, multimedia, correcta) => {
  const opcionCuestionario = await prisma.opcionCuestionario.create({
    data: {
      preguntaCuestionarioId: preguntaCuestionarioId,
      textOpcion: textOpcion,
      multimedia: multimedia,
      correcta: correcta,
    },
    include: {
      PreguntaCuestionario: true,
    },
  });
  return opcionCuestionario;
};
  

  // Obtener Opción de Cuestionario por ID
  static getById = async (opcionCuestionarioId) => {
    const opcionCuestionario = await prisma.opcionCuestionario.findUnique({
      where: { id: opcionCuestionarioId },
      include: {
        PreguntaCuestionario: true,
      },
    });
    return opcionCuestionario;
  };

  // Actualizar Opción de Cuestionario
  static update = async (opcionCuestionarioId, nuevaInformacion) => {
    const opcionCuestionarioActualizada = await prisma.opcionCuestionario.update({
      where: { id: opcionCuestionarioId },
      data: nuevaInformacion,
      include: {
        PreguntaCuestionario: true,
      },
    });
    return opcionCuestionarioActualizada;
  };

  // Eliminar Opción de Cuestionario por ID
  static delete = async (opcionCuestionarioId) => {
    const opcionCuestionarioEliminada = await prisma.opcionCuestionario.delete({
      where: { id: opcionCuestionarioId },
      include: {
        PreguntaCuestionario: true,
      },
    });
    return opcionCuestionarioEliminada;
  };


  // Eliminar todas las opciones asociadas a una pregunta por ID de pregunta
  static deleteAllByPregunta = async (preguntaCuestionarioId) => {
    try {
      const opcionesEliminadas = await prisma.opcionCuestionario.deleteMany({
        where: {
          preguntaCuestionarioId: preguntaCuestionarioId,
        },
      });
      return opcionesEliminadas;
    } catch (error) {
      console.error('Error al eliminar opciones por pregunta:', error);
      throw error;
    }
  };



  // Obtener todas las opciones asociadas a una pregunta
  static getAllByPregunta = async (preguntaCuestionarioId) => {
    const opciones = await prisma.opcionCuestionario.findMany({
      where: {
        preguntaCuestionarioId: preguntaCuestionarioId,
      },
    });
    return opciones;
  };

  // Actualizar Opción de Cuestionario y desactivar otras opciones como correctas
  static updateAndDeactivateOthers = async (opcionCuestionarioId, nuevaInformacion) => {
    const opcionCuestionarioActualizada = await prisma.opcionCuestionario.update({
      where: { id: opcionCuestionarioId },
      data: nuevaInformacion,
      include: {
        PreguntaCuestionario: true,
      },
    });

    // Desactivar otras opciones como correctas
    if (nuevaInformacion.correcta) {
      await prisma.opcionCuestionario.updateMany({
        where: {
          preguntaCuestionarioId: opcionCuestionarioActualizada.PreguntaCuestionario.id,
          id: { not: opcionCuestionarioId },
        },
        data: {
          correcta: false,
        },
      });
    }

    return opcionCuestionarioActualizada;
    };

    //Calcular Opciones Correctas 
    static getAllCorrectasByPregunta = async (preguntaCuestionarioId) => {
      try {
        const opcionesCorrectas = await prisma.opcionCuestionario.findMany({
          where: {
            preguntaCuestionarioId: preguntaCuestionarioId,
            correcta: true,
          },
        });
        return opcionesCorrectas;
      } catch (error) {
        console.error('Error al obtener opciones correctas por pregunta:', error);
        throw error;
      }
    };
  
}
