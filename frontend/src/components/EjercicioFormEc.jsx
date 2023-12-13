import { Button, Form, Icon, Input, Message, Segment } from "semantic-ui-react"

const EjercicioFormEc = ({ tipo, registrador, graficar, mensaje }) => {
  return (
    <>
      <Form onSubmit={graficar} style={{ margin: "0% 15% 0% 15%" }}>
        {tipo ?
          <Form.Group widths='equal' grouped>
            <Form.Field>
              <Input type='number' step="any" placeholder='Termino Cuadratico' icon>
                <input {...registrador("a")} />
                <Icon name='superscript' />
              </Input>
            </Form.Field>
            <Form.Field>
              <Input type='number' step="any" placeholder='Termino Lineal' icon>
                <input {...registrador("b")} />
                <Icon name='x' />
              </Input>
            </Form.Field>
            <Form.Field>
              <Input type='number' step="any" placeholder='Termino Independiente' icon>
                <input {...registrador("c")} />
                {/* <Icon name='circle outline' /> */}
              </Input>
            </Form.Field>
          </Form.Group>
          :
          <Form.Group inline widths='equal'>
            <Form.Field>
              <Input fluid type='number' step="any" placeholder='Raiz 1' icon>
                <input {...registrador("r1")} />
              </Input>
            </Form.Field>
            <Form.Field>
              <Input fluid type='number' step="any" placeholder='Raiz 2' icon>
                <input {...registrador("r2")} />
              </Input>
            </Form.Field>
          </Form.Group>
        }
        <Segment textAlign="center" basic>
          <Button type='submit' color='teal' fluid content="Contestar" ></Button>
          {mensaje.show ? <Message color="red" content={mensaje.consejo} header={mensaje.texto} /> : <></>}
        </Segment>
      </Form>
    </>
  )
}

export default EjercicioFormEc