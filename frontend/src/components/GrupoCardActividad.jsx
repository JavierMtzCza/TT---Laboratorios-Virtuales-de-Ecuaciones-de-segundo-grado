import { Button, Card, Image, Modal } from 'semantic-ui-react'
import { useActividadStore, useUsuarioStore } from '../stores/UsuarioStore'
import { useNavigate } from 'react-router-dom'
import Avatar from '../images/user_1144709.png'
import { useState } from 'react'

const GrupoCardActividad = ({ id, nombre, descripcion, tipo, fechalimite, rol }) => {

    const setActividad = useActividadStore(state => state.setActividad)
    const [actividadHecha, setactividadHecha] = useState({ show: false, calificacion: 0.0 })
    const usuario = useUsuarioStore(state => state.usuario)
    const navigate = useNavigate();

    const dataActividad = () => {
        console.log(rol);
        fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/actividad/${id}/${usuario.perfil.id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(error);
                } else {
                    if (data.Calificaciones.length == 0) {
                        setActividad({
                            id: data.id,
                            nombre: data.nombre,
                            descripcion: data.descripcion,
                            fechaLimite: data.fechaLimite,
                            tipo: data.tipo,
                            PreguntaCuestionario: data.PreguntaCuestionario,
                            PreguntaEjercicio: data.PreguntaEjercicio,
                        })
                        if (rol == 2)
                            navigate('/ResolverActividad')
                        else
                            navigate('/CalificacionActividad')
                    } else {
                        setactividadHecha({ show: true, calificacion: data.Calificaciones[0].calificacion })
                    }
                }
            }).catch((error) => console.log(error))
    }

    return (
        <>
            <Card>
                <Card.Content textAlign='center'>
                    <Image floated='left' src={Avatar} avatar bordered />
                    <Card.Header textAlign='left' content={nombre} />
                    <Card.Description content={descripcion} />
                    <Button onClick={dataActividad} style={{ borderRadius: "1rem", marginTop: "15px" }} color='yellow' content="Resolver" />
                </Card.Content>
            </Card>
            <Modal
                centered={false}
                size='tiny'
                open={actividadHecha.show}
                closeIcon
                onClose={() => setactividadHecha({ show: false, calificacion: 0 })}
                onOpen={() => setactividadHecha({ show: true })}
                header={"Usted ya ha contestado esta actividad, su calificación es: " + actividadHecha.calificacion}
            />
        </>
    )
}

export default GrupoCardActividad