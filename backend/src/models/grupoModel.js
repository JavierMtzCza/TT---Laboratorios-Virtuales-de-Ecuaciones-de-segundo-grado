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
   static create = async (claveGrupo, idUsuario, data) => {
      const grupo = prisma.grupo.create({
         data: {
            clave: claveGrupo,
            Usuarios: {
               create: { Rol: { connect: { id: 1 } }, Usuario: { connect: { id: idUsuario } } }
            },
            descripcion: data.descripcion,
            nombre: data.nombre
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

   static existeGrupo = async (claveGrupo) => {
      const grupo = prisma.grupo.findUnique({ where: { clave: claveGrupo } })
      return grupo
   }

   static existeRegistro = async (idGrupo, idUsuario) => {
      const registro = await prisma.usuarioEnGrupo.findFirst({
         where: { usuarioId: idUsuario, grupoId: idGrupo }
      });
      return registro
   }

   static eliminarGrupo = async (claveGrupo) => {
      const grupo = await prisma.grupo.delete({
         where: { clave: claveGrupo }
      })

      return grupo
   }

   static actualizarGrupo = async (claveGrupo, dataGrupo) => {
      const grupo = await prisma.grupo.update({
         where: { clave: claveGrupo },
         data: {
            ...dataGrupo
         }
      })
      return grupo
   }

}