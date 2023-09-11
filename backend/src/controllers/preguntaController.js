import { preguntaModel } from "../models/preguntaModel.js";

export class preguntaController{
   
   static async create(req, res){
      const idActividad = parseInt(req.params.idActividad)
      const image = req.file.buffer
      const actividad = await preguntaModel.create(idActividad,image,req.body)
      res.json(actividad)
   }


}