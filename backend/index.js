import express from "express";

import usuarioRoutes from "./routes/usuarios.js";
import grupoRoutes from "./routes/grupos.js";
import actividadesRoutes from "./routes/actividades.js";
import preguntasRoutes from "./routes/preguntas.js";
import laboratoriosRoutes from "./routes/laboratorios.js";
import respuestas_alumnoRoutes from "./routes/respuestas_alumno.js";

const app = express()
app.use(express.json())

app.use('/usuarios',usuarioRoutes)
app.use('/grupos/',grupoRoutes)
app.use('/actividades',actividadesRoutes)
app.use('/preguntas',preguntasRoutes)
app.use('/laboratorios',laboratoriosRoutes)
app.use('/respuestas_alumno',respuestas_alumnoRoutes)

app.listen(3000)
console.log("Server on port", 3000)    