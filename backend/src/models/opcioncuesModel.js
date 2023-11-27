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
}


