import { ActividadModel } from "../models/actividadModel.js";

export class ActividadController {
   // Crear una nueva actividad
   static async create(req, res) {
      try {
         const claveGrupo = req.params.claveGrupo;
         const { nombre, descripcion, fechaLimite, tipo } = req.body;
         const actividad = await ActividadModel.create(nombre, descripcion, fechaLimite, tipo, claveGrupo);
         res.json({ mensaje: 'Actividad creada con éxito', actividad });
      } catch (error) {
         console.error('Error al crear la actividad:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
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
}