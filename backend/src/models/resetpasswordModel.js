import { prisma } from "../conexion.js";
import bcrypt from 'bcrypt';

export class CambioContrasenaModel {
  // Consultar código de verificación por correo
  static getCode = async (correoUsuario) => {
    const cambioContrasena = await prisma.cambioContrasena.findUnique({
      where: { usuarioCorreo: correoUsuario },
    })
    return cambioContrasena;
  }

  // Crear solicitud de cambio de contraseña con código hasheado
  static create = async (datos) => {
    const codigo = generarCodigoVerificacion(); // Generar un código de verificación aleatorio
    const fechaCaducidad = new Date(Date.now() + (60 * 1000 * 10)); // Establecer la fecha de caducidad a 10 minutos

    const codigoHasheado = await bcrypt.hash(codigo, 10); // Hashear el código antes de guardarlo

    const cambioContrasena = prisma.cambioContrasena.create({
      data: {
        codigo: codigoHasheado,
        fechaCaducidad,
        estado: true, // Establecer el estado como verdadero
        usuarioCorreo: datos.correo,
      }
    })
    return cambioContrasena;
  }

  // Comprobar código de verificación y estado
  static verifyCode = async (correoUsuario, codigoVerificacion) => {
    const cambioContrasena = await prisma.cambioContrasena.findUnique({
      where: {
        usuarioCorreo: correoUsuario,
      },
    })

    if (!cambioContrasena || !cambioContrasena.estado) {
      return null; // Si el código no existe o el estado no es verdadero, retornar nulo
    }

    const codigoValido = await bcrypt.compare(codigoVerificacion, cambioContrasena.codigo); // Comparar el código ingresado con el hasheado

    if (codigoValido) {
      return cambioContrasena; // Retornar el registro si el código es válido
    }

    return null;
  }

  // Actualizar contraseña y establecer estado a falso
  static updatePassword = async (correoUsuario, nuevaContrasena) => {
    const saltGenerado = await bcrypt.genSalt(10); // Generar un salt aleatorio
    nuevaContrasena = await bcrypt.hash(nuevaContrasena, saltGenerado); // Hashear la nueva contraseña usando el salt

    const usuario = prisma.usuario.update({
      where: { correo: correoUsuario },
      data: { contrasena: nuevaContrasena },
    })

    // Invalidar el código de verificación una vez actualizada la contraseña
    await prisma.cambioContrasena.update({
      where: { usuarioCorreo: correoUsuario },
      data: { estado: false },
    })

    return usuario;
  }
}
