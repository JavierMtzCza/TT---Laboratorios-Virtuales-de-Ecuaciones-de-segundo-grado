import React from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import second from '../images/newplot (1).png'

const PA5Grupos = () => {
  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header children>
            <Button size='mini' floated='right' circular icon="bars" basic />
            <Label  >A</Label>
            {/* <Image size='tiny' src={second} centered></Image> */}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Header>

            Molly wants to add you to the group <strong>musicians</strong>

          </Card.Header>
        </Card.Content>
        <Card.Content extra>
            <Button fluid color='yellow'>
              Approve 
            </Button>
            
        </Card.Content>
      </Card>
    </>
  )
}

export default PA5Grupos