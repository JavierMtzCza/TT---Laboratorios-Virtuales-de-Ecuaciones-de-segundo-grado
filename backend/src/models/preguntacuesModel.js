import { prisma } from "../conexion.js";

export class preguntacuesModel {
    constructor(data) {
      this.id = data.id;
      this.pregunta = data.pregunta;
      this.multimedia = data.multimedia;
      this.actividadId = data.actividadId;
    }
  
    static async create(data) {
      const client = prisma.client();
  
      const pregunta = await client.PreguntaCuestionario.create({
        pregunta: data.pregunta,
        multimedia: data.multimedia,
        actividadId: data.actividadId,
      });
  
      return pregunta;
    }
  
    static async findById(id) {
      const client = prisma.client();
  
      const pregunta = await client.PreguntaCuestionario.findUnique({
        id,
      });
  
      return pregunta;
    }
  
    static async findAll() {
      const client = prisma.client();
  
      const preguntas = await client.PreguntaCuestionario.findMany();
  
      return preguntas;
    }
  }