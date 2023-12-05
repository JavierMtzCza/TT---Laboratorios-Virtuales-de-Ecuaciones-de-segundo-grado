import { prisma } from "../conexion.js";

export class ActividadModel {

   // Crear Actividad 
   static create = async (idGrupo, nombre, descripcion, fechaLimite, tipo, claveGrupo) => {
      const actividad = prisma.actividad.create({
         data: {
            Grupo: {
               connect: { clave: claveGrupo },
            },
            nombre: nombre,
            descripcion: descripcion,
            fechaLimite: new Date(fechaLimite),
            tipo: tipo,
         },
      });
      return actividad;
   }
   

   // Obtener las actividades 
   static getAll = async (claveGrupo) => {
      const actividades = prisma.actividad.findMany({ where: { grupo: { clave: claveGrupo } } })
      return actividades;
   }

   static getByClave = async (claveGrupo) => {
      const grupo = prisma.grupo.findUnique({
         where: { clave: claveGrupo },
      });
      return grupo;
   }

   static getById = async (actividadId) => {
      const actividad = prisma.actividad.findUnique({
         where: { id: actividadId },
         include: {
            grupo: true,
            preguntasCuestionario: {
               include: {
                  OpcionCuestionario: true,
               },
            },
            preguntasEjercicio: {
               include: {
                  OpcionEjercicio: true,
               },
            },
            calificaciones: true,
         },
      });
      return actividad;
   }

   // Actualizar Actividad 
   static update = async (actividadId, nuevaInformacion) => {
      const actividadActualizada = prisma.actividad.update({
         where: { id: actividadId },
         data: {
            Grupo: {
               connect: { clave: nuevaInformacion.claveGrupo }, // Conectar por clave del grupo
            },
            nombre: nuevaInformacion.nombre,
            descripcion: nuevaInformacion.descripcion,
            fechaLimite: nuevaInformacion.fechaLimite,
            tipo: nuevaInformacion.tipo,
         },
         include: {
            grupo: true,
            preguntasCuestionario: {
               include: {
                  OpcionCuestionario: true,
               },
            },
            preguntasEjercicio: {
               include: {
                  OpcionEjercicio: true,
               },
            },
            calificaciones: true,
         },
      });
      return actividadActualizada;
   }

   // Eliminar Actividad 
   static delete = async (actividadId) => {
      const actividadEliminada = await prisma.actividad.delete({
         where: { id: actividadId },
      });
      return actividadEliminada;
   }
}
