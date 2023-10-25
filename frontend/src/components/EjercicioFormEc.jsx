import { Button, Form, Grid, Icon, Input, Label, Segment } from "semantic-ui-react"

const EjercicioFormEc = ({ registrador, graficar, resolver }) => {
  return (
    <>
      {/* <Form>
        <Form.Group>
          <Form.Field inline>
            <Input type='number' step="any" label="x^2" placeholder='Termino Cuadratico' labelPosition='right' id="a"
              onChange={(e) => { TerminoCuadratico.current = e.target.value == '' ? 0 : e.target.value }}
            />
            <Label size='small' circular content="+"></Label>
          </Form.Field>
          <Form.Field >
            <Input type='number' step="any" label="x" placeholder='Termino Lineal' labelPosition='right' id="b"
              onChange={(e) => { TerminoLineal.current = e.target.value == '' ? 0 : e.target.value }}
            />
            <Label size='small' circular content="+"></Label>
          </Form.Field>
          <Form.Field >
            <Input type='number' step="any" label="" placeholder='Termino Independiente' labelPosition='right' id="c"
              onChange={(e) => { TerminoIndependiente.current = e.target.value == '' ? 0 : e.target.value }}
            />
            <Label size='small' circular content=" =0"></Label>
          </Form.Field>
        </Form.Group>
        <Button onClick={() => {
          graficar()
          resolver()
        }}>Graficar</Button>
      </Form> */}
      {/* <Form widths="equal" onSubmit={()=>graficar()}>
        <Form.Group grouped>
          <Form.Field>
            <Input type='number' step="any" placeholder='Termino Cuadratico' icon>
              <input {...registrador("a")} />
              <Icon name='superscript' />
            </Input>
          </Form.Field>
          <Label circular color="red">+</Label>
          <Form.Field>
            <Input type='number' step="any" placeholder='Termino Lineal' icon>
              <input {...registrador("b")} />
              <Icon name='x' />
            </Input>
          </Form.Field>
          <Label circular color="red">+</Label>
          <Form.Field>
            <Input type='number' step="any" placeholder='Termino Independiente' icon>
              <input {...registrador("c")} />
              <Icon name='circle outline' />
            </Input>
          </Form.Field>
          <Label circular color="red"> = 0</Label>
        </Form.Group>
        <Button content='asdasd' type="submit"></Button>
      </Form > */}

      <Segment style={{ margin: '0% 7px 0px 7px' }}>
        <Form onSubmit={graficar}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                {/* <div id="resultado"></div> */}
                <Form.Group grouped>
                  <Form.Field>
                    <Input type='number' step="any" placeholder='Termino Cuadratico' icon>
                      <input {...registrador("a")} />
                      <Icon name='superscript' />
                    </Input>
                  </Form.Field>
                  <Label circular color="red">+</Label>
                  <Form.Field>
                    <Input type='number' step="any" placeholder='Termino Lineal' icon>
                      <input {...registrador("b")} />
                      <Icon name='x' />
                    </Input>
                  </Form.Field>
                  <Label circular color="red">+</Label>
                  <Form.Field>
                    <Input type='number' step="any" placeholder='Termino Independiente' icon>
                      <input {...registrador("c")} />
                      <Icon name='circle outline' />
                    </Input>
                  </Form.Field>
                  <Label circular color="red"> = 0</Label>
                </Form.Group>
              </Grid.Column>
              <Grid.Column>
                <Form.Group grouped>
                  <Form.Input type='number' step='any' label='Raiz 1' id='r1'></Form.Input>
                  <Form.Input type='number' step='any' label='Raiz 2' id='r2'></Form.Input>
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