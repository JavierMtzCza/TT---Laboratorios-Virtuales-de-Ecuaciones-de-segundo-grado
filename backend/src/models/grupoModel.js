import { prisma } from "../conexion.js";
import { v1 as uuidv1 } from 'uuid';

export class grupoModel {

   static create = async (idAlumno, data) => {
      const claveGrupo = uuidv1().split("-")[0] //Generamos una clave unica para el grupo
      const grupo = prisma.grupo.create({
         data: {
            clave: claveGrupo,
            usuarios: { create: { usuarioId: idAlumno, rol: true } },
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
      const inscripcion = prisma.usuarios_Grupo.create({
         data: {
            grupoId: parseInt(idGrupo),
            usuarioId: parseInt(idUser)
         }
      })
      return inscripcion
   }

   static getUsers = async (idGrupo) => {
      const integrantes = prisma.usuarios_Grupo.findMany({
         where: { grupoId: idGrupo },
         include: { usuario: true }
      })
      return integrantes
   }


}