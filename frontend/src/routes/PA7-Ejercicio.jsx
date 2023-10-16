import React, { useRef, useState, useEffect } from 'react';
import { Button, Form, Grid, Input, Item, Label } from 'semantic-ui-react';
import Grafica from '../components/Plotly';
import imagen from '../images/newplot (1).png';

const PA8Pruebas = () => {
   useEffect(() => {
      // Cargar MathJax después de que el componente esté montado
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
      document.head.appendChild(script);
  
      return () => {
        // Eliminar el script de MathJax al desmontar el componente
        document.head.removeChild(script);
      };
    }, []);

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

   const resolverEcuacionCuadratica = () => {
      const a = parseFloat(document.getElementById('a').value);
      const b = parseFloat(document.getElementById('b').value);
      const c = parseFloat(document.getElementById('c').value);
      const discriminante = b * b - 4 * a * c;

      const paso1 = `Paso 1: La ecuación cuadrática es:  <br> <br> <span class="math">  \\(${a}x^2 ${b < 0 ? b : '+' + b}x ${c < 0 ? c : '+' + c} = 0\\)</span>`;
  
  // Paso 2
  const paso2 = `<br> Paso 2: Aplicamos la fórmula general:<br><br> <span class="math2"> \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)</span>`;
  // Paso 3
  const paso3 = ` <br> Paso 3: Sustituimos los valores de a, b y c : <br><br> <span class="math"> \\(\\sqrt{b^2 - 4ac} = \\sqrt{(${b})^2 - 4(${a})(${c})} =  \\sqrt{(${b * b}) - (${4 * a * c})} = \\sqrt{${discriminante}}\\)</br></span>`;

  let pasosHTML = `${paso1}<br>${paso2}<br>${paso3}<br>`;

  if (discriminante > 0) {
    const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
    //const paso4 = `<br> Paso 4: Aplicamos la fórmula general: <br> <span class="math2">   \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) </span>`;
    const paso5 = `Paso 5: Sustituimos los valores: <br><br> <span class="math"> \\(x_1 = \\frac{-(${b}) + \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}  = \\frac{-(${b}) + \\sqrt{${discriminante}}}{2(${a})} = \\frac{${-b + Math.sqrt(discriminante)}}{${2 * a}} = ${x1.toFixed(2)}\\) 
                                               <br>  \\(x_2 = \\frac{-(${b}) - \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})} = \\frac{-(${b}) - \\sqrt{${discriminante}}}{2(${a})} = \\frac{${-b - Math.sqrt(discriminante)}}{${2 * a}} = ${x2.toFixed(2)}\\) </span>`;
    const paso6 = `Paso 6: Simplificamos las fracciones: <br> <br> <span class="math"> \\(x_1 = ${x1.toFixed(2)}\\) y \\(x_2 = ${x2.toFixed(2)}\\) </span>`;
    const paso7 = `Paso 7: Verificamos las soluciones: <br> <span class="math">  \\(${a}(${x1.toFixed(2)})^2 + ${b}(${x1.toFixed(2)}) + ${c} = ${(a * x1 * x1 + b * x1 + c).toFixed(2)} \\approx 0\\) y \\(${a}(${x2.toFixed(2)})^2 + ${b}(${x2.toFixed(2)}) + ${c} = ${(a * x2 * x2 + b * x2 + c).toFixed(2)} \\approx 0\\) </span>`;
    pasosHTML += `<br>${paso5}<br><br>${paso6}`;
  } else if (discriminante === 0) {
    const x = -b / (2 * a);
    //const paso4 = `<br>Paso 4: Aplicamos la fórmula general: <br> <span class="math2"> \\(x = \\frac{-b}{2a}\\)</span>` ;
    const paso5 = `Paso 5: Sustituimos los valores:<br><br> <span class="math"> \\(x = \\frac{-(${b})}{2(${a})} = ${x.toFixed(2)}\\)</span>`;
    const paso6 = `<br>Paso 6: Verificamos la solución: <br><br> <span class="math"> \\(${a}(${x.toFixed(2)})^2 + ${b}(${x.toFixed(2)}) + ${c} = ${(a * x * x + b * x + c).toFixed(2)} \\approx 0\\) </span>`;
    pasosHTML += `<br>${paso5}<br><br>${paso6}<br>`;
  } else {
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminante) / (2 * a);
    //const paso4 = `<br>Paso 4: Aplicamos la fórmula general: <br> <span class="math2">  \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)</span>`;
    const paso5 = `Paso 5: Sustituimos los valores: <br><br> <span class="math">  \\(x_1 = ${realPart.toFixed(2)} + ${imaginaryPart.toFixed(2)}i\\) <br> \\(x_2 = ${realPart.toFixed(2)} - ${imaginaryPart.toFixed(2)}i\\)</span>`;
    const paso6 = `<br>Paso 6: Verificamos las soluciones: <br><br> <span class="math"> \\(${a}(${realPart.toFixed(2)} + ${imaginaryPart.toFixed(2)}i)^2 + ${b}(${realPart.toFixed(2)} + ${imaginaryPart.toFixed(2)}i) + ${c} = ${(a * (realPart + imaginaryPart * Math.sqrt(-1)) * (realPart + imaginaryPart * Math.sqrt(-1)) + b * (realPart + imaginaryPart * Math.sqrt(-1)) + c).toFixed(2)} \\approx 0\\) y \\(${a}(${realPart.toFixed(2)} - ${imaginaryPart.toFixed(2)}i)^2 + ${b}(${realPart.toFixed(2)} - ${imaginaryPart.toFixed(2)}i) + ${c} = ${(a * (realPart - imaginaryPart * Math.sqrt(-1)) * (realPart - imaginaryPart * Math.sqrt(-1)) + b * (realPart - imaginaryPart * Math.sqrt(-1)) + c).toFixed(2)} \\approx 0\\) </span>`;
    pasosHTML += `<br>${paso5}<br><br>${paso6}`;
  }

  // Mostrar los pasos con MathJax
  document.getElementById('pasos').innerHTML = pasosHTML;

  // Actualizar MathJax después de agregar contenido
  if (window.MathJax) {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  }
};

   

   const obtenerEcuacionCuadratica = () => {
      const r1 = parseFloat(document.getElementById('r1').value);
      const r2 = parseFloat(document.getElementById('r2').value);
     
         // Paso 1
      const paso1 = `<br>Paso 1: Las raíces de la ecuación cuadrática son: 
         <br> <span className="math">\\(r_1 = ${r1}\\)</span> y <span className="math">\\(r_2 = ${r2}\\)</span>`;
     
         // Paso 2
      const sumaRaices = r1 + r2;
      const productoRaices = r1 * r2;
      const paso2 = `<br>Paso 2: Calculamos la suma y el producto de las raíces:<br><span className="math">\\(r_1 + r_2 = ${r1} + ${r2} = ${sumaRaices}\\)</span> 
         <br> <span className="math">\\(r_1 r_2 = ${r1} \\cdot ${r2} = ${productoRaices}\\)</span>`;
     
         // Paso 3
      const a = 1;
      const b = -sumaRaices;
      const c = productoRaices;
      const paso3 = `<br> Paso 3: Usando la fórmula cuadrática, obtenemos los coeficientes de la ecuación cuadrática:
         <br><span className="math">\\(a = ${a}\\)</span>
         <br> <span className="math">\\(b = -(${sumaRaices}) = ${b}\\)</span> 
         <br> <span className="math">\\(c = ${productoRaices}\\)</span>`;
     
         // Paso 4
      const paso4 = `<br>Paso 4: La ecuación cuadrática es: <br> <span className="math">\\(x^2 ${b < 0 ? b : '+' + b}x ${c < 0 ? c : '+' + c} = 0\\)</span>`;
     
      let resultadoHTML = `${paso1}<br>${paso2}<br>${paso3}<br>${paso4}`;
     
         // Mostrar el resultado con MathJax
      document.getElementById('resultado').innerHTML = resultadoHTML;
     
         // Actualizar MathJax después de agregar contenido
      if (window.MathJax) {
           window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      }
   };

   const limpiarPantalla = () => {
      document.getElementById('resultado').innerHTML = '';
      document.getElementById('pasos').innerHTML = '';
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
                     <Button onClick={resolverEcuacionCuadratica}>Resolver</Button>
                    
                     
                  </Form>
               </Grid.Row>

               <Grid.Row>
            <Form>
              <Form.Group inline>
                <Form.Field width={9}>
                  <label htmlFor="r1">Raiz1: </label>
                  <Input
                    placeholder='x1'
                    type='number'
                    id="r1"
                    
                  />
                  <Label size='small' circular content=" =r1"></Label>
                </Form.Field>
                <Form.Field width={9}>
                  <label htmlFor="r2">Raiz2: </label>
                  <Input
                    placeholder='x2'
                    type='number'
                    id="r2"
                    
                  />
                  <Label size='small' circular content=" =r2"></Label>
                </Form.Field>
              </Form.Group>
              <Button onClick={obtenerEcuacionCuadratica}>Obtener Ec. cuadrática</Button>
              <Button onClick={limpiarPantalla}>Limpiar Pantalla</Button>
              <div id="resultado"></div>
              <div id="pasos"></div>
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