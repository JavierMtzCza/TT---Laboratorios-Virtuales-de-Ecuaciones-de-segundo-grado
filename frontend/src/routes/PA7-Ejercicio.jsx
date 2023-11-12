import { useState, useEffect } from 'react';
import { Button, Container, Embed, Grid, Item, Segment } from 'semantic-ui-react';
import Plotly from '../components/Plotly';
import Divisor from '../components/Divisor';
import imagen1 from '../images/newplot (1).png';
import EjercicioFormEc from '../components/EjercicioFormEc';
import ModalEjercicio from '../components/ModalEjercicio';
import { useForm } from 'react-hook-form';

const PA8Pruebas = () => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm()
	const [showModal, setShowModal] = useState(false)
	const [data, setData] = useState({ tc: 0.0, tl: 0.0, ti: 0.0 })
	const [enable, setEnable] = useState(false)
	const [multimedia, setMultimedia] = useState('image')

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

	const onSubmit = handleSubmit((formData) => {
		console.log(formData)

		if (true) {
			obtenerEcuacionCuadratica(formData.r1, formData.r2)
		} else {
			resolverEcuacionCuadratica(formData.a, formData.b, formData.c)
		}

		setData({ tc: formData.a, tl: formData.b, ti: formData.c })
	})


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
			const x1 = (-1*(b)+(raizDiscriminante)) / (2 * a);
			const x2 = (-1*(b)-(raizDiscriminante)) / (2 * a);
			const paso4 = `<p>Paso 4: Analizamos el discriminante para saber cuantas raices tiene:</p><span class="math2">\\(\\sqrt{${discriminante}} = {${raizDiscriminante.toFixed(2)}} \\therefore {${raizDiscriminante.toFixed(2)}} > 0\\)</br></span>`;
			const paso5 = `<p>Paso 5: Como el discriminante es mayor que 0, sabemos que esta ecuación tiene dos raices:</p><span class="math">\\(x_1 = \\frac{-(${b}) + \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}  = \\frac{-(${b}) + \\sqrt{${discriminante}}}{2(${a})} = \\frac{${-1*b+(raizDiscriminante.toFixed(3))}}{${2 * a}} = ${x1.toFixed(4)}\\)<br>\\(x_2 = \\frac{-(${b}) - \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})} = \\frac{-(${b}) - \\sqrt{${discriminante}}}{2(${a})} = \\frac{${-b-(raizDiscriminante.toFixed(3))}}{${2 * a}} = ${x2.toFixed(4)}\\)</br></span>`;
			const paso6 = `<p>Paso 6: Simplificamos las fracciones:</p><span class="math"> \\(x_1 = ${x1.toFixed(4)}\\) y \\(x_2 = ${x2.toFixed(4)}\\)</br></span>`;
			// const paso7 = `Paso 7: Verificamos las soluciones: <br> <span class="math">  \\(${a}(${x1.toFixed(2)})^2 + ${b}(${x1.toFixed(2)}) + ${c} = ${(a * x1 * x1 + b * x1 + c).toFixed(2)} \\approx 0\\) y \\(${a}(${x2.toFixed(2)})^2 + ${b}(${x2.toFixed(2)}) + ${c} = ${(a * x2 * x2 + b * x2 + c).toFixed(2)} \\approx 0\\) </span>`;
			pasosHTML += `${paso4}<br>${paso5}<br>${paso6}`;
		} else if (discriminante === 0) {
			const x = -b / (2 * a);
			const paso4 = `<p>Paso 4: Analizamos el discriminante para saber cuantas raices tiene:</p><span class="math2">\\(\\sqrt{${discriminante}} = {${raizDiscriminante}} \\therefore {${raizDiscriminante}} = 0\\)</br></span>`;
			const paso5 = `<p>Paso 5: Como el discriminante es igual que 0, sabemos que esta ecuación tiene una raiz:</p><span class="math">\\(x =\\frac{-(${b})+0}{2(${a})} = ${x.toFixed(2)}\\)</br></span>`;
			// const paso6 = `<p>Paso 6: Verificamos la solución:</p><span class="math"> \\(${a}(${x.toFixed(2)})^2 + ${b}(${x.toFixed(2)}) + ${c} = ${(a * x * x + b * x + c).toFixed(2)} \\approx 0\\)</br></span>`;
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

	const obtenerEcuacionCuadratica = (raiz1, raiz2) => {

		const r1 = parseFloat(raiz1);
		const r2 = parseFloat(raiz2);

		console.log(((1-r1)*(1-r2)))

		const paso1 = `<br>Paso 1: Las raíces de la ecuación cuadrática son: <br> <span className="math">\\(r_1 = ${r1}\\)</span> y <span className="math">\\(r_2 = ${r2}\\)</span>`;

		const sumaRaices = r1 + r2;
		const productoRaices = r1 * r2;
		const paso2 = `<br>Paso 2: Calculamos la suma y el producto de las raíces:<br><span className="math">\\(r_1 + r_2 = ${r1} + ${r2} = ${sumaRaices}\\)</span> <br> <span className="math">\\(r_1*r_2 = ${r1} \\cdot ${r2} = ${productoRaices}\\)</span>`;

		const a = 1;
		const b = -sumaRaices;
		const c = productoRaices;
		const paso3 = `<br> Paso 3: Usando la fórmula cuadrática, obtenemos los coeficientes de la ecuación cuadrática:
         <br><span className="math">\\(a = ${a}\\)</span>
         <br> <span className="math">\\(b = -(${sumaRaices}) = ${b}\\)</span> 
         <br> <span className="math">\\(c = ${productoRaices}\\)</span>`;

		const paso4 = `<br>Paso 4: La ecuación cuadrática es: <br> <span className="math">\\(x^2 ${b < 0 ? b : '+' + b}x ${c < 0 ? c : '+' + c} = 0\\)</span>`;
		let pasosHTML = `${paso1}<br>${paso2}<br>${paso3}<br>${paso4}`;

		document.getElementById('pasos').innerHTML = pasosHTML;

		if (window.MathJax)
			window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);

	};

	// const limpiarPantalla = () => {
	// 	document.getElementById('resultado').innerHTML = '';
	// 	document.getElementById('pasos').innerHTML = '';
	// };


	return (
		<>
			<Grid columns={2} stackable>
				<Grid.Row>
					<Grid.Column >
						<Divisor tamano='h3' horizontal={true} icono='book' descripcion='Descripción del problema' />
						<Grid.Row>
							<Item style={{ background: "#FEF6AF" }} as={Segment}>
								{
									multimedia == 'image'
										?
										<Item.Image as={Button} floated='left' size='small' src={imagen1} onClick={() => setShowModal(true)} />
										:
										multimedia == 'video'
											?
											<Embed
												id='3vRZ6UxpgpU'
												source='youtube'
												iframe={{ allowFullScreen: true }}
												aspectRatio='21:9'
											/>
											: <></>
								}
								<Item.Content verticalAlign='middle'>
									<Item.Header style={{ fontSize: "25px", color: "#000000" }}>Grafica la función</Item.Header>
									<Item.Meta>
										<Container style={{ color: "#000000" }}>
											<p style={{ fontSize: "17px" }}>
												Con respecto a la funcion dada, encuentra las raices para esta funcion.
											</p>
											<p style={{ fontSize: "13px" }}>
												Para poder visualizar la imagen o el video de forma correcta, de un clic en el.
											</p>
										</Container>
									</Item.Meta>
								</Item.Content>
							</Item>
						</Grid.Row>
						<Grid.Row>
							<Divisor tamano='h3' horizontal={true} icono='edit outline' descripcion='Resolver' />
						</Grid.Row>
						<Grid.Row>
							<EjercicioFormEc
								registrador={register}
								graficar={onSubmit}
								resolver={resolverEcuacionCuadratica}
							/>
							<Divisor tamano='h3' horizontal={true} icono='sort numeric down' descripcion='Pasos' />
							<div id="pasos"></div>
						</Grid.Row>
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
			<ModalEjercicio mostrar={showModal} setmostrar={setShowModal} imagen={imagen1} />
		</>
	)
}

export default PA8Pruebas;