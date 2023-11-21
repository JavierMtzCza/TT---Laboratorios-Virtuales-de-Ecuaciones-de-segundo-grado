import { prisma } from "../conexion.js";

export class PreguntaCuestionarioModel {
   static create = async (actividadId, pregunta, multimedia) => {
      const preguntaCuestionario = prisma.preguntaCuestionario.create({
         data: {
            actividadId: actividadId,
            pregunta: pregunta,
            multimedia: multimedia,
         },
      });
      return preguntaCuestionario;
   }

   static getById = async (preguntaCuestionarioId) => {
      const preguntaCuestionario = prisma.preguntaCuestionario.findUnique({
         where: { id: preguntaCuestionarioId },
         include: {
            OpcionCuestionario: true,
         },
      });
      return preguntaCuestionario;
   }

   static update = async (preguntaCuestionarioId, nuevaInformacion) => {
      const preguntaCuestionarioActualizada = prisma.preguntaCuestionario.update({
         where: { id: preguntaCuestionarioId },
         data: {
            pregunta: nuevaInformacion.pregunta,
            multimedia: nuevaInformacion.multimedia,
         },
         include: {
            OpcionCuestionario: true,
         },
      });
      return preguntaCuestionarioActualizada;
   }
}