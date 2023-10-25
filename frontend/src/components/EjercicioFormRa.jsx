import { Button, Form, Grid, Input, Label, Segment } from "semantic-ui-react"

const EjercicioFormRa = ({ resolver, limpiar }) => {
  return (
    // <Form>
    //   <Form.Group inline>
    //     <Form.Field width={9}>
    //       <label htmlFor="r1">Raiz1: </label>
    //       <Input type='number' step='any' placeholder='x1' id='r1' />
    //       <Label size='small' circular content=" =r1"></Label>
    //     </Form.Field>
    //     <Form.Field width={9}>
    //       <label htmlFor="r2">Raiz2: </label>
    //       <Input type='number' step='any' placeholder='x2' id='r2' />
    //       <Label size='small' circular content=" =r2"></Label>
    //     </Form.Field>
    //   </Form.Group>
    //   <Button onClick={resolver}>Obtener Ec. cuadrática</Button>
    //   <Button onClick={limpiar}>Limpiar Pantalla</Button>
    // </Form>

    <Segment style={{ margin: '0% 7px 0px 7px' }}>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {/* <div id="resultado"></div> */}
            <Form widths="equal" onSubmit={() => graficar()}>
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
            </Form >
          </Grid.Column>
          <Grid.Column>
            <Form >
              <Form.Group grouped>
                <Form.Input type='number' step='any' label='Raiz 1' id='r1'></Form.Input>
                <Form.Input type='number' step='any' label='Raiz 2' id='r2'></Form.Input>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button.Group fluid>
        <Button type='submit' color='teal'>Calcular Raices</Button>
        <Button.Or text='o' />
        <Button color='blue'>Obtener Ecuacion</Button>
      </Button.Group>
    </Segment>
  )
}

export default EjercicioFormRa