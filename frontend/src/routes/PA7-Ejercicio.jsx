import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button, Embed, Grid, Image, Label, Message, Modal, Segment } from 'semantic-ui-react';
import Plotly from '../components/Plotly';
import Divisor from '../components/Divisor';
import EjercicioFormEc from '../components/EjercicioFormEc';
import ModalEjercicio from '../components/ModalEjercicio';
import { useNavigate } from 'react-router-dom';
import { useActividadStore, useUsuarioStore } from '../stores/UsuarioStore';

const PA8Pruebas = ({ pregunta, respuestas, claveVideo, multimedia, consejo, tipo, preguntaActual, long, setPreguntaActual }) => {

	const usuario = useUsuarioStore(state => state.usuario)
	const actividad = useActividadStore(state => state.actividad)

	//estados adicionales
	const { register, handleSubmit, formState: { errors }, reset } = useForm()
	//Estados para controlar los mensdajes e informacion
	const [showModal, setShowModal] = useState(false)
	const [mensajeRespuesta, setMensajeRespuesta] = useState({ show: false, texto: "", consejo: consejo })
	const [respuestaCorrecta, setRespuestaCorrecta] = useState(false)
	const [data, setData] = useState({ tc: 0.0, tl: 0.0, ti: 0.0 })
	const [final, setFinal] = useState(false)
	const navigate = useNavigate();
	//Estaod para controlar la calificcion
	const [intentos, setIntentos] = useState(3)
	const [calificacion, setCalificacion] = useState(0)

	useEffect(() => {
		if (intentos == 0) {
			avanzarActividad()
			setIntentos(3)
		}
	}, [intentos])

	useEffect(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
		document.head.appendChild(script);
		return () => { document.head.removeChild(script) };
	}, []);

	const AsignarCalificacion = () => {
		fetch(`${import.meta.env.VITE_URL_BACKEND}/actividad/calificacion`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				idActividad: actividad.id,
				idUsuario: usuario.perfil.id,
				calificacion: parseFloat(((calificacion * 10) / (long + 1)).toFixed(2))
			})
		}).then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.log(error))
	}

	const onSubmit = handleSubmit((formData) => {
		if (tipo) {
			if (formData.a == '' || formData.b == '' || formData.c == '') {
				alert("Debe poner algo en los campos")
			} else if (formData.a == respuestas.a && formData.b == respuestas.b && formData.c == respuestas.c) {
				//PASS: Cuando acierta el ejercicio
				setRespuestaCorrecta(true)
				resolverEcuacionCuadratica(formData.a, formData.b, formData.c)
				reset({ a: "", b: "", c: "" })
				setMensajeRespuesta({ show: true, texto: "Perfecto", consejo: consejo })
				setCalificacion(calificacion + 1)
			} else {
				//NOTE: Cuanfo falla el ejercicio
				setMensajeRespuesta({ show: true, texto: "Ouh! Estuviste cerca", consejo: "Verifica si la grafica que generaron los valores: " + formData.a + "x^2, " + formData.b + "x, " + formData.c + " es la que deberias obtener" })
				reset({ a: "", b: "", c: "" })
				setIntentos(intentos - 1)
			}
			setData({ tc: formData.a, tl: formData.b, ti: formData.c })
		} else {
			if (formData.r1 == '' || formData.r2 == '') {
				alert("Debe poner algo en los campos")
			} else if (formData.r1 == respuestas.r1 && formData.r2 == respuestas.r2) {
				//PASS: Cuando acierta el ejercicio
				setRespuestaCorrecta(true)
				obtenerEcuacionCuadratica(formData.r1, formData.r2)
				reset({ a: "", b: "", c: "" })
				setMensajeRespuesta({ show: true, texto: "Perfecto", consejo: consejo })
				setCalificacion(calificacion + 1)
			} else {
				//NOTE: Cuanfo falla el ejercicio
				reset({ r1: "", r2: "" })
				setMensajeRespuesta({ show: true, texto: "Ouh! Estuviste cerca", consejo: consejo })
				setIntentos(intentos - 1)
			}
		}

	})

	const avanzarActividad = () => {
		if (preguntaActual < long) {
			setRespuestaCorrecta(false)
			setMensajeRespuesta({ show: false, texto: "", consejo: "" })
			document.getElementById('pasos').innerHTML = "";
			setPreguntaActual(preguntaActual + 1)
			setIntentos(3)
		} else {
			AsignarCalificacion()
			setFinal(true)
		}
	}

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

		console.log(((1 - r1) * (1 - r2)))

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

	return (
		<>
			<Grid columns={2} stackable>
				<Grid.Row>
					<Grid.Column >
						<Grid.Row >
							<Segment basic>
								{
									multimedia != ''
										?
										< Label as='a' color='red' ribbon content="Para ver mejor la imagen de clic en ella" />
										: claveVideo != ''
											?
											<Embed id={claveVideo} source='youtube' iframe={{ allowFullScreen: true }} aspectRatio='21:9' />
											:
											<></>
								}
								<Grid style={{ background: "#FEF6AF", margin: "1% 5% 0% 5%", borderRadius: "15px" }} columns={2}>
									<Grid.Row>
										<Grid.Column verticalAlign='middle' width={multimedia == '' ? 1 : 3}>
											{multimedia != ''
												?
												<Image as={Button} floated='left' size='medium' src={multimedia} onClick={() => { setShowModal(true) }} />
												:
												<></>
											}
										</Grid.Column>
										<Grid.Column verticalAlign='middle' width={multimedia == '' ? 15 : 13}>
											<Message color='olive' style={{ borderRadius: "14px" }} header={pregunta} />
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Segment>
						</Grid.Row>
						<Grid.Row>
						</Grid.Row>
						<Grid.Row>
							{
								respuestaCorrecta ?
									<Segment textAlign='center' basic >
										<Divisor tamano='h4' horizontal={true} icono='edit outline' descripcion='Solucion paso a paso' />
										<Message size='mini' color="green" header="Perfecto, esa era la respuesta correcta" content="A continuacion puedes ver el paso a paso de la solucion del problema" />
										<Button onClick={avanzarActividad} content="Siguiente Actividad" />
									</Segment>
									:
									<>
										<Divisor tamano='h4' horizontal={true} icono='edit outline' descripcion='Responder' />
										<EjercicioFormEc
											registrador={register}
											graficar={onSubmit}
											resolver={resolverEcuacionCuadratica}
											tipo={tipo}
											mensaje={mensajeRespuesta}
										/>
									</>
							}

							<Segment textAlign='center' basic compact>
								<div id="pasos"></div>
							</Segment>
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
			<ModalEjercicio mostrar={showModal} setmostrar={setShowModal} imagen={multimedia} />
			<Modal
				centered={false}
				size='tiny'
				content={<Message style={{ textAlign: "center", fontSize: "18px" }} positive
					header={"Se ha concluido esta actividad, has obtenido " + calificacion + "/" + (long + 1) + " aciertos que equivale a " + ((calificacion * 10) / (long + 1)).toFixed(2)} />}
				open={final}
				onOpen={() => setFinal(true)}
				onClose={() => {
					setFinal(false)
					navigate('/Grupo')
				}}
			/>
		</>
	)
}

export default PA8Pruebas;