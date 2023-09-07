import { Button, Card, Dropdown, Icon } from "semantic-ui-react"


export const Grupo = ({ nombre, alumnos, descripcion }) => {

   const colores = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey']

   function randomColor() {
      return colores[Math.floor(Math.random() * colores.length)]
   }

   return (
      <Card color={randomColor()}>
         <Card.Content>
            <Dropdown icon='bars' labeled as={Button} floated='right' >
               <Dropdown.Menu>
                  <Dropdown.Item icon='settings' text='Modificar' />
                  <Dropdown.Item icon='sign out' text='Salir del grupo' />
                  <Dropdown.Item icon='delete' text='Eliminar' />
               </Dropdown.Menu>
            </Dropdown>
            <Card.Header content={nombre} />
            <Card.Meta content={<div><Icon name='user' /> {alumnos} alumnos </div>} />
            <Card.Description content={descripcion} />
         </Card.Content>
         <Card.Content extra>
            <Button fluid color="green" content="Entrar" />
         </Card.Content>
      </Card>
   )
}
