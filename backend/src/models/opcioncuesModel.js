import { prisma } from "../conexion.js";

export class opcioncuesModel {
    constructor(data) {
      this.id = data.id;
      this.textOpcion = data.textOpcion;
      this.correcta = data.correcta;
      this.preguntaCuestionarioId = data.preguntaCuestionarioId;
    }
  
    static async create(data) {
      const client = prisma.client();
  
      const opcion = await client.OpcionCuestionario.create({
        textOpcion: data.textOpcion,
        correcta: data.correcta,
        preguntaCuestionarioId: data.preguntaCuestionarioId,
      });
  
      return opcion;
    }
  
    static async findById(id) {
      const client = prisma.client();
  
      const opcion = await client.OpcionCuestionario.findUnique({
        id,
      });
  
      return opcion;
    }
  
    static async findAll() {
      const client = prisma.client();
  
      const opciones = await client.OpcionCuestionario.findMany();
  
      return opciones;
    }
  }