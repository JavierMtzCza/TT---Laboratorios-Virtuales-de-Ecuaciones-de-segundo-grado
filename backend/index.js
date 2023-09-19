import express from "express";
import cors from "cors"

import usuarioRoutes from "./src/routes/usuarios.js";
import grupoRoutes from "./src/routes/grupos.js";
import actividadesRoutes from "./src/routes/actividades.js";
import preguntasRoutes from "./src/routes/preguntas.js";
import laboratoriosRoutes from "./src/routes/laboratorios.js";
import respuestas_alumnoRoutes from "./src/routes/respuestas_alumno.js";
import rols from "./src/routes/rols.js"

const app = express()
app.use(express.json())
app.use(cors(
   // {
   //    origin: (origin, callback) => {
   //       const ACCEPTED_ORIGINS = ['http://localhost:5173']

   //       if (ACCEPTED_ORIGINS.includes(origin))
   //          return callback(null, true)

   //       if (!origin)
   //          return callback(null, true)

   //       return callback(new Error("Not Allowed by CORS"))
   //    }
   // }
))

app.use('/usuarios', usuarioRoutes)
app.use('/grupos', grupoRoutes)
app.use('/actividades', actividadesRoutes)
app.use('/preguntas', preguntasRoutes)
app.use('/laboratorios', laboratoriosRoutes)
app.use('/respuestas_alumno', respuestas_alumnoRoutes)
app.use('/rols',rols)

app.listen(3000)
console.log("Server on port", 3000)    