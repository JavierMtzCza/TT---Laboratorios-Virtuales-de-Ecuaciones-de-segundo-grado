import { prisma } from "../conexion.js";

export class usuarioModel {

   // Consultar usuarios
   static getAll = async () => {
      const usuarios = prisma.usuario.findMany()
      return usuarios
   }

   // Consultar usuario por Correo
   static getByEmail = async (correoUsuario) => {
      const usuario = prisma.usuario.findUnique({ where: { correo: correoUsuario } })
      return usuario
   }

   // Crear usuario
   static create = async (datosUsuario) => {
      const usuario = prisma.usuario.create({ data: datosUsuario })
      return usuario
   }

   // Modificar usuario
   static update = async (correoUsuario, datosUsuario) => {
      const usuario = prisma.usuario.update({ where: { correo: correoUsuario }, data: datosUsuario })
      return usuario
   }

   // Consultar los grupos a los que pertenece ese usuario
   static getGroups = async (correoUsuario) => {
      const usuario = await prisma.usuario.findUnique({
         where: { correo: correoUsuario },
         include:{Grupos:{include:{Grupo:true}}}
      });

      const grupos = usuario.Grupos.map(grupo => grupo.Grupo);
      return grupos;
   }

}