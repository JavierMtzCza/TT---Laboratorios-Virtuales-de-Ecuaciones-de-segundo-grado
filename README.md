
# Trabajo terminal No. 2023-B120 

Aplicación web educativo para el aprendizaje de ecuaciones de segundo grado con contenido interactivo multimedia y didáctico dedicado a alumnos y profesores de tercer año de secundaria



## Pasos para instalar el proyecto
1 . Clonar el repositorio con git clone

2 . Meterse a cada carpeta del proyecto (backend y frontend) y hacerles  

```bash
  npm install
```
para instalar las dependencias.

3 . Meterse a la carpeta del backend y crear un archivo .env 

4 . Configurar este archivo de forma que concuerde con la siguiente forma: 

![Logo](https://www.prisma.io/docs/static/a3179ecce1bf20faddeb7f8c02fb2251/42cbc/mysql-connection-string.png)

En el archivo .env deberia ir (Database es el nombre que le queramos poner a la base de datos)
```bash
  DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

5 . Finalmente, en el mismo backend, ejecutar el comando que nos crea la base.:
```bash
  npx prisma migrate dev --name init
```



    
