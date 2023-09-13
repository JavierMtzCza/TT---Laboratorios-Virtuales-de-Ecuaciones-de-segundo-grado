import { Button, Card, Dropdown, Header, Icon, Label } from "semantic-ui-react"

export const Grupo = ({ nombre, alumnos, descripcion }) => {

   const colores = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey']

   function randomColor() {
      return colores[Math.floor(Math.random() * colores.length)]
   }

   return (
      <Card fluid color={randomColor()}>
         <Card.Content>
            <Dropdown icon='bars' direction="left" labeled as={Button} floated='right' >
               <Dropdown.Menu>
                  <Dropdown.Item icon='settings' text='Modificar' />
                  <Dropdown.Item icon='sign out' text='Salir del grupo' />
                  <Dropdown.Item icon='delete' text='Eliminar' />
               </Dropdown.Menu>
            </Dropdown>
            <Card.Header as={Header} size='tiny' floated='left' content={nombre} />
            <Card.Meta textAlign="left" content={<Label as='a'><Icon name='user' /> {alumnos} </Label>} />
            <Card.Description style={{ fontSize: "16px" }} textAlign="left" content={descripcion} />
         </Card.Content>
         <Card.Content extra>
            <Button fluid color="green" content="Entrar" />
         </Card.Content>
      </Card>
   )
}
