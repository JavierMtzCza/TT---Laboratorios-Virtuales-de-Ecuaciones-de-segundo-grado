import { checkSchema, validationResult } from 'express-validator';
import { usuarioModel } from '../models/usuarioModel.js';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const validarEsquema = checkSchema({
  nombre: {
    in: ['body'],
    errorMessage: 'El nombre es requerido',
    isString: true,
    trim: true
  },
  apellido_paterno: {
    in: ['body'],
    errorMessage: 'El apellido paterno es requerido',
    isString: true,
    trim: true
  },
  apellido_materno: {
    in: ['body'],
    errorMessage: 'El apellido materno es requerido',
    isString: true,
    trim: true
  },
  correo: {
    in: ['body'],
    errorMessage: 'El correo electrónico no es válido',
    isEmail: true,
    trim: true,
    toLowerCase: true
  },
  contrasena: {
    in: ['body'],
    errorMessage: 'La contraseña no es válida',
    isString: true,
    trim: true
  }
});

export const validaErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() });
  }
  next();
};

export const existeCorreo = async (req, res, next) => {
  const usuario = await usuarioModel.getByEmail(req.params.correo)

  if (!usuario)
    return res.status(200).json({ error: "Usuario no encontrado" });

  next();
};

export const existeUsuario = async (req, res, next) => {
  const { correo } = req.body;
  const usuario = await usuarioModel.getByEmail(correo)

  if (usuario)
    return res.status(200).json({ error: "Usuario ya registrado" });

  next();
};

export const FiltrarToken = async (req, res, next) => {
  const { correo } = jsonwebtoken.verify(req.params.token, "contrasena")
  const { contrasenaActual } = req.body

  const usuario = await usuarioModel.getByEmail(correo)
  const passwordMatch = await bcrypt.compare(contrasenaActual, usuario.contrasena);

  if (!passwordMatch)
    return res.status(200).json({ error: "Las contrasenas no coinciden" });

  // Almacena el correo del usuario en req
  req.correo = correo
  req.usuario = usuario

  next();
}
