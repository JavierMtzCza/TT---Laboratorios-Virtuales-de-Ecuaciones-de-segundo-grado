import { useEffect, useState } from "react"
import { useGrupoStore } from "../stores/UsuarioStore"
import { Grid, Message, Segment, Table } from "semantic-ui-react"

const CalificacionesGrupales = () => {

  const [actividades, setActividades] = useState([])
  const [calificaciones, setCalificaciones] = useState([])
  const [sinAlumnos, setSinAlumno] = useState(false)
  const grupo = useGrupoStore(state => state.grupo)


  useEffect(() => {
    fetch(`http://localhost:3000/actividad/calificaciones/${grupo.id}`)
      .then((response) => response.json())
      .then((data) => {

        const actividades = data.pop()

        if (data.length > 0) {
          setSinAlumno(false)
          setActividades(actividades)
          setCalificaciones(data)

        } else {
          setSinAlumno(true)
        }
      })
  }, [])



  return (
    <>
      {
        !sinAlumnos ?
          <Table unstackable textAlign="center" compact style={{ margin: "1% 1% 1% 1%" }} >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Apellido Paterno</Table.HeaderCell>
                <Table.HeaderCell>Apellido Materno</Table.HeaderCell>
                {
                  actividades.map((actividad) => (
                    <Table.HeaderCell key={actividad.id} content={actividad.nombre} />
                  ))
                }
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                calificaciones.map((calificacion) => (
                  <Table.Row key={calificacion.id}>
                    <Table.Cell>{calificacion.nombre}</Table.Cell>
                    <Table.Cell>{calificacion.apellido_paterno}</Table.Cell>
                    <Table.Cell>{calificacion.apellido_materno}</Table.Cell>
                    {
                      actividades.map((actividad) => (
                        <Table.Cell error={calificacion[actividad.nombre] == -1 ? true : false} key={actividad.id}>{calificacion[actividad.nombre] == -1 ? "-" : calificacion[actividad.nombre]}</Table.Cell>
                      ))
                    }
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
          :
          <Segment textAlign="center" basic>
            <Message warning
              header="No se tienen alumnos registrados en este grupo"
              content="Para poder ver a los alumnos y sus calificaciones, puede primero compartir la clave del grupo"
            />
          </Segment>
      }
    </>
  )
}

export default CalificacionesGrupales