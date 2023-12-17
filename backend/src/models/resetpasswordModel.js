// CodigoDeValidacionModel.js
import { prisma } from "../conexion.js";
import { addMinutes } from "date-fns";

export class CambioContrasenaModel {
  
  static createSolicitud = async (correoUsuario) => {
    const codigo = this.generarCodigo();
  
    // Buscar cualquier registro (activo o desactivado) con el mismo usuarioCorreo
    const registroExistente = await prisma.CodigoDeValidacion.findFirst({
      where: { usuarioCorreo: correoUsuario },
    });
  
    if (registroExistente) {
      // Si existe un registro, actualizamos el código y la fecha de caducidad
      const fechaCaducidad = addMinutes(new Date(), 10); // Fecha de vencimiento en 10 minutos
  
      const CodigoDeValidacionActualizado = await prisma.CodigoDeValidacion.update({
        where: { id: registroExistente.id },
        data: {
          codigo: codigo,
          fechaCaducidad: fechaCaducidad,
          estado: true, // Activamos el código nuevamente
        },
      });
  
      return { CodigoDeValidacion: CodigoDeValidacionActualizado, codigo };
    } else {
      // Si no existe un registro, creamos uno nuevo
      const fechaCaducidad = addMinutes(new Date(), 10); // Fecha de vencimiento en 10 minutos
  
      const CodigoDeValidacionNuevo = await prisma.CodigoDeValidacion.create({
        data: {
          codigo: codigo,
          fechaCaducidad: fechaCaducidad,
          estado: true,
          usuarioCorreo: correoUsuario,
        },
        include: {
          Usuario: true,
        },
      });
  
      return { CodigoDeValidacion: CodigoDeValidacionNuevo, codigo };
    }
  };

  static getUserByEmail = async (correoUsuario) => {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: correoUsuario },
    });
    return usuario;
  }


  // Verificar si un código de cambio de contraseña es válido
  static verificarCodigo = async (correoUsuario, codigoIngresado) => {
    try {
      const solicitud = await prisma.CodigoDeValidacion.findFirst({
        where: {
          usuarioCorreo: correoUsuario,
          codigo: codigoIngresado,
          estado: true,
          fechaCaducidad: {
            gte: new Date(),
          },
        },
      });
  
      return solicitud !== null;
    } catch (error) {
      return false;
    }
  };


  // Generar un código aleatorio con mayúsculas, minúsculas y números
  static generarCodigo = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 9; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }
    return codigo;
  };


  //actualizar usuario a vertificado 
  static async actualizarStatus(correoUsuario, codigoIngresado) {
    try {
      const esCodigoValido = await this.verificarCodigo(correoUsuario, codigoIngresado);
  
      if (esCodigoValido) {
        // Actualizar el estado de verificación del usuario a true
        await prisma.usuario.update({
          where: { correo: correoUsuario },
          data: { verificado: true },
        });
  
        // Desactivar el código de validación utilizado
        await prisma.CodigoDeValidacion.updateMany({
          where: { usuarioCorreo: correoUsuario, codigo: codigoIngresado },
          data: { estado: false },
        });
  
        return true; // El estado se actualizó correctamente
      }
  
      return false; // El código no es válido o ha expirado
    } catch (error) {
      console.error("Error al actualizar el estado de verificación del usuario:", error);
      return false; // El código no es válido o ha expirado
    }
  }
  

  static actualizarContrasena = async (correoUsuario, codigoIngresado, nuevaContrasena) => {
    try {
      const esCodigoValido = await this.verificarCodigo(correoUsuario, codigoIngresado);
  
      if (esCodigoValido) {
        // Actualizar la contraseña del usuario sin cifrar
        await prisma.usuario.updateMany({
          where: { correo: correoUsuario },
          data: {
            contrasena: nuevaContrasena,
          },
        });
  
        // Desactivar el código de cambio de contraseña utilizado
        await prisma.CodigoDeValidacion.updateMany({
          where: { usuarioCorreo: correoUsuario, codigo: codigoIngresado },
          data: { estado: false },
        });
  
        return true; // La contraseña se actualizó correctamente
      }
  
      return false; // El código no es válido o ha expirado
    } catch (error) {
      return false; // El código no es válido o ha expirado
    }
  };
  
  static desactivarCodigo = async (correoUsuario, codigo) => {
    try {
      await prisma.CodigoDeValidacion.updateMany({
        where: {
          usuarioCorreo: correoUsuario,
          codigo: codigo,
        },
        data: {
          estado: false,
        },
      });
    } catch (error) {
      console.error("Error al desactivar el código:", error);
    }
  };
}





  

  