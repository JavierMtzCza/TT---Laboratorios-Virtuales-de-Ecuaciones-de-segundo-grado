import React, { useRef, useState } from 'react'
import Grafica from '../components/Grafica'
import { Button, Form, Grid, Input, Label } from 'semantic-ui-react'

const PA7Graficar = () => {

   const [terminos, setTerminos] = useState({ terminoCuadratico: 1, terminoLineal: 0, terminoIndependiente: 0 })
   const termCuad = useRef(1)
   const termLin = useRef(0)
   const termInd = useRef(0)

   
   return (
      <Grid style={{ height: "80vh" }} columns={1}>
         <Grid.Row centered>
            <Grid.Column>
            </Grid.Column>
         </Grid.Row>
         <Grafica termCuadratico={terminos.terminoCuadratico}
            termLinear={terminos.terminoLineal}
            termIndependiente={terminos.terminoIndependiente}
         />
         <Grid.Row>
            <Grid.Column>
               
            </Grid.Column>
         </Grid.Row>
      </Grid >

   )
}

export default PA7Graficar