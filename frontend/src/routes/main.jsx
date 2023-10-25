import { createBrowserRouter } from "react-router-dom";

import PA1Inicio from "./PA1-Inicio.jsx";
import PA2InicioSesion from "./PA2-InicioSesion"
import PA3Registro from "./PA3-Registro"
import PA4Laboratorios from "./PA4-Laboratorios"
import PA5Grupos from "./PA5-Grupos"
import PA6JuegoMemo from "./PA6-JuegoMemo"
import PA7Ejercicio from "./PA7-Ejercicio.jsx";
import PA8Grupo from "./PA8-Grupo.jsx";


const router = createBrowserRouter([
   {
      path: "/",
      element: <PA1Inicio />,
   },
   {
      path: "/InicioSesion",
      element: <PA2InicioSesion />
   },
   {
      path: "/Registro",
      element: <PA3Registro />
   },
   {
      path: "/Labs",
      element: <PA4Laboratorios />
   },
   {
      path: "/Grupos",
      element: <PA5Grupos />
   },
   {
      path: "/GamesMemo",
      element: <PA6JuegoMemo />
   },
   {
      path: "/Graficar",
      element: <PA7Ejercicio />
   },
   {
      path: "/Grupo",
      element: <PA8Grupo />
   }
]);

export default router