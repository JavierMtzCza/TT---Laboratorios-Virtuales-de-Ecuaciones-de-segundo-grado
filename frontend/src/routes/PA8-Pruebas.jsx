import React, { useRef, useState, useEffect } from 'react';
import { Button, Form, Grid, Input, Item, Label, Message } from 'semantic-ui-react';
import Grafica from '../components/Grafica';
import imagen from '../images/newplot (1).png';

const PA8Pruebas = () => {
   const [terminos, setTerminos] = useState({
      terminoCuadratico: 1,
      terminoLineal: 0,
      terminoIndependiente: 0,
   });
   const termCuad = useRef(1);
   const termLin = useRef(0);
   const termInd = useRef(0);

   const handleSubmit = () => {
      event.preventDefault();
      setTerminos({
         terminoCuadratico: termCuad.current,
         terminoLineal: termLin.current,
         terminoIndependiente: termInd.current,
      });
   };

   

   return (
      <Grid columns={2} stackable>
         <Grid.Row>
            <Grid.Column style={{ margin: "2% 0 0 0" }}>
               <Grid.Row>
                  <Item.Group style={{ background: "#F5F5F5" }}>
                     <Item>
                        <Item.Image rounded bordered size='medium' src={imagen} />
                        <Item.Content verticalAlign='middle'>
                           <Item.Header>Grafica la funcion</Item.Header>
                           <Item.Meta>
                              <span>Con respecto a la imagen de la izquierda, grafica la funcion de tal forma que tenga raices en -5 y 6</span>
                           </Item.Meta>
                        </Item.Content>
                     </Item>
                  </Item.Group>
               </Grid.Row>
               <Grid.Row style={{ margin: "7% 0 0 0" }}>
                  <Form>
                     <Form.Group inline>
                        <Form.Field width={9}>
                           <label htmlFor="a">a:</label>
                           <Input
                              placeholder='T. Cuadratico'
                              type='number'
                              label="x^2"
                              labelPosition='right corner'
                              step="any"
                              id="a"
                              onChange={(e) => { termCuad.current = e.target.value }} />
                           <Label size='small' circular content="+"></Label>
                        </Form.Field>
                        <Form.Field width={9}>
                           <label htmlFor="b">b:</label>
                           <Input
                              placeholder='T. Lineal'
                              type='number'
                              label="x"
                              labelPosition='right corner'
                              step="any"
                              id="b"
                              onChange={(e) => { termLin.current = e.target.value }} />
                           <Label size='small' circular content="+"></Label>
                        </Form.Field>
                        <Form.Field width={9}>
                           <label htmlFor="c">c:</label>
                           <Input
                              placeholder='T. Independiente'
                              type='number'
                              step="any"
                              id="c"
                              onChange={(e) => { termInd.current = e.target.value }} />
                           <Label size='small' circular content=" =y"></Label>
                        </Form.Field>
                     </Form.Group>
                     <Button onClick={handleSubmit}>Graficar</Button>
                     <Button id="calculateButton" onClick={() => {  }}>Resolver</Button> 
                  </Form>
                  
               </Grid.Row>
            </Grid.Column>
            <Grid.Column>
               <Grafica
                  termCuadratico={terminos.terminoCuadratico}
                  termLinear={terminos.terminoLineal}
                  termIndependiente={terminos.terminoIndependiente}
               />
            </Grid.Column>
         </Grid.Row>
      </Grid>
   )
}

export default PA8Pruebas;