import { useState } from 'react'
import Plot from 'react-plotly.js';
import { Grid, Input, Label } from 'semantic-ui-react';

const Plotly = ({ termCuadratico, termLinear, termIndependiente }) => {

   const [dominio, setDominio] = useState(25)
   const [color, setColor] = useState('#68FF33')
   var xs = []
   var ys = []
   var raices
   const a = eval(termCuadratico)
   const b = eval(termLinear)
   const c = eval(termIndependiente)
   var discriminante = (b * b) - (4 * a * c)

   for (var x = -dominio; x <= dominio; x += .4) {
      xs.push(x)
      ys.push((a * x * x) + (b * x) + (c))
   }

   if (discriminante > 0) { //Dos soluciones
      raices = [((-b + Math.sqrt(discriminante)) / (2 * a)), 0, ((-b - Math.sqrt(discriminante)) / (2 * a)), 0]
   } else if (discriminante == 0) { //Una solucion
      raices = [((-b + Math.sqrt(discriminante)) / (2 * a)), 0, null, null]
   } else if (discriminante < 0) {
      raices = [null, null, null, null]
   }

   return (
      <>
         <Grid columns={1}  >
            <Grid.Row>
               <Grid.Column>
                  <Plot
                     data={[
                        {
                           name: 'Ecuacion', type: 'scatter', mode: 'lines+markers', marker: { color: color },
                           x: xs,
                           y: ys,
                        },
                        {
                           name: 'Raices', mode: 'markers', marker: { size: [18, 18] },
                           x: [raices[0], raices[2]],
                           y: [raices[1], raices[3]],
                        }
                     ]}

                     layout={{
                        title: termCuadratico + "x^2 " + termLinear + "x + " + termIndependiente,
                        showlegend: false,
                        modebar: { remove: ['lasso2d', 'hoverClosestGl2d', 'select2d', 'resetScale2d'] },
                        xaxis: {
                           showspikes: true,
                           spikecolor: 'black',
                           spikethickness: 1,
                           spikemode: 'end',
                           spikelabel: '>',
                        },
                        yaxis: {
                           showspikes: true,
                           spikecolor: 'black',
                           spikethickness: 1,
                           spikemode: 'end',
                           spikelabel: '>',
                        },
                     }}

                     config={{ responsive: true, scrollZoom: true, displayModeBar: true, displaylogo: false }}
                     style={{ width: "100%", height: "90vh" }}
                  />
                  <Grid columns={2}>
                     <Grid.Row>
                        <Grid.Column stretched>
                           <Input
                              type='color'
                              onChange={(e) => { setColor(e.target.value.toString()) }} />
                           <Label size='large' content="Color de la funcion" />
                        </Grid.Column>
                        <Grid.Column stretched>
                           <Input
                              type='range'
                              min="5"
                              max="50"
                              step="5"
                              onChange={(e) => { setDominio(e.target.value) }}
                           />
                           <Label size='large' content={`Dominio de -${dominio} a +${dominio}`} />
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </>
   )
}

export default Plotly