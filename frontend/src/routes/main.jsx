import { createBrowserRouter } from "react-router-dom";

import PA1Inicio from "./PA1-Inicio.jsx";
import PA2InicioSesion from "./PA2-InicioSesion"
import PA3Registro from "./PA3-Registro"
import PA4Laboratorios from "./PA4-Laboratorios"
import PA5Grupos from "./PA5-Grupos"
import PA6JuegoMemo from "./PA6-JuegoMemo"
import PA7Graficar from "./PA7-Graficar";
import PA8Pruebas from "./PA8-Pruebas";


const router = createBrowserRouter([
   {
      path: "/",
      element: <PA1Inicio />,
   },
   {
      path: "/SingIn",
      element: <PA2InicioSesion />
   },
   {
      path: "/SingUp",
      element: <PA3Registro />
   },
   {
      path: "/Labs",
      element: <PA4Laboratorios />
   },
   {
      path: "/Groups",
      element: <PA5Grupos />
   },
   {
      path: "/GamesMemo",
      element: <PA6JuegoMemo />
   },
   {
      path: "/Graficar",
      element: <PA8Pruebas />
   }
]);

export default router