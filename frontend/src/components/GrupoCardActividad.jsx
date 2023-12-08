import { Button, Card, Image } from 'semantic-ui-react'
import { useActividadStore, useGrupoStore } from '../stores/UsuarioStore'
import { useNavigate } from 'react-router-dom'
import Avatar from '../images/user_1144709.png'

const GrupoCardActividad = ({ id, nombre, descripcion, tipo, fechalimite }) => {

    const setActividad = useActividadStore(state => state.setActividad)
    const grupo = useGrupoStore(state => state.grupo)
    const navigate = useNavigate();

    const dataActividad = () => {
        fetch(`http://localhost:3000/actividad/${grupo.id}/actividad/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setActividad({
                    id: data.id,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    fechaLimite: data.fechaLimite,
                    tipo: data.tipo,
                    PreguntaCuestionario: data.PreguntaCuestionario ,
                    PreguntaEjercicio: data.PreguntaEjercicio
                })
            }).catch((error) => console.log(error)).finally(()=>{navigate('/Graficar')})
    }

    return (
        <Card>
            <Card.Content textAlign='center'>
                <Image floated='left' src={Avatar} avatar bordered />
                <Card.Header textAlign='left' content={nombre} />
                <Card.Description content={descripcion} />
                <Button onClick={dataActividad} style={{ borderRadius: "1rem", marginTop: "15px" }} color='yellow' content="Resolver" />
            </Card.Content>
        </Card>
    )
}

export default GrupoCardActividad