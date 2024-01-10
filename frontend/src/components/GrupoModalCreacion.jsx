import { Button, Form, Message, Modal, Segment } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { useGrupoStore, useUsuarioStore } from '../stores/UsuarioStore';
import { useState } from 'react';

const GrupoModalCreacion = ({ propShow, propSetShow, actualizarGrupos }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const [showPortal, setShowPortal] = useState(false)
	const usuario = useUsuarioStore(state => state.usuario);
	const grupoActual = useGrupoStore(state => state.grupo);

	const postGrupo = (data) => {

		fetch(`${import.meta.env.VITE_URL_BACKEND}/grupo/crear`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: usuario.token,
				nombre: data.nombre,
				descripcion: data.descripcion,
			}),
		}).then((response) => response.json()).
			then((data) => {
				if (data.error) {
					console.log(error)
				} else {
					setShowPortal(true)
					reset({ nombre: '', descripcion: '' });
					actualizarGrupos();
				}
			}).catch((error) => { console.log(error) })

		// 	if (response.ok) {
		// 		const { claveGrupo } = await response.json();
		// 		// Establece la clave del grupo actual seleccionado antes de crear la actividad
		// 		useGrupoStore.setState({ grupo: { ...grupoActual, clave: claveGrupo } });
		// 		await propSetShow(true)
		// 		reset({ nombre: '', descripcion: '' });
		// 	}
		//  catch (error) {


	};

	const onSubmit = handleSubmit((formData) => {
		postGrupo({
			nombre: formData.nombre,
			descripcion: formData.descripcion
		})
	})

	return (
		<>
			<Modal
				onClose={() => {
					reset({ nombre: '', descripcion: '' });
					propSetShow(false)
				}}
				open={propShow}
				size='tiny'
			>
				<Modal.Header>Crear de un grupo</Modal.Header>
				<Modal.Content>
					<Form style={{ margin: "0 1% 15% 1%" }} error onSubmit={onSubmit}>
						<Form.Input required fluid label="Nombre" placeholder="Ingrese el nombre del grupo">
							<input {...register("nombre")} />
						</Form.Input>
						<Form.Input required fluid label="Descripción" placeholder="Descripción del grupo">
							<input {...register("descripcion")} />
						</Form.Input>
						<Segment basic textAlign='center'>
							<Message size='mini' info content="Al dar el nombre del grupo, para poder buscarlo con más facilidad, evitar usar los caracteres '/' o '\' "/>
						</Segment>
						<Button floated='left' type='button' content="Cancelar" color='red' onClick={() => {
							reset({ nombre: '', descripcion: '' });
							propSetShow(false)
						}} />
						<Button floated='right' content="Crear Grupo" color='green' type='submit' />
					</Form>
				</Modal.Content>
			</Modal>
			<Modal
				centered={false}
				size='tiny'
				content={<Message style={{ textAlign: "center", fontSize: "18px" }} positive header="Grupo creado con con éxito" />}
				open={showPortal}
				onClose={() => {
					propSetShow(false)
					setShowPortal(false)
				}}
			/>
		</>
	)
}

export default GrupoModalCreacion