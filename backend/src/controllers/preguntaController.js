import { PreguntaEjercicioModel } from "../models/preguntaModel.js";
import { ActividadController } from "./actividadController.js";

export class PreguntaEjercicioController {

   // Funcion para crear una nueva pregunta de ejercicio
   // Primero obtenemos el ID de la actividad desde los parámetros de la solicitud
   // Obtener datos de la solicitud (pregunta, multimedia, consejo, claveVideo,opciones)
   // Crear la pregunta de ejercicio usando el modelo
   static async create(req, res) {
      try {
         const actividadId = parseInt(req.params.actividadId);
         const multimedia = req.file == null ? null : req.file.buffer
         const { pregunta, consejo, claveVideo, opciones } = req.body;
         const preguntaEjercicio = await PreguntaEjercicioModel.create(actividadId, pregunta, multimedia, consejo, claveVideo, opciones);
         res.json({ mensaje: 'Pregunta de ejercicio creada con éxito', preguntaEjercicio });
      } catch (error) {
         console.error('Error al crear la pregunta de ejercicio:', error);
         res.status(500).json({ mensaje: 'Error ,No existe una activdad creada con ese ID ' });
      }
   }

   // Obtener una pregunta de ejercicio específica por su ID
   // Obtenemos el ID de la pregunta del ejercicio con los parametros de la pregunta
   // Obtener la pregunta de ejercicio usando el modelo
   static async getById(req, res) {
      try {
         const preguntaEjercicioId = parseInt(req.params.idPreguntaEjercicio);
         const preguntaEjercicio = await PreguntaEjercicioModel.getById(preguntaEjercicioId);
         res.json(preguntaEjercicio);
      } catch (error) {
         console.error('Error al obtener la pregunta de ejercicio:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   // Actualizar una pregunta de ejercicio existente
   // Obtenemos su  ID de la pregunta de ejercicio desde el Model
   // Obtenemos los nuevos datos de la pregunta y el opciones del ejercicio desde la solicitud
   // Actualizamos todo

   static async update(req, res) {
      try {
         const preguntaEjercicioId = parseInt(req.params.idPreguntaEjercicio);
         const { pregunta, multimedia, consejo, claveVideo, opciones } = req.body;
         const preguntaEjercicioActualizada = await PreguntaEjercicioModel.update(preguntaEjercicioId, { pregunta, multimedia, consejo, claveVideo, opciones });
         res.json({ mensaje: 'Pregunta de ejercicio actualizada con éxito', preguntaEjercicio: preguntaEjercicioActualizada });
      } catch (error) {
         console.error('Error al actualizar la pregunta de ejercicio:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }

   // Eliminar una pregunta de ejercicio existente
   // Obtener el ID de la pregunta de ejercicio desde los parámetros de la solicitud
   // Eliminar la pregunta de ejercicio usando el modelo

   static async delete(req, res) {
      try {
         const preguntaEjercicioId = parseInt(req.params.idPreguntaEjercicio);
         const preguntaEjercicioEliminada = await PreguntaEjercicioModel.delete(preguntaEjercicioId);
         res.json({ mensaje: 'Pregunta de ejercicio eliminada con éxito', preguntaEjercicio: preguntaEjercicioEliminada });
      } catch (error) {
         console.error('Error al eliminar la pregunta de ejercicio:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }



   //Funciones para verificar si la pregunta de ejercicio existe y si tiene un ID de actividad asociado.
   //Se obtiene primero el ID de la pregunta de ejercicio 
   //Si existe, se utiliza el controlador de Actividad para obtener la actividad asociada.
   //Si no tiene nada asociado se responde con el error 404 indicando que no se encontró ni madres

   static async getActividadByPreguntaEjercicio(req, res) {
      try {
         const preguntaEjercicioId = parseInt(req.params.idPreguntaEjercicio);
         const preguntaEjercicio = await PreguntaEjercicioModel.getById(preguntaEjercicioId);
         if (preguntaEjercicio && preguntaEjercicio.actividadId) {
            const actividad = await ActividadController.getById(preguntaEjercicio.actividadId);
            res.json(actividad);
         } else {
            res.status(404).json({ mensaje: 'Pregunta de ejercicio no encontrada o sin actividad asociada' });
         }
      } catch (error) {
         console.error('Error al obtener la actividad asociada a la pregunta de ejercicio:', error);
         res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
   }
}
