import { useEffect, useState } from 'react'
import { useActividadStore, useGrupoStore } from '../stores/UsuarioStore'
import { Button, Header, Icon, Message, Segment, Table } from 'semantic-ui-react'
import * as XLSX from 'xlsx';

const PA15CalificacionesActividad = () => {

  const [calificaciones, setCalificaciones] = useState([])
  const [sinAlumnos, setSinAlumno] = useState(false)
  const grupo = useGrupoStore(state => state.grupo)
  const actividad = useActividadStore(state => state.actividad)

  const handleDownload = () => {
    const libro = XLSX.utils.book_new()
    const hoja = XLSX.utils.json_to_sheet(calificaciones)
    XLSX.utils.book_append_sheet(libro, hoja, "Calificaciones")
    XLSX.writeFile(libro, "Calificaciones_" + grupo.nombre + "_" + actividad.nombre + ".xlsx")
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/calificacionesActividad/${actividad.id}/${grupo.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setCalificaciones(data)
        } else {
          setSinAlumno(true)
        }
      })
  }, [])


  return (
    <>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>{actividad.nombre}</Header.Content>
      </Header>
      {

        !sinAlumnos ?
          <>
            <Table unstackable textAlign="center" compact style={{ margin: "1% 1% 1% 1%" }} >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Apellido Paterno</Table.HeaderCell>
                  <Table.HeaderCell>Apellido Materno</Table.HeaderCell>
                  <Table.HeaderCell>Calificacion</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  calificaciones.map((calificacion) => (
                    <Table.Row key={calificacion.id}>
                      <Table.Cell>{calificacion.nombre}</Table.Cell>
                      <Table.Cell>{calificacion.apellido_paterno}</Table.Cell>
                      <Table.Cell>{calificacion.apellido_materno}</Table.Cell>
                      <Table.Cell>{calificacion.calificacion == -1 ? "-" : calificacion.calificacion}</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
            <Button onClick={handleDownload} content="Guardar en Excel" />
          </>
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

export default PA15CalificacionesActividad