import { checkSchema, validationResult } from 'express-validator';
import { usuarioModel } from '../models/usuarioModel.js';

export const esCorreo = checkSchema({
  correo: {
    in: ['params'],
    errorMessage: 'El correo electrónico no es válido',
    isEmail: true,
    trim: true
  },
  contrasena: {
    in: ['params'],
    errorMessage: 'La contraseña no es válida',
    optional: true,
    isString: true,
    trim: true
  }
});

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
    trim: true
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
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const existeCorreo = async (req, res, next) => {
  const usuario = await usuarioModel.getByEmail(req.params.correo)

  if (!usuario)
    return res.status(404).json({ error: "Usuario no encontrado" });

  next();
};

export const existeUsuario = async (req, res, next) => {
  const { correo } = req.body;
  const usuario = await usuarioModel.getByEmail(correo)

  if (usuario)
    return res.status(400).json({ error: "Usuario ya registrado" });

  next();
};