import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Icon, Image, Input, Item, Message, Segment } from 'semantic-ui-react';
import Plotly from '../components/Plotly';
import logo from "../images/Logo.png"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';

const PA4Laboratorios = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [data, setData] = useState({ tc: 0.0, tl: 0.0, ti: 0.0 })
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width:768px)" })

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

  const resolverEcuacionCuadratica = (a1, b1, c1) => {
    const a = parseFloat(a1);
    const b = parseFloat(b1);
    const c = parseFloat(c1);
    const disc1 = (b * b);
    const disc2 = (4 * a * c);
    const discriminante = disc1 - disc2;
    const raizDiscriminante = Math.sqrt(discriminante);
    //const arriba = -1*b+raizDiscriminante
    const paso1 = `<p>Paso 1: La ecuación cuadrática es:</p><span class="math">\\(${a}x^2 ${b < 0 ? b : '+' + b}x ${c < 0 ? c : '+' + c} = 0\\)<br></span>`;
    const paso2 = `<p>Paso 2: Aplicamos la fórmula general:</p><span class="math2"> \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)<br></span>`;
    const paso3 = `<p>Paso 3: Sustituimos los valores de a, b y c para obtener el discriminante:</p><span class="math">\\(\\sqrt{b^2 - 4ac} = \\sqrt{(${b})^2 - 4(${a})(${c})} = \\sqrt{(${disc1}) - (${disc2})} = \\sqrt{${discriminante}}\\)</br></span>`;
    let pasosHTML = `<br>${paso1}<br>${paso2}<br>${paso3}<br>`;

    if (discriminante > 0) {
      const x1 = (-1 * (b) + (raizDiscriminante)) / (2 * a);
      const x2 = (-1 * (b) - (raizDiscriminante)) / (2 * a);
      const paso4 = `<p>Paso 4: Analizamos el discriminante para saber cuantas raices tiene:</p><span class="math2">\\(\\sqrt{${discriminante}} = {${raizDiscriminante.toFixed(2)}} \\therefore {${raizDiscriminante.toFixed(2)}} > 0\\)</br></span>`;
      const paso5 = `<p>Paso 5: Como el discriminante es mayor que 0, sabemos que esta ecuación tiene dos raices:</p><span class="math">\\(x_1 = \\frac{-(${b}) + \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}  = \\frac{-(${b}) + \\sqrt{${discriminante}}}{2(${a})} = \\frac{${-1 * b + (raizDiscriminante.toFixed(3))}}{${2 * a}} = ${x1.toFixed(4)}\\)<br>\\(x_2 = \\frac{-(${b}) - \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})} = \\frac{-(${b}) - \\sqrt{${discriminante}}}{2(${a})} = \\frac{${-b - (raizDiscriminante.toFixed(3))}}{${2 * a}} = ${x2.toFixed(4)}\\)</br></span>`;
      const paso6 = `<p>Paso 6: Simplificamos las fracciones:</p><span class="math"> \\(x_1 = ${x1.toFixed(4)}\\) y \\(x_2 = ${x2.toFixed(4)}\\)</br></span>`;
      pasosHTML += `${paso4}<br>${paso5}<br>${paso6}`;
    } else if (discriminante === 0) {
      const x = -b / (2 * a);
      const paso4 = `<p>Paso 4: Analizamos el discriminante para saber cuantas raices tiene:</p><span class="math2">\\(\\sqrt{${discriminante}} = {${raizDiscriminante}} \\therefore {${raizDiscriminante}} = 0\\)</br></span>`;
      const paso5 = `<p>Paso 5: Como el discriminante es igual que 0, sabemos que esta ecuación tiene una raiz:</p><span class="math">\\(x =\\frac{-(${b})+0}{2(${a})} = ${x.toFixed(2)}\\)</br></span>`;
      pasosHTML += `${paso4}<br>${paso5}`;
    } else {
      const paso4 = `<p>Paso 4: Analizamos el discriminante para saber cuantas raices tiene:</p><span class="math2">\\(\\sqrt{${discriminante}} = imaginario\\)</br></span>`;
      const paso5 = `<p>Paso 5: Como el discriminante es un número imaginario, sabemos que esta ecuación no tiene raices reales.</p>`;
      pasosHTML += `${paso4}<br>${paso5}`;
    }
    document.getElementById('pasos').innerHTML = pasosHTML;
    if (window.MathJax)
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  };

  const onSubmit = handleSubmit((formData) => {
    if (formData.a == '' || formData.b == '' || formData.c == '') {
      alert("Debe poner algo en los campos")
    } else {
      resolverEcuacionCuadratica(formData.a, formData.b, formData.c)
    }
    setData({ tc: formData.a, tl: formData.b, ti: formData.c })
  })


  return (
    <Grid columns={2} stackable>
      <Grid.Row centered>
        <Grid.Column textAlign="center" style={{ padding: '2px' }}>
          <div>
            <p style={{ fontSize: '1.5em', marginBottom: '5px' }}>
              ¡Para desbloquear todas las funciones, crea una cuenta!</p>
            <Link to="/Registro">
              <Button primary>Crear Cuenta</Button>
            </Link>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Grid.Row>
            <Segment basic>
              <Grid style={{ background: "#FEF6AF", margin: "1% 5% 0% 5%", borderRadius: "15px" }} columns={2}>
                <Grid.Row>
                  <Grid.Column verticalAlign='middle' width={3}>
                    <Image floated='left' size='medium' src={logo} />
                  </Grid.Column>
                  <Grid.Column verticalAlign='middle' width={13}>
                    <Message color='olive' style={{ borderRadius: "14px" }} header="¡Observa cómo cambia el comportamiento de la gráfica con distintos valores!" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Row>
          <Grid.Row style={{ margin: "7% 0 0 0" }}>
            <Form onSubmit={onSubmit} style={{ margin: "0% 15% 0% 15%" }}>
              <Form.Group widths='equal' grouped>
                <Form.Field>
                  <Input type='number' step="any" placeholder='Termino Cuadrático' icon>
                    <input {...register("a")} />
                    <Icon name='superscript' />
                  </Input>
                </Form.Field>
                <Form.Field>
                  <Input type='number' step="any" placeholder='Termino Lineal' icon>
                    <input {...register("b")} />
                    <Icon name='x' />
                  </Input>
                </Form.Field>
                <Form.Field>
                  <Input type='number' step="any" placeholder='Termino Independiente' icon>
                    <input {...register("c")} />
                  </Input>
                </Form.Field>
              </Form.Group>
              <Segment textAlign="center" basic>
                <Button type='submit' color='teal' fluid content="Graficar estos valores" />
              </Segment>
            </Form>
          </Grid.Row>
          <Segment textAlign='center' basic>
            <div style={isDesktopOrTablet ? { fontSize: "14px" } : { fontSize: "12px" }} id="pasos"></div>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Plotly
            a1={data.tc}
            b1={data.tl}
            c1={data.ti}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default PA4Laboratorios;
