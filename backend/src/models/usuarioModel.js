import { prisma } from "../conexion.js";

export class usuarioModel {

   static getAll = async () => {
      //base de datos
      const usuarios = prisma.usuario.findMany()
      return usuarios
   }

   static getById = async (idUsuario) => {
      const usuario = prisma.usuario.findFirst({ where: { id: idUsuario } })
      return usuario
   }

   static getByEmail = async (correoUsuario) => {
      const usuario = prisma.usuario.findUnique({ where: { correo: correoUsuario } })
      return usuario
   }

   static create = async (datosUsuario) => {
      const usuario = prisma.usuario.create({ data: datosUsuario })
      return usuario
   }

   static update = async (correoUsuario, datosUsuario) => {
      const usuario = prisma.usuario.update({ where: { correo: correoUsuario }, data: datosUsuario })
      return usuario
   }

   static getGroups = async (idUsuario) => {
      const grupos = prisma.usuario.findFirst({
         where: { id: idUsuario },
         include: { grupos: { include: { grupo: true } } }
      })
      return grupos
   }

   //eliminar grupo
   static deleteGroup = async (idGrupo, idUsuario) => {
      // const k = prisma.usuarioEnGrupo.deleteMany({
      //    where:{grupoId:idGrupo}
      // })
      const group = prisma.grupo.delete({
         where: { id: idGrupo }

      })
      return group
   }

   //grupos mover
   static getCount = async (idGrupo) => {
      const integrantes = prisma.usuarios_Grupo.count({
         where: {
            grupoId: idGrupo
         }
      })
      return integrantes
   }
}