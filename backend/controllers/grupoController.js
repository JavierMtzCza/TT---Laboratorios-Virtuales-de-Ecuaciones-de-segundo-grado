import { grupoModel } from "../models/grupoModel.js";

export class grupoController {

   static async create(req, res) {
      const alumnoId = parseInt(req.params.idAlumno)
      const grupo = await grupoModel.create(alumnoId, req.body)
      //que renderiza
      res.json(grupo)
   }

   static async getAll(req, res) {
      const grupos = await grupoModel.getAll()
      res.json(grupos)
   }

   static async inscripcion(req, res) {
      const { idGrupo, idAlumno } = req.params
      const inscripcion = await grupoModel.inscripcion(parseInt(idGrupo), parseInt(idAlumno))
      res.json(inscripcion)
   }

   static async getUsers(req, res) {
      const idGrupo = parseInt(req.params.idGrupo)
      const alumnos = await grupoModel.getUsers(idGrupo)
      res.json(alumnos)
   }

}