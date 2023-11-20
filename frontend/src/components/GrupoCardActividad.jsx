import { Button, Card, Image } from 'semantic-ui-react'
import Avatar from '../images/user_1144709.png'

const GrupoCardActividad = () => {
    return (
        <Card>
            <Card.Content>
                <Image floated='left' src={Avatar} avatar bordered />
                <Card.Header content="Actividad" />
                <Card.Description content={<>Resuleve las <strong>ecuaciones de segundo grado</strong></>} />
                <Button style={{ borderRadius: "1rem" }} color='yellow' content="Resolver" />
            </Card.Content>
        </Card>
    )
}

export default GrupoCardActividad