import { prisma } from "../conexion.js";

export class PreguntaEjercicioModel {

   //Aqui combine los model de PreguntaEjercio y OpcionEjercicio, con su relacion con Actividad 
   //Funcion para crear la Pregunta y las opciones
   static create = async (actividadId, pregunta, multimedia, consejo, claveVideo, opcion) => {
      const preguntaEjercicio = await prisma.preguntaEjercicio.create({
         data: {
            Actividad: { connect: { id: actividadId } },
            pregunta: pregunta,
            multimedia: multimedia,
            consejo: consejo,
            ClaveVideo: claveVideo,
            OpcionEjercicio: {
               create: {
                  a: parseFloat(opcion.a),
                  b: parseFloat(opcion.b),
                  c: parseFloat(opcion.c),
                  r2: parseFloat(opcion.raiz2),
                  r1: parseFloat(opcion.raiz1),
               }
            }
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
