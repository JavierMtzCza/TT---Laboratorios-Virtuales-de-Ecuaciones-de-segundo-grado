import { Button, Form, Grid, Icon, Input, Label, Segment } from "semantic-ui-react"

const EjercicioFormEc = ({ deshabilitarRaices, deshabilitarEcuacion, registrador, graficar, resolver }) => {
  return (
    <>
      <Segment style={{ margin: '0% 7px 0px 7px' }}>
        <Form onSubmit={graficar}>
          <Grid columns={2} verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                {/* <div id="resultado"></div> */}
                <Form.Group grouped>
                  <Form.Field>
                    <Input disabled={deshabilitarEcuacion} type='number' step="any" placeholder='Termino Cuadratico' icon>
                      <input {...registrador("a")} />
                      <Icon name='superscript' />
                    </Input>
                  </Form.Field>
                  <Label circular color="red">+</Label>
                  <Form.Field>
                    <Input disabled={deshabilitarEcuacion} type='number' step="any" placeholder='Termino Lineal' icon>
                      <input {...registrador("b")} />
                      <Icon name='x' />
                    </Input>
                  </Form.Field>
                  <Label circular color="red">+</Label>
                  <Form.Field>
                    <Input disabled={deshabilitarEcuacion} type='number' step="any" placeholder='Termino Independiente' icon>
                      <input {...registrador("c")} />
                      <Icon name='circle outline' />
                    </Input>
                  </Form.Field>
                  <Label circular color="red"> = 0</Label>
                </Form.Group>
              </Grid.Column>
              <Grid.Column>
                <Form.Group grouped>
                  <Form.Field>
                    <Input disabled={deshabilitarRaices} type='number' step="any" placeholder='Raiz 1' icon>
                      <input {...registrador("r1")} />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <Input disabled={deshabilitarRaices} type='number' step="any" placeholder='Raiz 2' icon>
                      <input {...registrador("r2")} />
                    </Input>
                  </Form.Field>
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button.Group fluid>
            <Button type='submit' color='teal'>Calcular Raices</Button>
            <Button.Or text='o' />
            <Button color='blue'>Obtener Ecuacion</Button>
          </Button.Group>
        </Form>
      </Segment>
    </>
  )
}

export default EjercicioFormEc