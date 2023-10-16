-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NOT NULL,
    `apellido_paterno` VARCHAR(25) NOT NULL,
    `apellido_materno` VARCHAR(25) NOT NULL,
    `correo` VARCHAR(50) NOT NULL,
    `contrasena_hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(64) NOT NULL,
    `creadoEl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Rol_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioEnGrupo` (
    `usuarioId` INTEGER NOT NULL,
    `grupoId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,

    PRIMARY KEY (`usuarioId`, `grupoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `clave` VARCHAR(191) NOT NULL,
    `creadoEl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Grupo_clave_key`(`clave`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NULL,
    `creadoEl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaLimite` DATETIME(3) NULL,
    `grupoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalificacionesActividad` (
    `calificacion` DOUBLE NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `actividadId` INTEGER NOT NULL,

    PRIMARY KEY (`usuarioId`, `actividadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregunta` VARCHAR(191) NOT NULL,
    `respuesta` VARCHAR(191) NOT NULL,
    `intentos` INTEGER NULL DEFAULT 4,
    `multimedia` LONGBLOB NULL,
    `observacion` VARCHAR(191) NULL,
    `enlace` VARCHAR(191) NULL,
    `actividadId` INTEGER NOT NULL,

    UNIQUE INDEX `Pregunta_pregunta_actividadId_key`(`pregunta`, `actividadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RespuestasAlumno` (
    `preguntaId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `respuestaAlumno` VARCHAR(191) NOT NULL,
    `intentosAlumno` INTEGER NOT NULL,
    `correcto` BOOLEAN NOT NULL,

    PRIMARY KEY (`preguntaId`, `usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CambioContrasena` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `tipo` ENUM('cambio', 'recuperacion') NOT NULL,
    `creadoEl` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Multimedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(50) NOT NULL,
    `ruta` VARCHAR(255) NOT NULL,
    `preguntaId` INTEGER NOT NULL, -- Relación con la pregunta
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`preguntaId`) REFERENCES `Pregunta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioEnGrupo` ADD CONSTRAINT `UsuarioEnGrupo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioEnGrupo` ADD CONSTRAINT `UsuarioEnGrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioEnGrupo` ADD CONSTRAINT `UsuarioEnGrupo_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalificacionesActividad` ADD CONSTRAINT `CalificacionesActividad_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CalificacionesActividad` ADD CONSTRAINT `CalificacionesActividad_actividadId_fkey` FOREIGN KEY (`actividadId`) REFERENCES `Actividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_actividadId_fkey` FOREIGN KEY (`actividadId`) REFERENCES `Actividad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestasAlumno` ADD CONSTRAINT `RespuestasAlumno_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestasAlumno` ADD CONSTRAINT `RespuestasAlumno_preguntaId_fkey` FOREIGN KEY (`preguntaId`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--AddForeignKey
ALTER TABLE `Pregunta` ADD COLUMN `multimedia` LONGBLOB NULL;

-- Agregar una columna para almacenar el hash de contraseña en lugar de contrasena_hash
ALTER TABLE `Usuario` ADD COLUMN `contrasena_hash` VARCHAR(191) NOT NULL;

-- Agregar una columna para almacenar el salt
ALTER TABLE `Usuario` ADD COLUMN `salt` VARCHAR(64) NOT NULL;