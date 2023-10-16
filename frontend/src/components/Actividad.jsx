import { Button, Card, Image } from 'semantic-ui-react'
import Avatar from '../images/user_1144709.png'

const Actividad = () => {
    return (
        <Card>
            <Card.Content>
                <Image floated='left' src={Avatar} avatar bordered />
                <Card.Header content="Steve Sanders" />
                <Card.Description content={<>Steve wants to add you to the group <strong>best friends</strong></>} />
                <Button style={{ borderRadius: "1rem" }} color='yellow' content="Resolver" />
            </Card.Content>
        </Card>
    )
}

export default Actividad