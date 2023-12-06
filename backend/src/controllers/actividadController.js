import { ActividadModel } from "../models/ActividadModel.js";

export class ActividadController {

    // Crear Actividad
    static async create(req, res) {
        const { nombre, descripcion, fechaLimite, tipo } = req.body;
        const { claveGrupo } = req.params;

        try {
            const actividad = await ActividadModel.create(nombre, descripcion, fechaLimite, tipo, claveGrupo);
            res.json(actividad);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la actividad" });
        }
    }

    // Obtener las actividades por clave del grupo
    static async obtenerActividadesPorClaveGrupo(req, res) {
        const { claveGrupo } = req.params;

        try {
            const actividades = await ActividadModel.obtenerActividadesPorClaveGrupo(claveGrupo);
            res.json(actividades || []);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las actividades" });
        }
    }

    
  

    static async getById(req, res) {
      const { actividadId, claveGrupo } = req.params;
  
      try {
          const actividad = await ActividadModel.getById(parseInt(actividadId), claveGrupo);
  
          if (!actividad) {
              return res.status(404).json({ error: 'Actividad no encontrada' });
          }
  
          // Modifica la respuesta según la nueva estructura de datos
          
  
          res.json(actividadResponse);
      } catch (error) {
          console.error(`Error al obtener la actividad: ${error.message}`);
          res.status(500).json({ error: 'Error interno del servidor' });
      }
  }

// Actualizar una actividad existente
   static async update(req, res) {
      try {
         const actividadId = parseInt(req.params.idActividad);
         const { nombre, descripcion, fechaLimite, tipo } = req.body;
         const claveGrupo = req.body.claveGrupo; // Agregar aquí para obtener la clave del grupo
         
         const nuevaInformacion = {
            nombre,
            descripcion,
            fechaLimite,
            tipo,
            claveGrupo, // Agregar la clave del grupo
         };

         const actividadActualizada = await ActividadModel.update(actividadId, nuevaInformacion);
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

