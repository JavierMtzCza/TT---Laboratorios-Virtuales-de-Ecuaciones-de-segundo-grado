import { prisma } from "../conexion.js";
import bcrypt from 'bcrypt'

export class usuarioModel {

   // Consultar usuarios
   static getAll = async () => {
      const usuarios = prisma.usuario.findMany()
      return usuarios
   }

   // Consultar usuario por Correo
   static getByEmail = async (correoUsuario) => {
      const usuario = prisma.usuario.findUnique({
         where: { correo: correoUsuario, estado: true }, select: {
            id: true,
            nombre: true,
            apellido_paterno: true,
            apellido_materno: true,
            correo: true,
            contrasena: true //TODO: quitar contra
         },
      })
      return usuario
   }

   // Consultar usuario por Correo
   static getPassword = async (correoUsuario) => {
      const password = prisma.usuario.findUnique({
         where: { correo: correoUsuario }, select: { contrasena: true },
      })
      return password
   }

   // Crear usuario
   static create = async (datosUsuario) => {
      const saltGenerado = await bcrypt.genSalt(10); // Generar un salt aleatorio
      datosUsuario.contrasena = await bcrypt.hash(datosUsuario.contrasena, saltGenerado); // Hashear la contraseña usando el salt

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
         include: { UsuarioEnGrupo: { include: { Grupo: true } } }
      })

      console.log(usuario)
      const grupos = usuario.UsuarioEnGrupo.map(grupo => grupo.Grupo);
      return grupos;
   }

}