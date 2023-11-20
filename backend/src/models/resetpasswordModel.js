import { prisma } from "../conexion.js";
import bcrypt from 'bcrypt';

export class CambioContrasenaModel {
  // Consultar código de verificación por correo
  static getCode = async (correoUsuario) => {
    const cambioContrasena = await prisma.cambioContrasena.findUnique({
      where: { usuarioCorreo: correoUsuario },
    });
    return cambioContrasena;
  }


  //Consultar usuario por su correo
  static getUserByEmail = async (correoUsuario) => {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: correoUsuario },
    });
    return usuario;
  }

  // Generar código de verificación aleatorio con letras mayúsculas, minúsculas y números
  static generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  };

  // Crear solicitud de cambio de contraseña con código hasheado
  static create = async (datos) => {
    const codigo = this.generateRandomCode(); // Generar un código de verificación aleatorio
    const fechaCaducidad = new Date(Date.now() + (60 * 1000 * 10)); // Establecer la fecha de caducidad a 10 minutos

    const codigoHasheado = await bcrypt.hash(codigo, 10); // Hashear el código antes de guardarlo

    const cambioContrasena = prisma.cambioContrasena.create({
      data: {
        codigo: codigoHasheado,
        fechaCaducidad,
        estado: true, // Establecer el estado como verdadero
        usuarioCorreo: datos.correo,
        intentos: 0, // Inicializar el número de intentos
        fechaIntento: null, // Inicializar la fecha del último intento
      }
    });
    return cambioContrasena;
  }

  // Comprobar código de verificación y estado
  static verifyCode = async (correoUsuario, codigoVerificacion) => {
    const cambioContrasena = await prisma.cambioContrasena.findUnique({
      where: {
        usuarioCorreo: correoUsuario,
      },
    });

    if (!cambioContrasena || !cambioContrasena.estado) {
      return null; // Si el código no existe o el estado no es verdadero, retornar nulo
    }

    const codigoValido = await bcrypt.compare(codigoVerificacion, cambioContrasena.codigo); // Comparar el código ingresado con el hasheado

    if (codigoValido) {
      return cambioContrasena; // Retornar el registro si el código es válido
    }

    // Incrementar el número de intentos y actualizar la fecha del último intento
    await prisma.cambioContrasena.update({
      where: { usuarioCorreo: correoUsuario },
      data: {
        intentos: cambioContrasena.intentos + 1,
        fechaIntento: new Date(),
      },
    });

    return null;
  }

  // Actualizar información de cambio de contraseña
  static update = async ({ correo, codigo, fechaCaducidad, estado }) => {
  const cambioContrasena = await prisma.cambioContrasena.update({
    where: { usuarioCorreo: correo }, // Hay que usar "usuarioCorreo" en lugar de "correo"
    data: {
      codigo: await bcrypt.hash(codigo, 10), // Hashear el nuevo código antes de guardarlo
      fechaCaducidad,
      estado,
    },
  });

    return cambioContrasena;
  }
}
