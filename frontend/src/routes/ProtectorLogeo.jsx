import { Outlet } from "react-router-dom";
import { useUsuarioStore } from "../stores/UsuarioStore";
import PA2InicioSesion from "./PA2-InicioSesion";

const Protector = () => {

  const usuario = useUsuarioStore(state => state.usuario)

  return (
    <>
      {
        (usuario.token) != "" ? <Outlet></Outlet> : <PA2InicioSesion></PA2InicioSesion>
      }
    </>
  )
}

export default Protector