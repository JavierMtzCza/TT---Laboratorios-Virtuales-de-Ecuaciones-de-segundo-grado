import express from "express";
import cors from "cors"

import usuarioRoutes from "./src/routes/usuarios.js";
import grupoRoutes from "./src/routes/grupos.js";
import actividadesRoutes from "./src/routes/actividades.js";
import preguntasRoutes from "./src/routes/preguntas.js";
import rols from "./src/routes/rol.js";
//import preguntascuesRoutes from "./src/routes/preguntacues.js";
//import respuestascuesRoutes from "./src/routes/respuestas_cues.js";
//import resetpasswordRoutes from "./src/routes/resetpassword.js";
import cambiocontraseñaRoutes from "./src/routes/resetpassword.js";


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

const puerto = process.env.port || 3000

app.use('/usuario/', usuarioRoutes)
app.use('/grupo/', grupoRoutes)
app.use('/actividad/', actividadesRoutes)
app.use('/pregunta/', preguntasRoutes)
app.use('/rol', rols)
//app.use('/preguntacues', preguntascuesRoutes)
//app.use('/respuestacues', respuestascuesRoutes)
//app.use('/resetpassword/',resetpasswordRoutes)
app.use('/cambiocontrasena',cambiocontraseñaRoutes)


app.listen(puerto)
console.log("Server on port", puerto)  