import { prisma } from "../conexion.js";

export class PreguntaEjercicioModel {

   //Aqui combine los model de PreguntaEjercio y OpcionEjercicio, con su relacion con Actividad 
   //Funcion para crear la Pregunta y las opciones
   static create = async (actividadId, dataPregunta, dataRespuesta) => {
      const { OpcionEjercicio } = dataRespuesta
      const preguntaEjercicio = await prisma.preguntaEjercicio.create({
         data: {
            Actividad: { connect: { id: actividadId } },
            // pregunta: pregunta,
            // multimedia: multimedia,
            // consejo: consejo,
            // ClaveVideo: ClaveVideo,
            // OpcionEjercicio: {
            //    create: {
            //       a: parseFloat(OpcionEjercicio.a),
            //       b: parseFloat(OpcionEjercicio.b),
            //       c: parseFloat(OpcionEjercicio.c),
            //       r1: parseFloat(OpcionEjercicio.r1),
            //       r2: parseFloat(OpcionEjercicio.r2),
            //    }
            // }

            OpcionEjercicio: { create: dataRespuesta },
            ...dataPregunta
         },
      });
      return preguntaEjercicio;
   }

   static getById = async (preguntaEjercicioId) => {
      const preguntaEjercicio = await prisma.preguntaEjercicio.findUnique({
         where: { id: preguntaEjercicioId },
         include: {
            OpcionEjercicio: true,
         },
      });
      return preguntaEjercicio;
   }

   //Actualizar informacion de la Pregunta y sus Opciones
   static update = async (preguntaEjercicioId, nuevaInformacion) => {
      const preguntaEjercicioActualizada = await prisma.preguntaEjercicio.update({
         where: { id: preguntaEjercicioId },
         data: {
            pregunta: nuevaInformacion.pregunta,
            multimedia: nuevaInformacion.multimedia,
            consejo: nuevaInformacion.consejo,
            claveVideo: nuevaInformacion.claveVideo,
            OpcionEjercicio: {
               update: nuevaInformacion.opciones.map((opcion) => ({
                  where: { id: opcion.id },
                  data: {
                     a: opcion.a,
                     b: opcion.b,
                     c: opcion.c,
                     r1: opcion.r1,
                     r2: opcion.r2,
                  },
               })),
            },
         },
         include: {
            OpcionEjercicio: true,
         },
      });
      return preguntaEjercicioActualizada;
   }

   static delete = async (preguntaEjercicioId) => {
      const preguntaEjercicioEliminada = await prisma.preguntaEjercicio.delete({
         where: { id: preguntaEjercicioId },
         include: {
            OpcionEjercicio: true,
         },
      });
      return preguntaEjercicioEliminada;
   }
}

