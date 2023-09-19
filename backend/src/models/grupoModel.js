import { prisma } from "../conexion.js";
import { v1 as uuidv1 } from 'uuid';

export class grupoModel {

   static create = async (idAlumno, data) => {
      const claveGrupo = uuidv1().split("-")[0] //Generamos una clave unica para el grupo
      const grupo = prisma.grupo.create({
         data: {
            clave: claveGrupo,
            usuarios: { create: { usuario: { connect: { id: idAlumno } }, rol: { connect: { id: 1 } } } },
            ...data
         }
      })
      return grupo
   }

   static getAll = async () => {
      const grupos = prisma.grupo.findMany()
      return grupos
   }

   static inscripcion = async (idGrupo, idUser) => {
      const inscripcion = prisma.usuarioEnGrupo.create({
         data: {
            grupoId: idGrupo,
            usuarioId: idUser,
            rolId: 2
         }
      })
      return inscripcion
   }

   static getUsers = async (idGrupo) => {
      const integrantes = prisma.usuarioEnGrupo.findMany({
         where: { grupoId: idGrupo },
        // include: {  rol:true },
         //select:{usuarioId}
      })
      return integrantes
   }


}