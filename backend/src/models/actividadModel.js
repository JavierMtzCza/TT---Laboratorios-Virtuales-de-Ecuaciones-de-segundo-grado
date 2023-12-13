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
         },
      });
      return actividad;
   }

   static getByIdUser = async (actividadId, idUsuario) => {
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
            Calificaciones: { where: { usuarioId: idUsuario }, include: true }
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

   // Agregar calificacion 
   static agregarCalificacion = async (idActividad, idUsuario, calificacion) => {
      const actividad = prisma.calificacionesActividad.create({
         data: {
            actividadId: idActividad,
            usuarioId: idUsuario,
            calificacion: calificacion
         }
      })
      return actividad;
   }

   // Obtener calificaciones de actividad
   static calificacionesActividad = async (idActividad, idGrupo) => {

      const alumn = await prisma.usuarioEnGrupo.findMany({
         where: { rolId: 2, grupoId: idGrupo },
         include: { Usuario: { select: { id: true, nombre: true, apellido_paterno: true, apellido_materno: true } } }
      })

      return alumn
   }

   //obtener calificaciones grupales
   static calificacionesGrupales = async (idGrupo) => {

      var actividades = []
      var alumnos = []

      const acts = await prisma.actividad.findMany({
         where: { grupoId: idGrupo },
         select: { id: true, nombre: true }
      })

      const alumn = await prisma.usuarioEnGrupo.findMany({
         where: { rolId: 2, grupoId: idGrupo },
         include: { Usuario: { select: { id: true, nombre: true, apellido_paterno: true, apellido_materno: true } } }
      })


      if (acts.length > 0)
         acts.map((actividad) => { actividades.push({ id: actividad.id, nombre: actividad.nombre }) })

      if (alumn.length > 0)
         alumn.map((alumno) => { alumnos.push({ id: alumno.Usuario.id, nombre: alumno.Usuario.nombre, apellido_materno: alumno.Usuario.apellido_materno, apellido_paterno: alumno.Usuario.apellido_paterno }) })


      return { actividades: actividades, alumnos: alumnos };
   }

   //Obtener la calificacion de un usuario a una actividad
   static calificacionAlumno = async (idActividad, idUsuario) => {

      const calificacion = prisma.calificacionesActividad.findUnique({
         where: { usuarioId_actividadId: { actividadId: idActividad, usuarioId: idUsuario } }
      })

      return calificacion;
   }
}
