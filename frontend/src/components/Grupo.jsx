import { Button, Card, Dropdown, Header, Icon, Label } from "semantic-ui-react"
import { useGrupoStore } from '../stores/UsuarioStore';
import { Link } from "react-router-dom";

export const Grupo = ({ idGrupo, nombreGrupo, alumnos, descripcionGrupo, claveGrupo }) => {

   const colores = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey']
   //Estado global
   const setGrupo = useGrupoStore(state => state.setGrupo)

   function randomColor() {
      return colores[Math.floor(Math.random() * colores.length)]
   }

   return (
      <Card fluid color={randomColor()}>
         <Card.Content>
            <Card.Header as={Header} size='tiny' floated='left' content={nombreGrupo} />
            <Card.Description style={{ fontSize: "16px" }} textAlign="left" content={descripcionGrupo} />
         </Card.Content>
         <Card.Content extra>
            <Link to="/Grupo">
               <Button onClick={() => { setGrupo({ id: idGrupo, nombre: nombreGrupo, descripcion: descripcionGrupo, clave: claveGrupo }) }} fluid color="green" content="Entrar" />
            </Link>
         </Card.Content>
      </Card>
   )
}
