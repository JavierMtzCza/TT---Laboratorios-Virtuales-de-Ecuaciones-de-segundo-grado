import { prisma } from "../prisma/conexion.js";

export class usuarioModel {

   static getAll = async () => {
      //base de datos
      const usuarios = prisma.usuario.findMany()
      return usuarios
   }

   static getById = async (idUser) => {
      const usuario = prisma.usuario.findFirst({ where: { id: idUser } })
      return usuario
   }

   static getByEmail = async (emailUser) => {
      const usuario = prisma.usuario.findUnique({ where: { correo: emailUser } })
      return usuario
   }

   static create = async (dataUser) => {
      const usuario = prisma.usuario.create({ data: dataUser })
      return usuario
   }

   static update = async (emailUser, dataUser) => {
      const usuario = prisma.usuario.update({ where: { correo: emailUser }, data: dataUser })
      return usuario
   }

   static getGroups = async (idUser) => {
      const grupos = prisma.usuario.findFirst({
         where: { id: idUser },
         include: { grupos: { include: { grupo: true } } }
      })
      return grupos
   }

   //grupos mover
   static getCount = async (idGrupo) => {
      const integrantes = prisma.usuarios_Grupo.count({
         where:{
            grupoId: idGrupo
         }
      })
      return integrantes
   }
}