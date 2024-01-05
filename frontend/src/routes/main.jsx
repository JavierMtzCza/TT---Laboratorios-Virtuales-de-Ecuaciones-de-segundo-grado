import { createBrowserRouter } from "react-router-dom";

import PA1Inicio from "./PA1-Inicio.jsx";
import PA2InicioSesion from "./PA2-InicioSesion"
import PA3Registro from "./PA3-Registro"
import PA4Laboratorios from "./PA4-Laboratorios"
import PA5Grupos from "./PA5-Grupos"
import PA6Condiciones from "./PA6-Terminos.jsx";
import PA7Ejercicio from "./PA7-Ejercicio.jsx";
import PA8Grupo from "./PA8-Grupo.jsx";
import PA9Cuestionario from "./PA9-Cuestionario.jsx";
import PA10Formulario from "./PA10-Formulario.jsx";
import PA11AvisodePrivacidad from "./PA11-Aviso.jsx";
import PA12RecuperarContraseña from "./PA12-RecuperarCuenta.jsx";
import PA13CrearEjercicio from "./PA13-CrearEjercicio.jsx";
import PA14ContestarActividad from "./PA14-ContestarActividad.jsx";
import PA15CalificacionesActividad from "./PA15-CalificacionesActividad.jsx";
import ProtectoLogeo from "./ProtectorLogeo.jsx";
import ProtectorInicio from "./ProtectorInicio.jsx";
import PA17ModificarActividad from "./PA17-ModificarActividad.jsx";
import PA16Ayuda from "./PA16-Ayuda.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <PA1Inicio />
   },
   {
      path: "/Labs",
      element: <PA4Laboratorios />
   },
   {
      element: <ProtectorInicio />,
      children: [
         {
            path: "/InicioSesion",
            element: <PA2InicioSesion />
         },
         {
            path: "/Registro",
            element: <PA3Registro />
         },
         {
            path: "/SingUp",
            element: <PA12RecuperarContraseña />
         },
      ]
   },
   {
      element: <ProtectoLogeo />,
      children: [
         {
            path: "/Grupos",
            element: <PA5Grupos />
         },
         {
            path: "/Graficar",
            element: <PA7Ejercicio />
         },
         {
            path: "/Grupo",
            element: <PA8Grupo />
         },
         {
            path: "/Cuestionario",
            element: <PA9Cuestionario />
         },
         {
            path: "/Formulario",
            element: <PA10Formulario />
         },
         {
            path: "/CrearEjercicio",
            element: <PA13CrearEjercicio />
         },
         {
            path: "/ResolverActividad",
            element: <PA14ContestarActividad />
         },
         {
            path: "/CalificacionActividad",
            element: <PA15CalificacionesActividad />
         },
         {
            path: "/ModificarActividad",
            element: <PA17ModificarActividad />
         },
      ]
   },
   ,
   {
      path: "/Condiciones",
      element: <PA6Condiciones />
   },
   {
      path: "/Aviso",
      element: <PA11AvisodePrivacidad />
   },
   {
      path: "/Ayuda",
      element: <PA16Ayuda />
   },
   

]);

export default router