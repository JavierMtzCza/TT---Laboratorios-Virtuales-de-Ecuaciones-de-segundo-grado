import { prisma } from "../conexion.js";

export class rolModel {

    static create = async (rolData) => {
        const rol = prisma.rol.create({ data: rolData })

        return rol
    }


}