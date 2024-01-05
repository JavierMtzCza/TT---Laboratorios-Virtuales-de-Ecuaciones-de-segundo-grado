import { Outlet } from "react-router-dom";
import { useUsuarioStore } from "../stores/UsuarioStore";
import PA5Grupos from './PA5-Grupos'

const ProtectorInicio = () => {

  const usuario = useUsuarioStore(state => state.usuario)

  return (
    <>
      {
        (usuario.token) != "" ? <PA5Grupos></PA5Grupos> : <Outlet></Outlet>
      }
    </>
  )
}


export default ProtectorInicio