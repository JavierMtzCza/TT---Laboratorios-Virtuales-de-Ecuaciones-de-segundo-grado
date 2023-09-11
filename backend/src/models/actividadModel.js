import { prisma } from "../conexion.js";

export class actividadModel {

   static create = async (idGrupo, description) => {
      const actividad = prisma.actividad.create({
         data: {
            grupoId: idGrupo,
            descripcion: description
         }
      })
      return actividad
   }

   static getAll = async (idGrupo) => {
      const actividades = prisma.actividad.findMany({
         where: { grupoId: idGrupo },
         include: {
            grupo: true,
            preguntas: true
         }
      })
      return actividades
   }

}