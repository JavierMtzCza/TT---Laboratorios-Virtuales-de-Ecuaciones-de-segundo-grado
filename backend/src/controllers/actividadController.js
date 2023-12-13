import { ActividadModel } from "../models/actividadModel.js";

export class ActividadController {
   // Crear una nueva actividad
   static async create(req, res) {
      try {
         const idGrupo = req.params.idGrupo;
         const { nombre, descripcion, fechaLimite, tipo } = req.body;
         const actividad = await ActividadModel.create(nombre, descripcion, fechaLimite, tipo, parseInt(idGrupo));
         res.json({ mensaje: 'Actividad creada con éxito', actividad });
      } catch (error) {
         console.error('Error al crear la actividad:', error);
         res.status(500).json({ error: 'Error interno del servidor' });
      }
   }

   // Obtener todas las actividades de un grupo
   static async getAll(req, res) {
      try {
         const grupoId = parseInt(req.params.idGrupo);
         const actividades = await ActividadModel.getAll(grupoId);
         res.json(actividades);
      } catch (error) {
         console.error('Error al obtener las actividades:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   // Obtener una actividad específica por su ID
   static async getById(req, res) {
      try {
         const actividadId = parseInt(req.params.idActividad);
         const actividad = await ActividadModel.getById(actividadId);
         res.json(actividad);
      } catch (error) {
         console.error('Error al obtener la actividad:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   // Obtener una actividad específica por su ID por usuario
   static async getByIdUser(req, res) {
      try {
         const actividadId = parseInt(req.params.idActividad);
         const idUsuario = parseInt(req.params.idUsuario);
         const actividad = await ActividadModel.getByIdUser(actividadId, idUsuario);
         res.json(actividad);
      } catch (error) {
         console.error('Error al obtener la actividad:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   // Actualizar una actividad existente
   static async update(req, res) {
      try {
         const actividadId = parseInt(req.params.idActividad);
         const { nombre, descripcion, fechaLimite, tipo } = req.body; // Agregar "nombre" aquí
         const actividadActualizada = await ActividadModel.update(actividadId, { nombre, descripcion, fechaLimite, tipo }); // Agregar "nombre" aquí
         res.json({ mensaje: 'Actividad actualizada con éxito', actividad: actividadActualizada });
      } catch (error) {
         console.error('Error al actualizar la actividad:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   // Eliminar una actividad existente
   static async delete(req, res) {
      try {
         const actividadId = parseInt(req.params.idActividad);
         await ActividadModel.delete(actividadId);
         res.json({ mensaje: 'Actividad eliminada con éxito' });
      } catch (error) {
         console.error('Error al eliminar la actividad:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   //Agregar una calificacion a una actividad
   static async agregarCalificacion(req, res) {
      try {
         const { idActividad, idUsuario, calificacion } = req.body
         const actividad = await ActividadModel.agregarCalificacion(idActividad, idUsuario, calificacion);
         res.json(actividad);
      } catch (error) {
         console.error('Error al asignar la calificacion:', error);
         res.status(200).json({ error: 'Error al asignar la calificacion' });
      }
   }

   //Obtener una calificacion a una actividad
   static async calificacionesActividad(req, res) {
      try {
         const { idActividad, idGrupo } = req.params
         const data = await ActividadModel.calificacionesActividad(parseInt(idActividad), parseInt(idGrupo));

         let promesas = data.map(async (alumno) => {

            const calificacion = await ActividadModel.calificacionAlumno(parseInt(idActividad), alumno.Usuario.id)

            return { id: alumno.Usuario.id, nombre: alumno.Usuario.nombre, apellido_paterno: alumno.Usuario.apellido_paterno, apellido_materno: alumno.Usuario.apellido_materno, calificacion: calificacion == null ? -1 : calificacion.calificacion }
         })

         //Una vez que acaben todas las promesas, iteramos en cada dato para aplanar la informacion
         Promise.all(promesas).then(resultados => {
            res.json(resultados);
         })

      } catch (error) {
         console.error('Error obtener las calificaiones:', error);
         res.status(200).json({ error: 'Error obtener las calificaiones:' });
      }
   }

   //Obtener calificaciones grupales
   static async calificacionesGrupales(req, res) {
      try {
         const { idGrupo } = req.params
         const data = await ActividadModel.calificacionesGrupales(parseInt(idGrupo));

         //Iteramos en los alumnos y obtenemos las calififcaionesd de cada uno
         //Usamos promesas para esperar todos los datos
         let promesas = data.alumnos.map(async (alumno) => {
            let valores = []
            for (let i = 0; i < data.actividades.length; i++) {
               const calificacion = await ActividadModel.calificacionAlumno(data.actividades[i].id, alumno.id)
               if (calificacion != null)
                  valores.push({ nombre: data.actividades[i].nombre, calificacion: calificacion.calificacion })
               else
                  valores.push({ nombre: data.actividades[i].nombre, calificacion: -1 })
            }

            return { id: alumno.id, nombre: alumno.nombre, apellido_paterno: alumno.apellido_paterno, apellido_materno: alumno.apellido_materno, calificaciones: valores }
         })

         //Una vez que acaben todas las promesas, iteramos en cada dato para aplanar la informacion
         Promise.all(promesas).then(resultados => {

            let dataCruda = resultados.map((resultado) => {
               let objetoAplanado = {};
               objetoAplanado.id = resultado.id;
               objetoAplanado.nombre = resultado.nombre;
               objetoAplanado.apellido_paterno = resultado.apellido_paterno;
               objetoAplanado.apellido_materno = resultado.apellido_materno;
               for (let i = 0; i < resultado.calificaciones.length; i++) {
                  objetoAplanado[resultado.calificaciones[i].nombre] = resultado.calificaciones[i].calificacion;
               }
               return objetoAplanado
            })
            dataCruda.push(data.actividades)

            res.json(dataCruda)
         })


      } catch (error) {
         console.error('Error obtener las calificaiones:', error);
         res.status(200).json({ error: 'Error obtener las calificaiones:' });
      }
   }

}