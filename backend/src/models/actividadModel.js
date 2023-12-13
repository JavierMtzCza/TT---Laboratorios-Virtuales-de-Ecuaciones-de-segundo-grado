import { prisma } from "../conexion.js";

export class ActividadModel {

   // Crear Actividad 
   static create = async (nombre, descripcion, fechaLimite, tipo, idGrupo) => {
      const actividad = prisma.actividad.create({
         data: {
            grupoId: idGrupo,
            nombre: nombre,
            descripcion: descripcion,
            fechaLimite: new Date(fechaLimite),
            tipo: tipo,
         },
      });
      return actividad;
   }

   // Obtener las actividades 
   static getAll = async (idGrupo) => {
      const actividades = prisma.actividad.findMany({ where: { grupoId: idGrupo } })
      return actividades;
   }

   static getById = async (actividadId) => {
      const actividad = prisma.actividad.findUnique({
         where: { id: actividadId },
         include: {
            PreguntaCuestionario: {
               include: {
                  OpcionCuestionario: true,
               },
            },
            PreguntaEjercicio: {
               include: {
                  OpcionEjercicio: true,
               },
            },
            Calificaciones: {
               include: {
                  Usuario: true,
               },
            },
         },
      });
      return actividad;
   }

   // Actualizar Actividad 
   static update = async (actividadId, nuevaInformacion) => {
      const actividadActualizada = prisma.actividad.update({
         where: { id: actividadId },
         data: {
            nombre: nuevaInformacion.nombre, // Agregar el campo "nombre"
            descripcion: nuevaInformacion.descripcion,
            fechaLimite: nuevaInformacion.fechaLimite,
            tipo: nuevaInformacion.tipo,
         },
         include: {
            grupo: true,
            PreguntaaCuestionario: {
               include: {
                  OpcionCuestionario: true,
               },
            },
            PreguntaEjercicio: {
               include: {
                  OpcionEjercicio: true,
               },
            },
            Calificaciones: {
               include: {
                  Usuario: true,
               },
            },
         },
      });
      return actividadActualizada;
   }

   //Eliminar Actividad 
   static delete = async (actividadId) => {
      const actividadEliminada = await prisma.actividad.delete({
         where: { id: actividadId },
      });
      return actividadEliminada;
   }
}
