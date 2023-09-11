import { prisma } from "../prisma/conexion.js";

export class preguntaModel {

   static create = async (idActividad, image, data) => {
      const actividad = prisma.pregunta.create({
         data: {
            ...data,
            actividad: { connect: { id: idActividad } },
            multimedia: image
         }
      })
      return actividad
   }

}