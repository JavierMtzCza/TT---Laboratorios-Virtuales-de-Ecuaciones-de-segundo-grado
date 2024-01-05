import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { Grid, Input, Label } from 'semantic-ui-react';

const Plotly = ({ a1, b1, c1 }) => {

   const [dominio, setDominio] = useState(50)
   const [color, setColor] = useState('#68FF33')
   const [data, setData] = useState({ xss: [], yss: [], rais: [] })

   useEffect(() => {
      var xs = []
      var ys = []
      var raices = []
      const a = parseFloat(a1);
      const b = parseFloat(b1);
      const c = parseFloat(c1);
      var discriminante = (b * b) - (4 * a * c)

      for (var x = -dominio; x <= dominio; x += .2) {
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
      setData({ xss: xs, yss: ys, rais: raices })
   }, [a1, b1, c1, dominio])


   return (
      <>
         <Grid columns={1}  >
            <Grid.Row>
               <Grid.Column>
                  <Grid columns={2}>
                     <Grid.Row style={{margin:"2% 0% 0% 0%"}}>
                        <Grid.Column stretched>
                           <Label size='large' content="Cambiar el color de la función." />
                           <Input type='color'  onChange={(e) => { setColor(e.target.value.toString()) }} />
                        </Grid.Column>
                        <Grid.Column stretched>
                           <Label size='large' content={`Cambiar el dominio de -${dominio} a +${dominio}`} />
                           <Input
                              type='range'
                              min="2"
                              max="50"
                              step="2"
                              onChange={(e) => { setDominio(e.target.value) }}
                           />
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
                  <Plot
                     data={[
                        {
                           name: 'Ecuacion', type: 'scatter', mode: 'lines+markers', marker: { color: color },
                           x: data.xss,
                           y: data.yss,
                        },
                        {
                           name: 'Raices', mode: 'markers', marker: { size: [18, 18] },
                           x: [data.rais[0], data.rais[2]],
                           y: [data.rais[1], data.rais[3]],
                        }
                     ]}

                     layout={{
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

                     config={{ responsive: true, displayModeBar: true, displaylogo: false }}
                     style={{ width: "100%", height: "90vh" }}
                  />
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </>
   )
}

export default Plotly