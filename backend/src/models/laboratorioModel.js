import { prisma } from "../prisma/conexion.js"

export class laboratorioModel {

   static create = async (image, data) => {
      const laboratorio = prisma.laboratorio.create({
         data: {
            ...data,
            imagen: image
         }
      })
      return laboratorio
   }

   static getAll = async () => {
      const laboratorios = prisma.laboratorio.findMany()
      return laboratorios
   }
}