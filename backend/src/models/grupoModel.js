import { prisma } from "../conexion.js";

export class grupoModel {

   //listar grupos
   static getAll = async () => {
      const grupos = prisma.grupo.findMany()
      return grupos
   }

   //Listar integrantes de un grupo
   static getUsers = async (idGrupo) => {
      const usuarios = prisma.usuarioEnGrupo.findMany({
         where: { grupoId: idGrupo },
         include: { Usuario: true }
      })

      return usuarios
   }

   // Creacion de un grupo
   static create = async (correoUsuario, claveGrupo, data) => {
      const grupo = prisma.grupo.create({
         data: {
            clave: claveGrupo,
            Usuarios: {
               create: { Rol: { connect: { id: 1 } }, Usuario: { connect: { correo: correoUsuario } } }
            },
            ...data
         }
      })
      return grupo
   }

   // Inscripcion de un usuario a un grupo
   static inscripcion = async (idGrupo, idUsuario) => {
      const inscripcion = await prisma.usuarioEnGrupo.create({
         data: {
            grupoId: idGrupo,
            usuarioId: idUsuario,
            rolId: 2,
         },
      });

      return inscripcion;
   }

   static existeGrupo = async (idGrupo) => {
      const grupo = prisma.grupo.findUnique({ where: { id: idGrupo } })
      return grupo
   }

   static existeRegistro = async (idGrupo, idUsuario) => {
      const registro = await prisma.usuarioEnGrupo.findFirst({
         where: { usuarioId: idUsuario, grupoId: idGrupo }
      });
      return registro
   }


}