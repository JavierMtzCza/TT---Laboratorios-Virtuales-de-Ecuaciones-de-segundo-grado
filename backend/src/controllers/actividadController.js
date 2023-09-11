import { actividadModel } from "../models/actividadModel.js"

export class actividadController {

   static async create(req, res) {
      const grupoId = parseInt(req.params.idGrupo)
      const actividad = await actividadModel.create(grupoId, req.body.descripcion)
      res.json(actividad)
   }

   static async getAll(req, res) {
      const grupoId = parseInt(req.params.idGrupo) 
      const actividades = await actividadModel.getAll(grupoId)
      res.json(actividades)
   }

}