import { laboratorioModel } from "../models/laboratorioModel.js"

export class laboratorioController {

   static async create(req, res) {
      const image = req.file.buffer
      const laboratorio = await laboratorioModel.create(image, req.body)
      res.send(laboratorio)
   }

   static async getAll(req, res) {
      const laboratorios = await laboratorioModel.getAll()
      res.send(laboratorios)
   }

}