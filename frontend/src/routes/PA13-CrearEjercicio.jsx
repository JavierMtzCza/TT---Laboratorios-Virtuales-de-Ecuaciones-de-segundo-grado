import { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Form, Grid, Header, Icon, Segment, Step } from 'semantic-ui-react'
import moment from 'moment';

const PA13CrearEjercicio = () => {

  const time = useRef(moment().format('YYYY-MM-DDTHH:mm'))

  return (
    <>
      <Step.Group attached='top' fluid unstackable >
        <Step active={false} disabled={true}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Datos de la Actividad</Step.Title>
          </Step.Content>
        </Step>

        <Step disabled={true} active={false}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Datos del ejercicio</Step.Title>
          </Step.Content>
        </Step>

        <Step disabled={false} active={true}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Respuesta</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>

      <Segment attached>
        <Form style={{ margin: "2% 15% 0% 15%" }}>
          <>
            <Form.Field required>
              <label>Texto de la pregunta</label>
              <input placeholder='Explica de que trata esta pregunta' />
            </Form.Field>
            <Form.Field>
              <label>Consejo</label>
              <input placeholder='Agrega un consejo para tus alumnos' />
            </Form.Field>
            <Form.Group inline >
              <Form.Field>
                <label>Fecha Limite</label>
                <input type='file' />
              </Form.Field>
              <Form.Field>
                <label>URL de Youtube</label>
                <input />
              </Form.Field>
            </Form.Group>
          </>
          <>
            <Form.Field required>
              <label>Nombre</label>
              <input placeholder='Nombre' />
            </Form.Field>
            <Form.Field>
              <label>Descripción</label>
              <input placeholder='Descripción' />
            </Form.Field>
            <Form.Field >
              <label>Fecha Limite</label>
              <input type='datetime-local' defaultValue={time.current} min={time.current} />
            </Form.Field>
          </>
        </Form>
      </Segment>
    </>
  )
}

export default PA13CrearEjercicio