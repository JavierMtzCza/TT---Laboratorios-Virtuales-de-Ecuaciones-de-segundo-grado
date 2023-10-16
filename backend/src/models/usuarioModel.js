import { prisma } from "../conexion.js";

export class usuarioModel {

   // Consultar usuarios
   static getAll = async () => {
      const usuarios = prisma.usuario.findMany()
      return usuarios
   }

   // Consultar usuario por Correo
   static getByEmail = async (correoUsuario) => {
      const usuario = prisma.usuario.findUnique({ where: { correo: correoUsuario } })
      return usuario
   }

   // Crear usuario
   static create = async (datosUsuario) => {
      const usuario = prisma.usuario.create({ data: datosUsuario })
      return usuario
   }

   static async login(req, res) {
      try {
        const { nombre, apellido_paterno, apellido_materno, correo, contrasena } = req.body;
    
        // Generar un salt aleatorio
        const salt = await bcrypt.genSalt(saltRounds);
    
        // Hashear la contraseña usando el salt
        const hash = await bcrypt.hash(contrasena, salt);
    
        // Crear el usuario en la base de datos
        const nuevoUsuario = await usuarioModel.create({
          id,
          nombre,
          apellido_paterno,
          apellido_materno,
          correo,
          hash,
          salt,
        });
    
        res.json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
      }
    }

   // Modificar usuario
   static update = async (correoUsuario, datosUsuario) => {
      const usuario = prisma.usuario.update({ where: { correo: correoUsuario }, data: datosUsuario })
      return usuario
   }

   // Consultar los grupos a los que pertenece ese usuario
   static getGroups = async (correoUsuario) => {
      const usuario = await prisma.usuario.findUnique({
         where: { correo: correoUsuario },
         include:{Grupos:{include:{Grupo:true}}}
      });

      const grupos = usuario.Grupos.map(grupo => grupo.Grupo);
      return grupos;
   }

}