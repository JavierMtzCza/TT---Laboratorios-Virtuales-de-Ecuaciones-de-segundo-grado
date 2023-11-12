import { prisma } from "../conexion.js";

export class rolModel {

    static create = async (rolData) => {
        const rol = prisma.rol.create({ data: rolData })
        return rol
    }

    static getRol = async (correoUsuario, claveGrupo) => {
        const rol = prisma.usuarioEnGrupo.findFirst({
            where: { Usuario: { correo: correoUsuario }, Grupo: { clave: claveGrupo } },
            select: { rolId: true }
        })
        return rol
    }

}