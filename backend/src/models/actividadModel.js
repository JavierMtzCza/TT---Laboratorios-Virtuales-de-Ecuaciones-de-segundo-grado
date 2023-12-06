import { prisma } from "../conexion.js";

export class ActividadModel {

   // Crear Actividad 
   static create = async (nombre, descripcion, fechaLimite, tipo, claveGrupo) => {
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
   static async obtenerActividadesPorClaveGrupo(claveGrupo) {
      try {
          // Buscar el grupo por la clave
          const grupo = await prisma.grupo.findUnique({
              where: {
                  clave: claveGrupo,
              },
          });
  
          if (!grupo) {
              return null;
          }
  
          // Obtener todas las actividades del grupo
          const actividades = await prisma.actividad.findMany({
              where: {
                  grupoId: grupo.id,
              },
          });
  
          return actividades;
      } catch (error) {
          // Puedes manejar el error de alguna otra manera, como imprimir un mensaje de registro
          return null;
      }
  }

  static getById = async (actividadId, claveGrupo) => {
   try {
       const actividad = await prisma.actividad.findUnique({
           where: { id: actividadId, grupoId: { clave: claveGrupo } },
           include: {
               // ... Incluir otras relaciones si es necesario
           },
       });

       return actividad;
   } catch (error) {
       console.error(`Error al obtener la actividad: ${error.message}`);
       return null;
   }
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